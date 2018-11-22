import { Injectable } from '@angular/core';
import { Runtime } from '@shared/models/_index';

@Injectable()
export class RuntimeBuilder {
    public build(props): Runtime {
        return this.toRuntime(props);
    }

    private toRuntime(props): Runtime {
        const runtime = new Runtime({
            id: props.id,
            name: props.name,
            version: props.version,
            suitableModelType: props.suitableModelType,
            tags: props.tags,
            configParams: props.configParams,
        });

        return runtime;
    }
}
