import { FC, useEffect, useState } from 'react';
import { TextField } from '../../componets';
import { Button } from '../../componets';
import { WidgetLayout } from '../../componets';
import { useNavigate } from 'react-router-dom';
import { RoutesPaths } from '../../constants/CommonConstants';
// import { AuthApi  } from '../../api/authApi'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxToolkitHooks';
import "./LoginPageStyles.scss";
import { access } from 'fs';
import { signIn } from '../../services';

export const LoginPage: FC = () => {
    const { accessToken, role } = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()

    const [login, setLogin] = useState <string>('');
    const [password, setPassword] = useState <string>('');
    // const { signIn } = AuthApi;

    const navigate = useNavigate();

    useEffect(() => {
        if(accessToken){
            if(role === 'user' || !role){
                navigate(`/${RoutesPaths.NoPermissions}`)
            }else{
                navigate(`/${RoutesPaths.Departments}`)
            }
        }
    },[accessToken, role, navigate])

    const toRegistrationHandler = () =>{
        navigate (RoutesPaths.Registration);
    };

    const loginChangeHandler = (value: string) => {
        setLogin(value);
    };

    const passwordChangeHandler = (value: string) => {
        setPassword(value);
    };

    const loginHandler = () => {
        dispatch(signIn({login, password}))
    }

    return (
        <WidgetLayout>
            <div className="login-page__form">
                <h3 className='login-page__title'>Вход</h3>
                <div className='login-page__fields'>
                    <TextField labelText="Логин" value={login} type="text" onChange = {loginChangeHandler} />
                    <TextField labelText="Пароль" value={password} type="password" onChange = {passwordChangeHandler} />
                </div>
                <div className="login-page__actions">
                    <Button text="Войти" onClick={loginHandler} type='primary' />
                    <Button text="Зарегистрироваться" onClick={toRegistrationHandler} type='secondary' />
                </div>
            </div>
        </WidgetLayout>
    );
};