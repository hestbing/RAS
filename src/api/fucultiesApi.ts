import { AccessTokenKey } from "../constants/CommonConstants";
import { AddFucultiesResponseDto, EditFucultiesResponseDto } from "../types/apiTypes";
import { Department } from "../types/models";
import { AxiosInstance } from "./axiosinstanse"

const {axiosPost, axiosGet, axiosDelete, axiosPut} = AxiosInstance(sessionStorage.getItem(AccessTokenKey) ?? '') 

const getFuculties = async() => 
    await axiosGet('/Fuculties') as Array<Department>

    
const addFuculties = async (addFucultiesData: AddFucultiesResponseDto) => {
    await axiosPost('/Fuculties/fuculty', addFucultiesData) as number
}

const editFuculties = async (editFucultiesData: EditFucultiesResponseDto) => {
    await axiosPut('/Fuculties/fuculty', editFucultiesData) as void
}

const deleteFuculties = async (id: string | number) => {
    await axiosDelete(`/Fuculties/fuculty?id=${id}`) as void
}

export const FucultiesApi = {
    getFuculties,
    addFuculties,
    editFuculties,
    deleteFuculties
}

