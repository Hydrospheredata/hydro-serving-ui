interface Hpa {
  maxReplicas: number;
  cpuUtilization: number;
  minReplicas: number;
}

interface Container {
  requirements: {
    requests: { memory: string; cpu: string };
    limits: { memory: string; cpu: string };
  };
}

interface Toleration {
  effect: string;
  tolerationSeconds: number;
  value: string;
  key: string;
  operator: string;
}

interface Pod {
  pod: {
    tolerations: Array<Toleration>;
    nodeSelector: { [key: string]: string };
    affinity: {
      nodeAffinity: {
        requiredDuringSchedulingIgnoredDuringExecution: {
          nodeSelectorTerms: {
            matchExpressions: {
              values: string[];
              key: string;
              operator: string;
            }[];
            matchFields: { values: string[]; key: string; operator: string }[];
          }[];
        };
        preferredDuringSchedulingIgnoredDuringExecution: {
          preference: {
            matchExpressions: {
              values: string[];
              key: string;
              operator: string;
            }[];
            matchFields: { values: string[]; key: string; operator: string }[];
          };
          weight: number;
        }[];
      };
      podAffinity: {
        requiredDuringSchedulingIgnoredDuringExecution: {
          labelSelector: {
            matchExpressions: Array<{
              key: string;
              operator: string;
              values: string[];
            }>;
          };
          topologyKey: string;
          namespaces: string[];
        }[];
        preferredDuringSchedulingIgnoredDuringExecution: {
          podAffinityTerm: {
            labelSelector: {
              matchLabels: { key: string };
              matchExpressions: Array<{
                values: string[];
                key: string;
                operator: string;
              }>;
            };
            topologyKey: string;
            namespaces: string[];
          };
          weight: number;
        }[];
      };
      podAntiAffinity: {
        requiredDuringSchedulingIgnoredDuringExecution: {
          labelSelector: {
            matchExpressions: Array<{
              values: string[];
              key: string;
              operator: string;
            }>;
          };
          topologyKey: string;
          namespaces: string[];
        }[];
        preferredDuringSchedulingIgnoredDuringExecution: {
          podAffinityTerm: {
            labelSelector: {
              matchLabels: { key: string };
              matchExpressions: Array<{
                values: string[];
                key: string;
                operator: string;
              }>;
            };
            topologyKey: string;
            namespaces: string[];
          };
          weight: number;
        }[];
      };
    };
  };
}

interface DeploymentConfig {
  name: string;
  hpa: Hpa;
  deployment: { replicaCount: number };
  container: Container;
  pod: Pod;
}
