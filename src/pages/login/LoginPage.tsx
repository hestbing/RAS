import { FC, useState } from 'react';
import { TextField } from '../../componets';
import { Button } from '../../componets';
import { WidgetLayout } from '../../componets';
import "./LoginPageStyles.scss";
import { useNavigate } from 'react-router-dom';
import { RoutesPaths } from '../../constants/CommonConstants';

export const LoginPage: FC = () => {

    const [login, setLogin] = useState <string>('');
    const [password, setPassword] = useState <string>(''); 

    const navigate = useNavigate();

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
        console.log({
            login,
            password
        });
        navigate(RoutesPaths.Departments);
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