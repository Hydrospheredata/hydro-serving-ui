import { Injectable } from '@angular/core';
import { Client } from 'elasticsearch';
import { environment } from '@environments/environment';

@Injectable()
export class ElasticService {

    private client: Client;
    private elasticUrl: string;

    constructor() {
        if (!this.client) {
            this.connect();
        }
        this.elasticUrl = environment.production ?
            `https://${window.location.hostname}:${window.location.port}` :
            `${environment.host}:${environment.port}`;
    }

    connect() {
        this.client = new Client({
            host: `${this.elasticUrl}`,
            log: 'trace',
            defer: this.defer,
        });
    }

    search(query: string) {
        return this.client.search({
            index: 'metrics',
            body: {
                'size': 10000,
                'query': {
                    'bool': {
                        'must': [
                            {
                                'match': {
                                    'envoy_cluster_name': query
                                }
                            },
                            {
                                'match': {
                                    'name': 'envoy_cluster_external_upstream_rq_xx'
                                }
                            }
                        ],
                        'filter': [
                            {
                                'range': {
                                    '@timestamp': {
                                        'gt': 'now-1h'
                                    }
                                }
                            }
                        ]
                    },
                },
                'sort': [
                    {
                        '@timestamp': 'asc'
                    }
                ]
            }
        });
    }

    private defer() {
        let resolve, reject, promise;
        promise = new Promise((_resolve, _reject) => {
            resolve = _resolve;
            reject = _reject;
        });
        return { resolve, reject, promise };
    }
}


