import { FC, useState } from 'react';
import { TextField } from '../../componets';
import { Button } from '../../componets';
import { WidgetLayout } from '../../componets';
import "./RegistrationPageStyles.scss";
import { useNavigate } from 'react-router-dom';
import { RoutesPaths } from '../../constants/CommonConstants';


type FormFieldsNames = 'login'|'password'|'repeatePassword'|'lastName'|'firstName'|'midName';
interface RegistrationForm{
    login: string;
    password: string;
    repeatePassword: string;
    lastName: string;
    firstName: string;
    midName?: string;
}

export const RegistrationPage: FC = () => {
    
    const [formFields, setFormFields] = useState<RegistrationForm>();

    const navigate = useNavigate();
    
    const goToLogin = () => {
        navigate(RoutesPaths.Login);
    };

    const registrationHandler = () => {
        navigate(RoutesPaths.Departments);
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
                    <TextField labelText="Фамилия" value={formFields?.lastName} type="text" onChange = {(value) => changeFieldValue(value, 'lastName')} />
                    <TextField labelText="Имя" value={formFields?.firstName} type="text" onChange = {(value) => changeFieldValue(value, 'firstName')} />
                    <TextField labelText="Отчество" value={formFields?.midName} type="text" onChange = {(value) => changeFieldValue(value, 'midName')} />
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