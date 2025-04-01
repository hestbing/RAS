import { Students } from "../../types/models";

export interface StudDepartmentListProps {
    StudDepartmentList: Array<Students>;
    onDelete?: (id: number) => void;
}