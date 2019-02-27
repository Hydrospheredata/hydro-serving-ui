export interface IHostSelector {
    id: number;
    name: string;
    placeholder: string;
}

export class HostSelector implements IHostSelector {
    public id: number;
    public name: string;
    public placeholder: string;

    constructor(props) {
        this.id = props.id;
        this.name = props.name;
        this.placeholder = props.placeholder;
    }
}
