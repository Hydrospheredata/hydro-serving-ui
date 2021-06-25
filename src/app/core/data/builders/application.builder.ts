import { Injectable } from '@angular/core';
import { Application, Signature } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ApplicationBuilder {
  public build(props): Application {
    return this.toApplication(props);
  }

  private toApplication(props): Application {
    let id: number;
    let signature: Signature;

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
      message: props.message,
      favorite: false,
    });

    return application;
  }
}
