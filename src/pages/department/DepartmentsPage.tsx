import { FC, useEffect, useState } from "react";
import { EmployeesList, Layout, DropDown, Button, Dialog, TextField, FilesList, EducationList, WorkExperienceList } from "../../componets";
import { Employee, Department } from "../../types/models";
import { DropDownItem } from "../../componets/dropDown/DropDownProps";
import { UploadIcon } from "../../assets";
import { format } from "date-fns";
import { PlusIcon } from "../../assets";
import './departmentsPageStyles.scss';

const fakeEmployeesData = [
    {id: 1, lastName: 'Иванов', firstName: 'Иван', midleName: 'Иванович', birthDate: new Date().toISOString(), email: 'ivanov1@ivan.com', phoneNumber: '1-900-555-55-55'},
    {id: 2, lastName: 'Иванов', firstName: 'Иван', midleName: 'Иванович', birthDate: new Date().toISOString(), email: 'ivanov2@ivan.com', phoneNumber: '2-900-555-55-55'},
    {id: 3, lastName: 'Иванов', firstName: 'Иван', birthDate: new Date().toISOString(), email: 'ivanov3@ivan.com', phoneNumber: '3-900-555-55-55', 
        education: [{
            id: 1,
            description: 'ФИТГБ',
            title: 'ВГТУ'
        },{
            id: 2,
            description: 'Курсы',
            title: 'Яндекс практикум'
        },{
            id: 3,
            description: 'Практика',
            title: 'Завод'
        }], 
        workExpirience: [{
            id: 1,
            workedYears: 3,
            description: 'Завод'
        },{
            id: 2,
            workedYears: 2,
            description: 'Завод 2'
        },{
            id: 3,
            workedYears: 1,
            description: 'Завод 3'
        }]},
    {id: 4, lastName: 'Иванов', firstName: 'Иван', midleName: 'Иванович', birthDate: new Date().toISOString(), email: 'ivanov4@ivan.com', phoneNumber: '4-900-555-55-55'},
    {id: 5, lastName: 'Иванов', firstName: 'Иван', midleName: 'Иванович', birthDate: new Date().toISOString(), email: 'ivanov5@ivan.com', phoneNumber: '5-900-555-55-55'}
] as Array<Employee>

const fakeDepartmentsData = [
    {id: 1, name: 'Отдел 1', employees: []},
    {id: 2, name: 'Отдел 2', employees: fakeEmployeesData},
    {id: 3, name: 'Отдел 3', employees: []},
] as Array<Department>

