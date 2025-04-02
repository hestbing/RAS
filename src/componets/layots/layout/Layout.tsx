import { FC } from "react";
import { LayoutProps } from "./LayoutProps";
import { LogoIcon } from "../../../assets";
import { UserMenu } from "../../userMenu";
import { RoutesPaths } from "../../../constants/CommonConstants";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/reduxToolkitHooks";
import { useDispatch } from "react-redux";
import { logOut } from "../../../store/slices/userSlices";
import { MenuItem } from "../../userMenu/UserMenuProps";
import "./LayoutStyles.scss"

export const Layout: FC<LayoutProps> = props => {
    const{footer, headerChild, title, children} = props
    const { role } = useAppSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logOutHandler = () =>{ 
        dispatch(logOut())
    }

    const goToAdminHandler = () => {
        navigate(`/${RoutesPaths.Administration}`)
    }

    const exitMenuItem: MenuItem ={
        id: 'exit',
        action: logOutHandler,
        label: 'Выйти'
    }

    const AdminMenuItem: MenuItem ={
        id: 'go_to_administration',
        action: goToAdminHandler,
        label: 'Администрирование'
    }


    return(
        <div className="layout">
            <div className="layout__header">
                <div>
                    <LogoIcon/>
                </div>
                <div>
                    <div>{title ?? 'База учета посещаемости студентов'}</div>
                    <div>{headerChild}</div>
                </div>
                <div className="layout__user-menu">
                    <UserMenu items={role === 'admin' ? [AdminMenuItem, exitMenuItem] : [exitMenuItem]}/>
                </div>
            </div>
            <div className="layout__body">
                {children}
            </div>
            <div>{footer}</div>
        </div>
    );
}