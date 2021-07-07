import { isFrontend } from './is-frontend';
import { isApp } from './is-app';
import { GitlabPipelines } from '../services/gitlab-api/pipelines-api';
import { GitlabJobs } from '../services/gitlab-api/jobs-api';
import { createHashString } from './hash-variables';

const ImageJobByProjectId: { [key: string]: ImageJob } = {
    // Frontend
    '106': {
        name: ['exponea docker image', 'bloomreach docker image'],
        imageRegex: /digest: (sha256:[^ ]*) size: \d+/m,
        imageUrlParam: 'fe_version',
    },
    // Backend
    '107': {
        name: ['prod image'],
        imageRegex: /^Built Docker image\:.*digest:.*(sha256\:.+)$/m,
        imageUrlParam: 'be_version',
    },
};

export function createRunE2eButton(mergeRequestId: number) {
    if (!isFrontend() && !isApp()) {
        return Promise.resolve();
    }

    if (mergeRequestId == null) {
        return Promise.resolve();
    }

    const imageJob = ImageJobByProjectId[window.monar_GLOBALS.projectId];
    return GitlabPipelines.getPipelinesForMR(mergeRequestId).then(pipelines => {
        if (!pipelines || pipelines.length === 0) {
            return;
        }

        return GitlabJobs.getJobsForPipeline(pipelines[0].id).then(fetchedJobs => {
            // Search for built docker image job
            const dockerImageJob = fetchedJobs?.find(job => imageJob.name.includes(job.name));
            if (!fetchedJobs || !dockerImageJob) {
                return createButton('noJob');
            }

            switch (dockerImageJob.status) {
                case 'success': {
                    return GitlabJobs.getJobLog(dockerImageJob.id).then(log => {
                        const match = log.match(imageJob.imageRegex);
                        if (!match || !match[1]) {
                            return createButton('other');
                        }
                        const url = `/e2e/e2e-tests/pipelines/new${createHashString({
                            [imageJob.imageUrlParam]: match[1],
                            source_project_id: window.monar_GLOBALS.projectId,
                            source_pipeline_url: pipelines[0].web_url,
                        })}`;
                        return createButton('success', url);
                    });
                }
                case 'running':
                case 'pending':
                case 'created':
                    return createButton('running');
                case 'failed':
                    return createButton('error');
                default:
                    return createButton('other');
            }
        });
    });
}

function createButton(status: ButtonStatus, url?: string) {
    let text = '';
    let className = '';

    switch (status) {
        case 'success': {
            text = 'Run E2E';
            className = 'btn-success';
            break;
        }
        case 'noJob': {
            text = 'No Docker Job Found';
            break;
        }
        case 'error': {
            text = 'Docker Job Error';
            className = 'btn-danger';
            break;
        }
        case 'running': {
            text = 'Docker Job Running';
            className = 'btn-info';
            break;
        }
        default: {
            text = 'Unknown Docker Job Issue';
        }
    }

    const html = `
        <a
            href="${url || 'javascript:void(0)'}"
            target="_blank"
            class="btn btn-sm ${url ? '' : 'disabled'} ${className}"
            style="margin-right: 20px"
        >
            ${text}
        </a>
    `;

    $('.mr-state-widget .mr-widget-heading.mr-widget-workflow .ci-widget.media').prepend(html);
}

interface ImageJob {
    name: string[];
    imageRegex: RegExp;
    imageUrlParam: string;
}

type ButtonStatus = 'success' | 'noJob' | 'error' | 'running' | 'other';
