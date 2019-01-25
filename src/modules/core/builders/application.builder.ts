
import { Injectable } from '@angular/core';
import { Application, IApplication, ISignature } from '@shared/models/_index';
@Injectable()
export class ApplicationBuilder {
    public build(props): Application {
        return this.toApplication(props);
    }

    private toApplication(props): IApplication {
        let id: number;
        let signature: ISignature;

        if (props.id) {
            id = props.id;
        }

        if (props.signature) {
            signature = props.signature;
        }

        const application = new Application({
            id,
            signature,
            name: props.name,
            executionGraph: props.executionGraph || [],
            kafkaStreaming: props.kafkaStreaming || [],
            status: props.status && props.status.toLowerCase(),
        });

        return application;
    }
}
