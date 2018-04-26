import { Injectable } from '@angular/core';
import { InfluxDB } from 'influx';
import { environment } from '@environments/environment';

@Injectable()
export class InfluxDBService {

    private client: InfluxDB;
    private host: string;
    private port: string;

    constructor() {
        if (!this.client) {
            this.connect();
        }
        this.host = environment.production ? `${window.location.hostname}` : `${environment.host}`;
        this.port = environment.production ? `${window.location.port}` : `${environment.port}`;
    }

    connect() {
        this.client = new InfluxDB({
            host: this.host,
            port: Number(this.port)
        });
    }

    search(query: string) {
        return this.client.query(query);
    }
}


