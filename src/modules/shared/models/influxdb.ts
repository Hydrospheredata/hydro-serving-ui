export interface ChartRow {
    time: Date;
    value: number;
    health: number | null;
    modelVersionId: string;
    columnIndex: string | null;
}

export interface HealthRow {
    count: number;
    modelVersionId: string;
    stageId: string;
    sum: number;
    time: Date;
}

export interface GroupedRows<T> {
    name: string;
    rows: T[];
    tags: any;
}
export interface Series {
    name: string;
    columns: string[];
    values: any[];
    tags: {
        modelVersionId: string;
        stageId: string;
    };
}

export interface Response {
    results: Array<{ series: Series[]}>;
}

export type ParsingResult<T> = T[] & { groupRows: Array<GroupedRows<T>> };
