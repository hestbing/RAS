import { AccessTokenKey } from '../constants/CommonConstants';
import { SetRoleResponseDto } from '../types/apiTypes';
import { User } from '../types/models';
import { AxiosInstance } from './axiosinstanse';

const { axiosGet, axiosPatch} = AxiosInstance(sessionStorage.getItem(AccessTokenKey) ?? '') 

const getUsers = async() =>
    await axiosGet('/getusers') as Array<User>

const setUserRole = async(setRoleData: SetRoleResponseDto) =>
    await axiosPatch('/getusers', setRoleData) as void

export const AdministrationApi = {
    getUsers,
    setUserRole
}