import { isFrontend } from './is-frontend';
import { isApp } from './is-app';
import { GitlabPipelines } from '../services/gitlab-api/pipelines-api';
import { GitlabJobs } from '../services/gitlab-api/jobs-api';
import { createHashString } from './hash-variables';

const ImageJobByProjectId: { [key: string]: ImageJob } = {
    // Frontend
    '106': {
        name: ['bloomreach docker image', 'bloomreach with showcase docker image autorun'],
        imageRegex: /^Digest:.*(sha256:.+)$/m,
        imageUrlParam: 'fe_version',
    },
    // Backend
    '107': {
        name: ['prod image'],
        imageRegex: /^Built image:.*digest:.*(sha256:.+)$/m,
        imageUrlParam: 'be_version',
    },
};

export async function createRunE2eButton(mergeRequestId: number) {
    if (!isFrontend() && !isApp()) {
        return;
    }

    if (mergeRequestId == null) {
        return;
    }

    const pipelines = await GitlabPipelines.getPipelinesForMR(mergeRequestId);

    if (!pipelines || pipelines.length === 0) {
        return;
    }

    let pipeline = pipelines[0];

    if (isFrontend()) {
        const downstreamPipeline = await GitlabPipelines.getDownstreamPipeline(pipeline.id, 'trigger engagement app');
        if (!downstreamPipeline) {
            return;
        }

        pipeline = downstreamPipeline;
    }

    return createE2eButtonFromPipeline(pipeline);
}

async function createE2eButtonFromPipeline(pipeline: GitlabPipelines.PipelineBase) {
    const fetchedJobs = await GitlabJobs.getJobsForPipeline(pipeline.id);
    const imageJob = ImageJobByProjectId[window.monar_GLOBALS.projectId];

    // Search for built docker image job
    const dockerImageJob = fetchedJobs?.find(job => imageJob.name.includes(job.name));
    if (!fetchedJobs || !dockerImageJob) {
        return createButton('noJob');
    }

    switch (dockerImageJob.status) {
        case 'success': {
            const log = await GitlabJobs.getJobLog(dockerImageJob.id);
            const match = log.match(imageJob.imageRegex);
            if (!match || !match[1]) {
                return createButton('other');
            }
            const url = `/e2e/e2e-tests/pipelines/new${createHashString({
                [imageJob.imageUrlParam]: match[1],
                source_project_id: window.monar_GLOBALS.projectId,
                source_pipeline_url: pipeline.web_url,
            })}`;
            return createButton('success', url, match[1]);
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
}

function createButton(status: ButtonStatus, url?: string, sha?: string) {
    let text: string;
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

        ${sha ? `<code style="font-family: monospace; position: absolute; top: -20px; left: 0; opacity: 0.5; font-size: 9px">${sha}</code>` : ''}
    `;

    $('[data-testid=pipeline-container] .ci-widget.media').css('position', 'relative').prepend(html);
}

interface ImageJob {
    name: string[];
    imageRegex: RegExp;
    imageUrlParam: string;
}

type ButtonStatus = 'success' | 'noJob' | 'error' | 'running' | 'other';
