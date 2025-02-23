export interface Education {
    id: number;
    title: string;
    description: string;
}

export interface WorkExpirience {
    id: number;
    workedYears: number;
    description?: string;
}

export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    midleName?: string;
    email: string;
    phoneNumber: string;
    birthDate: string;
    education: Array<Education>;
    workExpirience: Array<WorkExpirience>;
}

export interface Department {
    id: number;
    name: string;
    description?: string;
    employees: Array<Employee>;
}

export interface UserFile {
    id: number;
    systemName: string;
    displayName: string;
}

export interface User {
    id: number;
    login: string;
    password: string;
    role: 'admin' | 'manager' | 'user';
}