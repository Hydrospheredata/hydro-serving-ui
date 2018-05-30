import { Injectable, OnInit } from '@angular/core';
import { InfluxDB } from 'influx';
import { environment } from '@environments/environment';

@Injectable()
export class InfluxDBService implements OnInit {

    private client: InfluxDB;

    constructor() {
        if (!this.client) {
            this.connect();
        }
    }

    ngOnInit() { }

    public connect() {
        this.client = new InfluxDB({
            host: environment.production ? `${window.location.hostname}` : 'localhost',
            port: 8086, //Number(environment.production ? `${window.location.port}` : `${environment.port}`),
            database: 'appmetrics'
        });
    }

    public search(query: string) {
        return this.client.query(query);
    }

    public getDataBases(): Promise<string[]> {
        return this.client.getDatabaseNames();
    }

    public getMeasurements(): Promise<string[]> {
        return this.client.getMeasurements();
    }

    public getUsers() {
        return this.client.getUsers();
    }

    public getSeries() {
        return this.client.getSeries({
            measurement: 'envoy_cluster_name'
        });
    }
}


