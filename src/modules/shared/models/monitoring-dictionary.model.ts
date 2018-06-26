export interface IMonitoringDictionary {
    name: string;
    className: string;
    metrics: string[];
    isSystem: boolean;
}

export class MonitoringDictionary implements IMonitoringDictionary {
    public name: string;
    public className: string;
    public metrics: string[];
    isSystem: boolean;

    constructor(parameters) {
        this.name = parameters['name'];
        this.className = parameters['className'];
        this.metrics = parameters['metrics'];
        this.isSystem = parameters['isSystem'];
    }
}