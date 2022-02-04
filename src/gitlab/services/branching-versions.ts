import { GitlabBranches } from './gitlab-api/branches-api';
import { Deferred } from '../../deferred';
import { GitlabPipelines } from './gitlab-api/pipelines-api';
import { Colors } from './colors';
import { GitlabTags } from './gitlab-api/tags-api';

export namespace BranchingVersions {
    export function initialize() {
        const versionData: VersionData = {
            versions: [],
            versionData: {},
            minVersion: 5000,
            maxVersion: -1,
        };

        return GitlabBranches.getBranches('^v1.')
            .then(branches => {
                branches.forEach(branch => {
                    const name = branch.name;

                    if (isVersionBranch(name)) {
                        const version = parseVersion(name);
                        versionData.versions.push(version);
                        versionData.versions.sort();
                        versionData.maxVersion = Math.max(version, versionData.maxVersion);
                        versionData.minVersion = Math.min(version, versionData.minVersion);

                        versionData.versionData[version] = {
                            branch,
                            color: 'transparent',
                        };
                    }
                });
            })
            .then(() => {
                return GitlabBranches.getBranches('^master').then(branches => {
                    const branch = branches[0];
                    versionData.versionData[branch.name] = {
                        branch,
                        color: 'transparent',
                    };
                });
            })
            .then(() => {
                window.monar.versionData = versionData;
                window.monar.versionData.versions.forEach((ver, index) => {
                    versionData.versionData[ver].color = Colors.getGradientColor(
                        '#F00',
                        '#FF0',
                        Math.min(Math.max((1 / (versionData.versions.length - 1)) * index, 0), 1),
                    );
                });
            });
    }

    export function fetchMoreDetails() {
        if (!window.monar?.versionData) {
            return Promise.reject();
        }

        const deferred = new Deferred<void>();

        const pipelines: Promise<{ version: string; pipeline: GitlabPipelines.PipelineBase }>[] = [];
        const tags: Promise<{ version: string; tag: GitlabTags.TagBase }>[] = [];

        for (const [version, value] of Object.entries(window.monar.versionData.versionData)) {
            pipelines.push(
                GitlabPipelines.getPipelines({ ref: value.branch.name }).then(data => ({ version, pipeline: data[0] })),
            );

            tags.push(GitlabTags.getTags(`^${value.branch.name}`).then(data => ({ version, tag: data[0] })));
        }

        Promise.all(pipelines)
            .then(data => {
                return data.forEach(item => {
                    window.monar.versionData!.versionData[item.version].pipeline = item.pipeline;
                });
            })
            .then(() => Promise.all(tags))
            .then(data => {
                return data.forEach(item => {
                    window.monar.versionData!.versionData[item.version].tag = item.tag;
                });
            })
            .then(() => GitlabPipelines.getPipelineSchedules())
            .then(data => Promise.all(data.map(pipeline => GitlabPipelines.getPipelineSchedule(pipeline.id))))
            .then(data => data.filter(schedule => schedule.active).map(schedule => schedule.last_pipeline))
            .then(data => {
                return data.forEach(schedule => {
                    if (!!schedule && (isVersionBranch(schedule.ref) || schedule.ref === 'master')) {
                        const key = isVersionBranch(schedule.ref) ? parseVersion(schedule.ref) : 'master';
                        window.monar.versionData!.versionData[key].schedule = schedule;
                    }
                });
            })
            .then(() => {
                return deferred.resolve();
            });

        return deferred.promise;

        // TODO tag pipeline
        // TODO branch untagged merges
    }

    function isVersionBranch(name: string) {
        return !!name.match(/^v1\.\d+$/);
    }

    function parseVersion(name: string) {
        return parseInt(name.match(/^v1\.(\d+)$/)![1], 10);
    }
}

export interface VersionData {
    versions: number[];
    versionData: Record<
        string | number,
        {
            branch: GitlabBranches.Branch;
            color: string;
            pipeline?: GitlabPipelines.PipelineBase;
            tag?: GitlabTags.TagBase;
            schedule?: GitlabPipelines.PipelineBase;
        }
    >;
    minVersion: number;
    maxVersion: number;
}
