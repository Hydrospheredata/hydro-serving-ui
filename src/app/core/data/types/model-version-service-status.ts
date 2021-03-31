export interface ServiceSupported {
  supported: boolean;
  message: string;
  description?: string;
}

export interface ModelVersionServicesStatus {
  [serviceName: string]: ServiceSupported
}

export interface ModelVersionServiceStatusesEntity {
  id: number,
  statuses: ModelVersionServicesStatus
}

export function createServiceSupportOnFailure(error: string): ServiceSupported {
  const is501Error = /501/i.test(error);
  if (is501Error) {
    return { supported: false, message: 'Closed for OSS' };
  } else {
    const errMsg = error || 'Something went wrong';
    return { supported: false, message: errMsg };
  }
}
