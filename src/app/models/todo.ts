export class ToDo {

    id: number;
    name: string;
    list: string;
    dateCreate: Date;
    dateComplete: Date;
    done: boolean;

    constructor(init?: Partial<ToDo>) {
        Object.assign(this, init);
    }
}
