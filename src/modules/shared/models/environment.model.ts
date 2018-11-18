export class Environment {
    public id: number;
    public name: string;
    public placeholders: any[];

    constructor(props: any = {}) {
        this.id = props.id;
        this.name = props.name;
        this.placeholders = props.placeholders;
    }
}
