export class User {

    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;

    constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
}
