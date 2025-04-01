import { AccessTokenKey } from '../constants/CommonConstants';
import { DownloadFileResponseDto, UploadFileResponseDto } from '../types/apiTypes';
import { AxiosInstance } from './axiosinstanse';

const { axiosDelete, axiosPost} = AxiosInstance(sessionStorage.getItem(AccessTokenKey) ?? '')

const uploadFile = async(uploadFileData: UploadFileResponseDto) =>
    await axiosPost('/Files/upload', uploadFileData) as void

const downloadFile = async(addVisitorData: DownloadFileResponseDto) =>
    await axiosPost('/Files/download', addVisitorData) as Blob

const deleteFile = async(id: string | number) =>
    await axiosDelete( `/Files/delete?id=${id}` ) as void

export const FilesApi = {
    uploadFile,
    downloadFile,
    deleteFile
}