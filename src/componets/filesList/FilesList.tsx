import { FC } from "react";
import { FilesListProps } from "./FilesListProps";
import clsx from 'classnames';
import { DownloadIcon, TrashIcon } from "../../assets";
import './filesListStyles.scss'

export const FilesList: FC<FilesListProps> = props =>{
    const {filesList, onFileDelete, onFileDownload} = props

    const downloadHandler = (displayName: string, systemName: string) => {
        onFileDownload && onFileDownload(displayName, systemName)
    }

    const deleteHandler = (systemName: string) => {
        onFileDelete && onFileDelete(systemName)
    }

    return(
        <div className="files-list">
            {filesList.map(file => {
                    return(
                        <div key={file.id} className="files-list__item">
                            <div>
                                <span>{file.displayName}</span>
                            </div>
                            <div className="files-list__item-action">
                                <DownloadIcon width={16} height={16} onClick={() => {downloadHandler(file.displayName, file.systemName)}}/>
                                <TrashIcon width={16} height={16} onClick={() => {deleteHandler(file.systemName)}}/>
                            </div>
                        </div>
                    )
                })}
        </div>
    )
}