import { WorkExpirience } from "../../types/models";

export interface WorkExperienceListProps {
    workExperienceList: Array<WorkExpirience>;
    onDelete?: (id: number) => void;
}