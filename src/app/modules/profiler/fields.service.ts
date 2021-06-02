import { Injectable } from '@angular/core';
import { ModelVersionsFacade } from '@app/core/facades/model-versions.facade';
import { ProfilerFacade } from '@app/core/facades/profiler.facade';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FieldsService {
  private readonly _fields: Observable<any>;

  constructor(
    private readonly modelVersionsFacade: ModelVersionsFacade,
    private readonly profilerFacade: ProfilerFacade
  ) {
    this._fields = modelVersionsFacade.selectedModelVersion().pipe(
      switchMap(mv =>
        profilerFacade.loadFields(`${mv.id}`).pipe(
          map(fields => {
            const withoutIndex = s => s.slice(0, s.lastIndexOf('_'));
            const dict = new Map<string, string[]>();

            return fields.reduce(function (prev, nameWithIndex) {
              const bareName = withoutIndex(nameWithIndex);
              return prev.has(bareName)
                ? prev.set(bareName, [...prev.get(bareName), nameWithIndex])
                : prev.set(bareName, [nameWithIndex]);
            }, dict);
          })
        )
      )
    );
  }

  getFields(): Observable<Map<string, string[]>> {
    return this._fields;
  }
}
