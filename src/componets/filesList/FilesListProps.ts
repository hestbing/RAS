import { UserFiles } from "../../types/models";

export interface FilesListProps {
    filesList: Array<UserFiles>;
    onFileDownload?: (displayName: string, systemName: string) => void;
    onFileDelete?: (systemName: string) => void;
}