export interface Students {
    id: number;
    fioStudent: string;
    examResults: string;
    attending: string;
}

export interface WorkExpirience {
    id: number;
    workedYears: number;
    description?: string;
}

// export interface Employee {
//     id: number;
//     firstName: string;
//     lastName: string;
//     midleName?: string;
//     email: string;
//     phoneNumber: string;
//     birthDate: string;
//     education: Array<Education>;
//     workExpirience: Array<WorkExpirience>;
// }

export interface Visitors {
    id: number;
    dayWeek: string;
    nameSubject: string;
    nameTeacher: string;
    nameGroup: string;
    numberStudent: string;
    numberVisitors: string;
    date: string;
    course: string;
    students: Array<Students>;
    // workExpirience: Array<WorkExpirience>;
}

export interface Department {
    id: number;
    name: string;
    description?: string;
    visitors: Array<Visitors>;
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