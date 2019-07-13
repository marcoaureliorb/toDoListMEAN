export class User{
    id: number;
    email: string;
    pass: string;

    constructor(init?: Partial<User>){
        Object.assign(init);
    }
}