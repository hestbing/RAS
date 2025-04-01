import { ChangeEvent, FC } from "react"
import './dropDownStyles.scss'
import { DropDownProps } from "./DropDownProps"
import clsx from 'classnames';

export const DropDown: FC<DropDownProps> = props =>{

    const {items, selectedChanged, label, lblWeight, className} = props

    const selectesChangeHandler = (event: ChangeEvent<HTMLSelectElement>) =>{
        selectedChanged && selectedChanged(event.target.value)
    }

    return(
        <div className="drop-down">
            {!!label && (
                <label className={clsx('drop-down__lbl', {
                            'drop-down__lbl_strong': lblWeight === 'strong',
                })}>
                    {label}
                </label>
            )}
            <select className="drop-down__select" onChange={selectesChangeHandler}>
                {items.map((item, idx) => {
                    return(
                        <option key={idx} value ={item.value}> {item.text} </option>
                    )
                })}
            </select>
        </div>
    )
}