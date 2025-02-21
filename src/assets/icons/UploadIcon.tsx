import { FC } from "react";
import { IconProps } from "../../types/commonTypes";

export const UploadIcon: FC<IconProps> = props =>{
    const{
        className,
        color = '#555555',
        height = 35,
        width = 35,
        onClick
    } = props;

    return(
        <svg width={width} 
        height={height}
        viewBox="0 0 24 24" 
        fill={color} 
        onClick={onClick}
        xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H12M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125" 
                stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M17.5 21L17.5 15M17.5 15L20 17.5M17.5 15L15 17.5" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
} 