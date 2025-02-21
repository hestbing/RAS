import { FC } from "react";
import { WorkExperienceListProps } from "./WorkExperienceProps";
import clsx from 'classnames';
import { TrashIcon } from "../../assets";
import './workExperienceStyles.scss'

export const WorkExperienceList: FC<WorkExperienceListProps> = props =>{
    const { workExperienceList, onDelete } = props

    const deleteHandler = (id: number) => {
        onDelete && onDelete(id)
    }

    return(
        <div className="workExperience-list">
            {workExperienceList.map(workExp => {
                    return(
                        <div key={workExp.id} className="workExperience-list__item">
                            <div className="workExperience-list__item-descr">
                                <span>{workExp.description}</span>
                                <span className="workExperience-list__item-descr-workedYears">Лет: {workExp.workedYears}</span>
                            </div>
                            <div className="workExperience-list__item-action">
                                <TrashIcon width={16} height={16} onClick={() => {deleteHandler(workExp.id)}}/>
                            </div>
                        </div>
                    )
                })}
        </div>
    )
}