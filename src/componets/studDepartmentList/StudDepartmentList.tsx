import { FC } from "react";
import { StudDepartmentListProps } from "./StudDepartmentListProps";
import { UploadIcon } from "../../assets";
import './studDepartmentListStyles.scss'

export const StudDepartmentList: FC<StudDepartmentListProps> = props =>{
    const { StudDepartmentList, onDelete } = props

    const deleteHandler = () => {
        onDelete && onDelete()
    }

    return(
        <div className="education-list">
            {StudDepartmentList.map(education => {
                    return(
                        <div key={education.id} className="education-list__item">
                            <div className="education-list__item-descr">
                                <span className="education-list__item-descr-title">{education.fioStudent}</span>
                                <span className="education-list__item-descr-descrription">{education.examResults}</span>
                            </div>
                            <div className="education-list__item-action">
                                <UploadIcon width={16} height={16} onClick={() => {deleteHandler()}}/>
                            </div>
                        </div>
                    )
                })}
        </div>
    )
}