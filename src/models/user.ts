interface User { 
    id: string; 
    name: string;
    email: string;
    password: string;
}

const emailRegex: RegExp = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/

export default class UserModel { 
    private props: User; 

    get id() {
        return this.props.id;
    } 

    get name() {
        return this.props.name;
    } 

    get email() {
        return this.props.email;
    }

    get password() {
        return this.props.password;
    }

    constructor(props: User) { 
        if (emailRegex.test(props.email) === false) {
            throw new Error('Invalid email');
        } 
        this.props = props; 
    }
}