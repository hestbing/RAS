import { AccessTokenKey } from '../constants/CommonConstants';
import {
    AddVisitorResponseDto,
    AddDepartResponseDto,
    UpdateVisitorResponseDto
} from '../types/apiTypes';
import { AxiosInstance } from './axiosinstanse';

export const VisitorApi = () => {
    const token = sessionStorage.getItem(AccessTokenKey) ?? ''
    const { axiosDelete, axiosPut, axiosPost} = AxiosInstance(token)

    const addVisitor = async(addVisitorData: AddVisitorResponseDto) =>
        await axiosPost('/Visitors/visitor', addVisitorData) as number

    const editVisitor = async(editVisitorData: UpdateVisitorResponseDto) =>
        await axiosPut('/Visitors/visitor', editVisitorData) as void

    const deleteVisitor = async(id: string | number) =>
        await axiosDelete( `/Visitors/visitor?id=${id}`) as void

    const addDepart = async(addDepartData: AddDepartResponseDto) =>
        await axiosPost('/Visitors/department', addDepartData) as number

    const deleteDepart = async(id: string | number) => 
        await axiosDelete(`/Visitors/department?id=${id}`) as void

    return {
        addVisitor,
        editVisitor,
        deleteVisitor,
        addDepart,
        deleteDepart
    }
}