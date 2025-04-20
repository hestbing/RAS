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

export interface UserFiles {
    id: number;
    systemName: string;
    displayName: string;
}

export interface Fuculty {
    id: number;
    name: string;
    visitors: Array<Visitors>;
}

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
    userFiles: Array<UserFiles>;
}


export interface User {
    id: number;
    login: string;
    role: 'admin' | 'manager' | 'user';
}