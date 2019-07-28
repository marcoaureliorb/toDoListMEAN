export class List {
    id: number;
    idUser: number;
    name: string;
    defaul: boolean;

    constructor(init?: Partial<List>) {
        Object.assign(this, init);
    }
}
