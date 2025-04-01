export interface LoginRequeseDto{
    login: string;
    password: string;
}

export interface LoginResponseDto{
    access_token: string;
    usename: string;
    role: string;
}

export interface RegistrationRequestDto{
    login: string;
    password: string;
}

export interface AddFucultiesResponseDto {
    name: string;
    description?: string;
}

export interface EditFucultiesResponseDto {
    id: number;
    name: string;
    description?: string;
}

export interface SetRoleResponseDto{
    userId: number;
    roleName: 'admin' | 'manager' | 'user';
}

export interface AddVisitorResponseDto{
    fucultyId: number;
    dayWeek: string;
    nameSubject: string;
    nameTeacher: string;
    nameGroup: string;
    numberStudent: string;
    numberVisitors: string;
    date: string;
    course: string;
}

export interface UpdateVisitorResponseDto{
    id: number;
    dayWeek: string;
    nameSubject: string;
    nameTeacher: string;
    nameGroup: string;
    numberStudent: string;
    numberVisitors: string;
    date: string;
    course: string;
    students: Array<{
        id: number;
        fioStudent: string;
        examResults: string;
        attending: string;
    }>;
    userFiles: Array<{
        id: number;
        systemName: string;
        displayName: string;
    }>
}

export interface AddDepartResponseDto{
    visitorId: number;
    fioStudent: string;
    examResults: string;
    attending: string;
}

export interface UploadFileResponseDto{
    visitorId: number;
    fileString: string;
    fileName: string;
}

export interface DownloadFileResponseDto{
    sustemName: number;
    displayName: string;
}
