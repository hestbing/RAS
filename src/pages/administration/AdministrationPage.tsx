import { FC, useEffect, useState } from 'react'
import { User } from '../../types/models'
import { useNavigate } from 'react-router-dom'
import { Layout, Button, UsersList} from '../../componets'
import { RoutesPaths } from '../../constants/CommonConstants'
import { getUsers, setUserRole } from '../../services'
import './administrationPageStyles.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxToolkitHooks'

export const AdministrationPage: FC = () => {
    const { users } = useAppSelector((state) => state.administration)
    const { accessToken, role } = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(accessToken) {
            if(role === 'user' || role === 'manager' || !role) {
                navigate(`${RoutesPaths.NoPermissions}`)
            } else {
                dispatch(getUsers())
            }
        } else {
            navigate(`${RoutesPaths.Login}`)
        }
    }, [accessToken, role, navigate, dispatch])

    const setAdminRoleHandler = (id: number) => {
        dispatch(setUserRole({id: id, role: 'admin'}))
    }

    const setManagerRoleHandler = (id: number) => {
        dispatch(setUserRole({id: id, role: 'manager'}))
    }

    const resetPermissionsHandler = (id: number) => {
        dispatch(setUserRole({id: id, role: 'user'}))
    }

    return(
        <Layout title='Администрирование'>
            <Button text='На главную'
            onClick={() => navigate(`/${RoutesPaths.Departments}`)}
            className='button'
            type='primary'/>
            <UsersList usersList = {users}
                onSetAdminRole = {setAdminRoleHandler}
                onSetManagerRole = {setManagerRoleHandler}
                onResetPermissions={resetPermissionsHandler}
            />
        </Layout>
    )
}