import { AccessTokenKey } from '../constants/CommonConstants';
import {
    AddVisitorResponseDto,
    AddDepartResponseDto,
    UpdateVisitorResponseDto
} from '../types/apiTypes';
import { AxiosInstance } from './axiosinstanse';

const { axiosDelete, axiosPut, axiosPost} = AxiosInstance(sessionStorage.getItem(AccessTokenKey) ?? '')

const addVisitor = async(addVisitorData: AddVisitorResponseDto) =>
    await axiosPost('/Visitors/visitors', addVisitorData) as number

const editVisitor = async(editVisitorData: UpdateVisitorResponseDto) =>
    await axiosPut('/Visitors/visitors', editVisitorData) as void

const deleteVisitor = async(id: string | number) =>
    await axiosDelete( `/Visitors/visitors?id=${id}`) as void

const addDepart = async(addDepartData: AddDepartResponseDto) =>
    await axiosPost('/Visitors/department', addDepartData) as number

const deleteDepart = async(id: string | number) => 
    await axiosDelete(`/Visitors/department?id=${id}`) as void

export const VisitorApi = {
    addVisitor,
    editVisitor,
    deleteVisitor,
    addDepart,
    deleteDepart
}