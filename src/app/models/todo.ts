export class ToDo {

    id: number;
    name: string;
    list: string;
    dateCreate: Date;
    done: boolean;
    star: boolean;

    constructor(init?: Partial<ToDo>) {
        Object.assign(this, init);
    }
}
