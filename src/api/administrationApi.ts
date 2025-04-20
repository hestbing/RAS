import { AccessTokenKey } from '../constants/CommonConstants';
import { SetRoleResponseDto } from '../types/apiTypes';
import { User } from '../types/models';
import { AxiosInstance } from './axiosinstanse';

export const AdministrationApi = () => {
    const token = sessionStorage.getItem(AccessTokenKey) ?? ''
    
    const { axiosGet, axiosPut} = AxiosInstance(token) 

    const getUsers = async() =>
        await axiosGet('/getusers') as Array<User>

    const setUserRole = async(setRoleData: SetRoleResponseDto) =>
        await axiosPut('/setuserrole', setRoleData) as void

    return {
        getUsers,
        setUserRole
    }
}