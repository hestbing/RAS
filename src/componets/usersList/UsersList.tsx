import { FC } from "react";
import { UsersListProps } from "./UsersListProps";
import { Button } from "../../componets";
import './userListStyles.scss';


export const UsersList: FC<UsersListProps> = props => {
    const {onSetAdminRole, onSetManagerRole, onResetPermissions, usersList} = props
    
    return(
        <div className="users-list">
            {usersList.map(user => {
                return(
                    <div key={user.id} className="users-list__item">
                        <div className="users-list__item-info">
                            <span>
                                <strong>Логин: </strong>
                                <span>{user.login}</span>
                            </span>
                            <span>
                                <strong>Пароль: </strong>
                                <span>{user.password}</span>
                            </span>
                            <span>
                                <strong>Роль: </strong>
                                <span>{user.role}</span>
                            </span>
                        </div>
                        <div className="users-list__item-actions">
                            <Button text="Сделать администратором"
                                type="primary"
                                onClick={() => onSetAdminRole(user.id)} />
                            <Button text="Сделать менеджером"
                                type="primary"
                                onClick={() => onSetManagerRole(user.id)} />
                            <Button text="Убрать права"
                                type="secondary"
                                onClick={() => onResetPermissions(user.id)} />        
                        </div>
                    </div>
                )
            })}
        </div>
    )
}