export interface Hpa {
  maxReplicas: number;
  cpuUtilization: number;
  minReplicas: number;
}

export interface Container {
  resources: {
    requests: { memory: string; cpu: string };
    limits: { memory: string; cpu: string };
  };
  env?: { [key: string]: string };
}

export interface Toleration {
  effect: string;
  tolerationSeconds: number;
  value?: string;
  key: string;
  operator: string;
}

export interface MatchExpression {
  values?: string[];
  key: string;
  operator: string;
}

export interface MatchField {
  values?: string[];
  key: string;
  operator: string;
}

export interface Pod {
  tolerations: Array<Toleration>;
  nodeSelector: { [key: string]: string };
  affinity: {
    nodeAffinity: {
      requiredDuringSchedulingIgnoredDuringExecution: {
        nodeSelectorTerms: {
          matchExpressions: MatchExpression[];
          matchFields: MatchField[];
        }[];
      };
      preferredDuringSchedulingIgnoredDuringExecution: {
        preference: {
          matchExpressions: MatchExpression[];
          matchFields: MatchField[];
        };
        weight: number;
      }[];
    };
    podAffinity: {
      requiredDuringSchedulingIgnoredDuringExecution: {
        labelSelector: {
          matchExpressions: MatchExpression[];
        };
        topologyKey: string;
        namespaces: string[];
      }[];
      preferredDuringSchedulingIgnoredDuringExecution: {
        podAffinityTerm: {
          labelSelector: {
            matchLabels: { key: string };
            matchExpressions: MatchExpression[];
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
          matchExpressions: MatchExpression[];
        };
        topologyKey: string;
        namespaces: string[];
      }[];
      preferredDuringSchedulingIgnoredDuringExecution: {
        podAffinityTerm: {
          labelSelector: {
            matchLabels: { key: string };
            matchExpressions: MatchExpression[];
          };
          topologyKey: string;
          namespaces: string[];
        };
        weight: number;
      }[];
    };
  };
}

export class DeploymentConfig {
  name: string;
  hpa: Hpa;
  deployment: { replicaCount: number };
  container: Container;
  pod: Pod;
  favorite: boolean = false;

  constructor(props: any = {}) {
    this.favorite = props.favorite || false;
  }
}
