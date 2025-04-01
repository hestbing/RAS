import { FC, useState } from 'react';
import { TextField } from '../../componets';
import { Button } from '../../componets';
import { WidgetLayout } from '../../componets';
import { useNavigate } from 'react-router-dom';
import { RoutesPaths } from '../../constants/CommonConstants';
import { AuthApi } from '../../api';
import { AxiosError } from 'axios';
import "./RegistrationPageStyles.scss";


type FormFieldsNames = 'login'|'password'|'repeatePassword'|'lastName'|'firstName'|'midName';
interface RegistrationForm{
    login: string;
    password: string;
    repeatePassword: string;
    // lastName: string;
    // firstName: string;
    // midName?: string;
}

export const RegistrationPage: FC = () => {
    
    const [formFields, setFormFields] = useState<RegistrationForm>()
    const [errorMessage, setErrorMessage] = useState<string>()
    const { signUp, signIn } = AuthApi

    const navigate = useNavigate()
    
    const goToLogin = () => {
        navigate(RoutesPaths.Login)
    };

    const registrationHandler = () => {
        if(!formFields?.login || !formFields?.password) {
            setErrorMessage('Не задан логин или пароль')
            return
        }
        if(formFields?.password !== formFields?.repeatePassword) {
            setErrorMessage('Пароли не совпадают')
            return
        }
        
        const data = {
            login: formFields?.login,
            password: formFields?.password
        }

        signUp(data).then(() => {
            signIn(data).then(respData => {
                if(respData.role === 'user'){
                    navigate (`/${RoutesPaths.NoPermissions}`)
                }else{
                    navigate(`/${RoutesPaths.Departments}`)
                }
            }).catch((err) => {
                setErrorMessage((err as AxiosError)?.message)
            })
            
        })
        .catch((err) => {
            setErrorMessage((err as AxiosError)?.message)
        })
    }

    const changeFieldValue = (value: string|undefined, fieldName:FormFieldsNames) => {
        setFormFields(prev =>{
            return{
                ...prev,
                [fieldName]: value
            }as RegistrationForm;
        })
    };

    return (
        <div className="">
            <WidgetLayout>
            <div className="reg-page__form">
                <h3 className='reg-page__title'>Зарегистрироваться</h3>
                <div className='reg-page__fields'>
                    <TextField labelText="Логин" value={formFields?.login} type="text" onChange = {(value) => changeFieldValue(value, 'login')} />
                    <TextField labelText="Пароль" value={formFields?.password} type="password" onChange = {(value) => changeFieldValue(value, 'password')} />
                    <TextField labelText="Повторите пароль" value={formFields?.repeatePassword} type="password" onChange = {(value) => changeFieldValue(value, 'repeatePassword')} />
                    {/* <TextField labelText="Фамилия" value={formFields?.lastName} type="text" onChange = {(value) => changeFieldValue(value, 'lastName')} />
                    <TextField labelText="Имя" value={formFields?.firstName} type="text" onChange = {(value) => changeFieldValue(value, 'firstName')} />
                    <TextField labelText="Отчество" value={formFields?.midName} type="text" onChange = {(value) => changeFieldValue(value, 'midName')} /> */}
                    {errorMessage && (<span style = {{color: 'red'}}>{errorMessage}</span>)}
                </div>
                <div className="reg-page__actions">
                    <Button text="Зарегистрироваться" onClick={registrationHandler} type='primary' />
                    <Button text="Войти" onClick={goToLogin} type='secondary' />
                </div>
            </div>
        </WidgetLayout>
        </div>
    );
}