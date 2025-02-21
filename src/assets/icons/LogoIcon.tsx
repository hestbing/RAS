import { FC } from "react";
import { IconProps } from "../../types/commonTypes";

export const LogoIcon: FC<IconProps> = props =>{
    const{
        className,
        color = '#ffffff',
        height = 28,
        width = 28,
        onClick
    } = props;

    return(
        <svg width={width} height={height} 
        className={className}
        onClick={onClick}
        viewBox="0 0 24 24" 
        fill="none"
        enableBackground="new 796 796 200 200"
        xmlSpace="preserve" 
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="https://www.w3.org/1999/xlink">
        <path d="M11.95 11.95H11.959M11 17C7.13401 17 4 13.866 4 10C4 6.13401 7.13401 3 11 3M12 21C15.866 21 
        19 17.866 19 14C19 10.134 15.866 7 12 7M12.4 11.95C12.4 12.1985 12.1985 12.4 11.95 12.4C11.7015 12.4 
        11.5 12.1985 11.5 11.95C11.5 11.7015 11.7015 11.5 11.95 11.5C12.1985 11.5 12.4 11.7015 12.4 11.95Z" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"/>
        </svg>
    )
} 