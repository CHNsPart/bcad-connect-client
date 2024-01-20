export interface SigninState {
    email: string;
    password: string;
}

export interface RegisterState {
    firstName: string,
    lastName: string,
    regEmail: string,
    regPassword: string,
    conPassword: string,
    picturePath: File | null,
    connections: string,
    sex: string,
    worksAt: string,
    phone: string,
    location: string,
    occupation: string,
}

export interface UserDataState {
    firstName: string,
    lastName: string,
    email: string,
    Password: string,
    picturePath: string,
    connections: string,
    sex: string,
    worksAt: string,
    phone: string,
    location: string,
    occupation: string,
}