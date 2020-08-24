import { DeploymentConfig } from '../models';

export const DeploymentConfigsMock: DeploymentConfig[] = [
  {
    name: 'cool-deployment-config',
    hpa: {
      minReplicas: 2,
      maxReplicas: 10,
      cpuUtilization: 80,
    },
    deployment: {
      replicaCount: 4,
    },
    container: {
      resources: {
        limits: {
          cpu: '2',
          memory: '2g',
        },
        requests: {
          cpu: '2',
          memory: '2g',
        },
      },
    },
    pod: {
      nodeSelector: {
        im: 'a map',
        foo: 'bar',
      },
      affinity: {
        nodeAffinity: {
          requiredDuringSchedulingIgnoredDuringExecution: {
            nodeSelectorTerms: [
              {
                matchExpressions: [
                  {
                    key: 'exp1',
                    operator: 'Exists',
                    values: ['a', 'b', 'c'],
                  },
                ],
                matchFields: [
                  {
                    key: 'fields1',
                    operator: 'Exists',
                    values: ['aa', 'bb', 'cc'],
                  },
                ],
              },
            ],
          },
          preferredDuringSchedulingIgnoredDuringExecution: [
            {
              preference: {
                matchExpressions: [
                  {
                    key: 'exp2',
                    operator: 'Exists',
                    values: ['aaaa', 'bvzv', 'czxc'],
                  },
                ],
                matchFields: [
                  {
                    key: 'fields3',
                    operator: 'Exists',
                    values: ['aaa', 'cccc', 'zxcc'],
                  },
                ],
              },
              weight: 100,
            },
          ],
        },
        podAffinity: {
          requiredDuringSchedulingIgnoredDuringExecution: [
            {
              labelSelector: {
                matchExpressions: [
                  {
                    key: 'kek',
                    operator: 'Exists',
                  },
                  {
                    key: 'key',
                    operator: 'NotIn',
                    values: ['a', 'b'],
                  },
                  {
                    key: 'kek',
                    operator: 'DoesNotExist',
                  },
                ],
              },
              namespaces: ['namespace1'],
              topologyKey: 'top',
            },
          ],
          preferredDuringSchedulingIgnoredDuringExecution: [
            {
              weight: 100,
              podAffinityTerm: {
                labelSelector: {
                  matchLabels: {
                    key: 'a',
                  },
                  matchExpressions: [
                    {
                      key: 'kek',
                      operator: 'In',
                      values: ['a', 'b'],
                    },
                    {
                      key: 'kek',
                      operator: 'NotIn',
                      values: ['b'],
                    },
                  ],
                },
                namespaces: ['namespace2'],
                topologyKey: 'toptop',
              },
            },
          ],
        },
        podAntiAffinity: {
          requiredDuringSchedulingIgnoredDuringExecution: [
            {
              labelSelector: {
                matchExpressions: [
                  {
                    key: 'kek',
                    operator: 'Exists',
                  },
                  {
                    key: 'key',
                    operator: 'NotIn',
                    values: ['a', 'b'],
                  },
                  {
                    key: 'kek',
                    operator: 'DoesNotExist',
                  },
                ],
              },
              namespaces: ['namespace1'],
              topologyKey: 'top',
            },
          ],
          preferredDuringSchedulingIgnoredDuringExecution: [
            {
              weight: 100,
              podAffinityTerm: {
                labelSelector: {
                  matchLabels: {
                    key: 'a',
                  },
                  matchExpressions: [
                    {
                      key: 'kek',
                      operator: 'In',
                      values: ['a', 'b'],
                    },
                    {
                      key: 'kek',
                      operator: 'NotIn',
                      values: ['b'],
                    },
                  ],
                },
                namespaces: ['namespace2'],
                topologyKey: 'toptop',
              },
            },
          ],
        },
      },
      tolerations: [
        {
          effect: 'PreferNoSchedule',
          key: 'equalToleration',
          tolerationSeconds: 30,
          operator: 'Equal',
          value: 'kek',
        },
        {
          key: 'equalToleration',
          operator: 'Exists',
          effect: 'PreferNoSchedule',
          tolerationSeconds: 30,
        },
      ],
    },
  },
];
