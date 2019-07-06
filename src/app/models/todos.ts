export class ToDo {

    id : number;
    name: string;
    dateStr: string;
    dateCompleteStr: string;
    done: boolean;

    constructor(id: number, name: string, dateStr: string){
        this.id = id;
        this.name = name;
        this.dateStr = dateStr;
    }
}
