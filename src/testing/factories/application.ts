import { ApplicationBuilder } from '@core/builders/application.builder';
import { Application, IModelVariant, IApplication, TestStatus, ApplicationStatus } from '@shared/_index';
import { MockModelVersion1Model1, MockModelVersion3Model2 } from '@testing/factories/modelVersion';
import { MockSignature1, MockSignature2 } from '@testing/factories/signature';

const applicationBuilder = new ApplicationBuilder();
export const application: Application = applicationBuilder.build({});

const MockService: IModelVariant = {
    weight: 100,
    modelVersion: MockModelVersion1Model1,
    signature: MockSignature1,
};

const MockService2: IModelVariant = {
    weight: 100,
    modelVersion: MockModelVersion3Model2,
    signature: MockSignature2,
};

export const MockApplication: IApplication = {
    id: 1,
    signature: MockSignature1,
    name: 'app1',
    executionGraph: { stages: [
        {
            modelVariants: [ MockService ],
            signature: 'signature',
        },
        {
            modelVariants: [ MockService2 ],
            signature: 'signature',
        },
    ]},
    namespace: 'namespace',
    input: '',
    output: '',
    testStatus: TestStatus.Undefined,
    error: '',
    kafkaStreaming: [],
    status: ApplicationStatus.Ready,
};
