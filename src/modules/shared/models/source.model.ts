export class Source {

    public id: number;
    public name: string;
    public params: any;

    constructor(props: any = {}) {
        this.id = props['id'];
        this.name = props['name'];
        this.params = props['params'];   
    }
}

