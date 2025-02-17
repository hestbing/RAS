import { ChangeEvent, FC } from "react"
import './dialogStyles.scss'
import { DialogProps } from "./DialogProps"
import clsx from 'classnames'
import { Button } from "../button"

export const Dialog: FC<DialogProps> = props =>{
    const {className, title, children, onCancel, onSave, open=false} = props

    if(!open){
        return null;
    }

    return(
        <div className="dialog">
           <div className={clsx('dialog__paper', className)} >
            <h4 className="dialog__header">{title}</h4>
            <div className="dialog__body">
                {children}
            </div>
            <div className="dialog_footer">
                <Button type="primary" text="Сохранить" onClick={onSave}/>
                <Button type="secondary" text="Отмена" onClick={onCancel}/>
            </div>
           </div>
        </div>
    )
}