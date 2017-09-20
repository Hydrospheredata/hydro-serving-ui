export class RuntimeType {
  public id: string;
  public name: string;
  public version: string;
  public tags: string[];

  constructor(props: object = {}) {
    this.id = props['id'] || '';
    this.name = props['name'] || '';
    this.version = props['version'] || '';
    this.tags = props['tags'] || [''];
  }
}
