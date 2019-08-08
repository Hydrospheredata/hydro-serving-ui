import { Injectable } from '@angular/core';
import { Explanation } from '@rootcause/models';

@Injectable()
export class ExplanationBuilder {
  build(props): Explanation {
    const normalizedProps = {
      completedAt: props.completed_at,
      createdAt: props.created_At,
      startedAt: props.started_at,
      explained_instance: props.explained_instance,
      model: props.model,
      result: props.result,
    };
    return new Explanation(normalizedProps);
  }
}
