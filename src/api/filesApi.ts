import { AccessTokenKey } from '../constants/CommonConstants';
import { DownloadFileResponseDto, UploadFileResponseDto } from '../types/apiTypes';
import { AxiosInstance } from './axiosinstanse';

export const FilesApi = () => {
    const token = sessionStorage.getItem(AccessTokenKey) ?? ''
    const { axiosDelete, axiosPost} = AxiosInstance(token)
    
    const uploadFile = async(uploadFileData: UploadFileResponseDto) =>
        await axiosPost('/Files/upload', uploadFileData) as void
        
    const downloadFile = async(addVisitorData: DownloadFileResponseDto) =>
        await axiosPost('/Files/download', addVisitorData) as Blob
        
    const deleteFile = async(id: string | number) =>
        await axiosDelete( `/Files/delete?id=${id}` ) as void
        
    return {
        downloadFile,
        deleteFile,
        uploadFile
    }
}