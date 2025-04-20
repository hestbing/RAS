import { AccessTokenKey } from '../constants/CommonConstants';
import { DownloadFileResponseDto, UploadFileResponseDto } from '../types/apiTypes';
import { AxiosInstance } from './axiosinstanse';

export const FilesApi = () => {
    const token = sessionStorage.getItem(AccessTokenKey) ?? ''
    const { axiosBlob, axiosDelete, axiosPost} = AxiosInstance(token)
    
    const uploadFile = async(uploadFileData: UploadFileResponseDto) =>
        await axiosPost('/Files/upload', uploadFileData) as void
        
    const downloadFile = async(downloadFileDate: DownloadFileResponseDto) =>
        await axiosBlob('/Files/download', downloadFileDate)
        
    const deleteFile = async(systemName: string | number) =>
        await axiosDelete( `/Files/delete?systemName=${systemName}` ) as void
        
    return {
        downloadFile,
        deleteFile,
        uploadFile
    }
}