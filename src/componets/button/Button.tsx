import "./buttonStyles.scss";
import { FC } from "react";
import { ButtonProps } from "./ButtonProps";
import clsx from 'classnames';

export const Button: FC<ButtonProps> = props => {
    const{
        onClick,
        text,
        type
    }=props;

    return (
        <div onClick={onClick} className={clsx('button', {
            'button__primary': type === 'primary',
            'button__secondary': type === 'secondary'
        })}>
            {text}
        </div>
    );
}  