export const DepartmentsPage: FC = () => {
    const [departmentsData, setDepartmentsData] = useState<Array<Department>>([])
    const [employeesData, setEmployeesData] = useState<Array<Employee>>([])
    const [selectedDepartmentId, setSelectedDepartmentId] = useState<number>()
    const [selectedEmployee, setSelectedEmployee] = useState<Employee>()
    const [showEmployeeDialog, setShowEmployeeDialog] = useState(false)
    const [userActionMode, setUserActionMode] = useState<'create' | 'edit'>('create')
    const [userToEdit, setUserToEdit] = useState(0)

    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [midleName, setMidleName] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    useEffect(() => {
        setTimeout(() => {
            setDepartmentsData(fakeDepartmentsData);
            if(Array.isArray(fakeDepartmentsData) && fakeDepartmentsData.length){
                setSelectedDepartmentId(fakeDepartmentsData[0].id)
            }
        }, 2000)
    }, [])

    useEffect(() => {
        const selectedDepartment = departmentsData.find (d => d.id === selectedDepartmentId);
        setEmployeesData(selectedDepartment ? selectedDepartment.employees : []);
        setSelectedEmployee(undefined)
    }, [departmentsData, selectedDepartmentId])

    useEffect (() => {
        setEmployeesData(fakeEmployeesData);
    }, [])

    useEffect(() =>{
        if(userActionMode === 'edit') {
            const employee = userActionMode === 'edit'
                ? employeesData.find(e => e.id === userToEdit)
                : undefined;
            
            setLastName(employee?.lastName ?? '')
            setFirstName(employee?.firstName ?? '')
            setMidleName(employee?.midleName ?? '')

            setBirthDate(employee?.birthDate ?? '')
            setEmail(employee?.email ?? '')
            setPhoneNumber(employee?.phoneNumber ?? '')
        }
    }, [employeesData, userActionMode, userToEdit])

    const clearEmployeeDialogFields = () => {
        setUserActionMode('create')
        setUserToEdit(0)
        setLastName('')
        setFirstName('')
        setMidleName('')
        setBirthDate('')
        setEmail('')
        setPhoneNumber('')
    }

    const createEmployeeHandler = () => {
        setUserActionMode('create')
        setShowEmployeeDialog(true)
    }

    const editEmployeeHandler = (id: number) => {
        setUserActionMode('edit')
        setUserToEdit(id)
        setShowEmployeeDialog(true)
    }

    // const userDialogContentRender = () => {
    //     return(
    //         <>
    //             <TextField labelText="Фамилия"/>
    //             <TextField labelText="Имя"/>
    //             <TextField labelText="Отчество"/>
    //         </>
    //     );
    // }

    const userDialogContentRenderer = () => {
        return(
            <>
                <TextField labelText="Фамилия" value={lastName} onChange={(val) => setLastName(val)}/>
                <TextField labelText="Имя" value={firstName} onChange={(val) => setFirstName(val)}/>
                <TextField labelText="Отчество" value={midleName} onChange={(val) => setMidleName(val)}/>
                <TextField labelText="Дата рождения" value={birthDate} onChange={(val) => setBirthDate(val)}/>
                <TextField labelText="Почта" value={email} onChange={(val) => setEmail(val)}/>
                <TextField labelText="Телофон" value={phoneNumber} onChange={(val) => setPhoneNumber(val)}/>
            </>
        )
    }

    const closeEmployeeDialogHandler = () => {
        setShowEmployeeDialog(false)
        clearEmployeeDialogFields()
    }

    const departmentChangeHandler = (id?: string) => {
        const _id: number | undefined = !id ? undefined : +id;
        setSelectedDepartmentId (_id);
    }

    const onEmployeeSelectedHandler = (id: number) =>{
        const employee = employeesData.find(e => e.id === id)
        setSelectedEmployee(employee);
    }

    const getFIO = () =>{
        if(!selectedEmployee){
            return ''
        }
        return `${selectedEmployee.lastName} ${selectedEmployee.firstName} ${selectedEmployee.midleName ?? ''}`.trim()
    }

    const uploadFileHendler = () => {

    }

    const downloadFileHendler = (id: number) => {

    }

    const deleteFileHendler = (id: number) => {
        alert(id)
    }

    return(
        <Layout>
            <Dialog title={userActionMode !== 'edit' ? 'Добавить сотрудника' : 'Изменить сотрудника'}
                    open={showEmployeeDialog}
                    onSave={() => {}}
                    onCancel={closeEmployeeDialogHandler}>
                        {userDialogContentRenderer()}
                    </Dialog>  
            <div className="dep-page">
                <div className="dep-page__users-list-container">
                    <DropDown items ={departmentsData.map(dd => {
                        return{
                            text: dd.name,
                            value: dd.id.toString()
                        } as DropDownItem
                    })} 
                        label="Отделы"
                        selectedChanged={(val) => departmentChangeHandler(val)}
                    />
                    <div>
                        Список сотрудников
                    </div>
                    <EmployeesList employeesList = {employeesData}
                    onItemClick={(id) => onEmployeeSelectedHandler(id)}
                    onItemDelete={(id) => console.log('delete', id)}
                    onItemEdit={editEmployeeHandler}/>
                    <Button text="Добавить сотрудника" className="dep-page__add-user-btn" onClick={createEmployeeHandler}/>
                </div>
                <div className='dep-page__user-info-container'>      
                    <div className='dep-page__user-info-header'>
                        <div className='dep-page__user-info-user'>
                            <div className='dep-page__user-info-fullname'>
                                {getFIO()}
                            </div>
                            <div className='dep-page__user-info-pers-data'>
                                <div>
                                    <strong>Дата рождения: </strong>
                                    <span>{
                                        selectedEmployee?.birthDate 
                                            ? format(new Date(selectedEmployee.birthDate), 'dd.MM.yyyy')
                                            : '-'
                                    }</span>
                                </div>
                                <div>
                                    <strong>Почта: </strong>
                                    <span>{selectedEmployee?.email ?? '-'}</span>
                                </div>
                                <div>
                                    <strong>Телефон: </strong>
                                    <span>{selectedEmployee?.phoneNumber ?? '-'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="dep-page__user-info-action">
                            <UploadIcon onClick={uploadFileHendler}/>
                        </div>
                    </div>
                    <div className="dep-page__user-add-info">
                        <div className="dep-page__user-add-info-files"> 
                            <span className="dep-page__label" >Прикрепленные данные</span>
                            <FilesList 
                                onFileDownload={downloadFileHendler}
                                onFileDelete={deleteFileHendler}
                                filesList={[{
                                    id: 1,
                                    displayName: 'my_file.txt',
                                    systemName: 'sadoif'
                                },{
                                    id: 2,
                                    displayName: 'my_file2.txt',
                                    systemName: 'dsafadsf'
                                }]}/>
                        </div>
                        <div className="dep-page__user-add-info-data">
                            <div className="dep-page__user-add-info-data__cell">
                                <div className="dep-page__list-title">
                                    <span className="dep-page__label">Данные об образовании</span>
                                    <PlusIcon width={16} height={16} />
                                </div>    
                                <EducationList educationList={[{
                                    id: 1,
                                    title: 'Высшее образование',
                                    description: 'Инженер-программист'
                                },{
                                    id: 2,
                                    title: 'Низшее образование',
                                    description: 'Системный администратор'
                                }]} />
                            </div>
                            <div className="dep-page__user-add-info-data__cell"> 
                                <div className="dep-page__list-title">
                                    <span className="dep-page__label">Данные о работе</span>
                                    <PlusIcon width={16} height={16} />
                                </div>
                                <WorkExperienceList workExperienceList={[{
                                    id: 1,
                                    workedYears: 3,
                                    description: 'Завод 1'
                                },{
                                    id: 2,
                                    workedYears: 2,
                                    description: 'Завод 2'
                                }]} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}