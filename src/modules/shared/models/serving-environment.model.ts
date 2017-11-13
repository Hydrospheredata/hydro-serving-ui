export class ServingEnvironment {
  public id: string;
  public name: string;
  public placeholders: any[];

  constructor(props: object = {}) {
    this.id = props['id'] || '';
    this.name = props['name'] || '';
    this.placeholders = props['placehoders'] || [];
  }
}
