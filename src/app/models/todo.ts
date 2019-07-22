export class ToDo {

    id: number;
    name: string;
    idList: number;
    dateCreate: Date;
    done: boolean;
    star: boolean;

    constructor(init?: Partial<ToDo>) {
        Object.assign(this, init);
    }
}
