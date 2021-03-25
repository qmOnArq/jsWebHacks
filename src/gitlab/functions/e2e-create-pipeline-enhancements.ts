import { isE2ERepository } from './is-e2e';
import { E2ECreatePipelineScreen } from '../services/e2e-create-pipeline-screen';
import CreatePipelineScreen from '../services/create-pipeline-screen';

export function enhanceCreatePipelineScreen() {
    // do not run on screens other than "create pipeline"
    if (!location.pathname.includes('pipelines/new')) {
        return;
    }

    if (isE2ERepository()) {
        new E2ECreatePipelineScreen();
    } else {
        new CreatePipelineScreen();
    }
}
