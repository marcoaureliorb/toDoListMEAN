export class PersonalizedList{
    id: number;
    name: string;

    constructor(init?: Partial<PersonalizedList>){
        Object.assign(this, init);
    }
}