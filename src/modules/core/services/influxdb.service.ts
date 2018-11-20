import { Injectable } from '@angular/core';
import { ParsingResult, Response} from '@shared/models/_index';

@Injectable()
export class InfluxDBService {
    public parse<T>(response: Response): ParsingResult<T> {
        const series = response.results[0].series || [];
        const res: any = [];
        res.groupRows = [];

        const tags = series.length && series[0].tags ? Object.keys(series[0].tags) : [];

        for (let i = 0; i < series.length; i++) {
            const { values = [], columns = []} = series[i];
            const nextGroup = [];

            for (const currentValue of values) {
                const obj = {};

                for (let j = 0; j < columns.length; j++) {
                    const currentColumn = columns[j];

                    if (currentColumn === 'time') {
                        obj[currentColumn] = new Date(currentValue[j]);
                    } else {
                        obj[currentColumn] = currentValue[j];
                    }
                }

                for (const currentTag of tags) {
                    obj[currentTag] = series[i].tags[currentTag];
                }

                res.push(obj);
                nextGroup.push(obj);
            }

            res.groupRows[i] = {
                name: series[i].name,
                rows: nextGroup,
                tags: series[i].tags,
            };
        }
        return res;
    }
}
