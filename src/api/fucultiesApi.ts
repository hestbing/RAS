import { AccessTokenKey } from "../constants/CommonConstants";
import { AddFucultiesResponseDto, EditFucultiesResponseDto } from "../types/apiTypes";
import { Fuculty } from "../types/models";
import { AxiosInstance } from "./axiosinstanse"

export const FucultiesApi = ()  => {
    const token = sessionStorage.getItem(AccessTokenKey) ?? ''
    const {axiosPost, axiosGet, axiosDelete, axiosPut} = AxiosInstance(token) 

    const getFuculties = async() => 
        await axiosGet('/Fuculties') as Array<Fuculty>
        
    
    const addFuculties = async (addFucultiesData: AddFucultiesResponseDto) => {
        await axiosPost('/Fuculties/fuculty', addFucultiesData) as number
    }

    const editFuculties = async (editFucultiesData: EditFucultiesResponseDto) => {
        await axiosPut('/Fuculties/fuculty', editFucultiesData) as void
    }

    const deleteFuculties = async (id: string | number) => {
        await axiosDelete(`/Fuculties/fuculty?id=${id}`) as void
    }

    return {
        getFuculties,
        addFuculties,
        editFuculties,
        deleteFuculties
    }
}

