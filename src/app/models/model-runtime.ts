export class ModelRuntime {
  public id: string;
  public modelVersion: string;
  public started: string;
  public finished: string;
  public status: string;
  public statusText: string;
  public logsUrl: string;

  constructor(props: any) {
    this.id = props['id'];
    this.modelVersion = props['modelVersion'];
    this.started = props['started'];
    this.finished = props['finished'];
    this.status = props['status'];
    this.statusText = props['statusText'];
    this.logsUrl = props['logsUrl'];
  }
}
