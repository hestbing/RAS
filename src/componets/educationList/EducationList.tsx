import { FC } from "react";
import { EducationListProps } from "./EducationListProps";
import clsx from 'classnames';
import { TrashIcon } from "../../assets";
import './educationListStyles.scss'

export const EducationList: FC<EducationListProps> = props =>{
    const { educationList, onDelete } = props

    const deleteHandler = (id: number) => {
        onDelete && onDelete(id)
    }

    return(
        <div className="education-list">
            {educationList.map(education => {
                    return(
                        <div key={education.id} className="education-list__item">
                            <div className="education-list__item-descr">
                                <span className="education-list__item-descr-title">{education.title}</span>
                                <span className="education-list__item-descr-descrription">{education.description}</span>
                            </div>
                            <div className="education-list__item-action">
                                <TrashIcon width={16} height={16} onClick={() => {deleteHandler(education.id)}}/>
                            </div>
                        </div>
                    )
                })}
        </div>
    )
}