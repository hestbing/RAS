import { FC, useEffect, useState } from "react";
import { EmployeesList, Layout, DropDown, Button, Dialog, TextField } from "../../componets";
import './departmentsPageStyles.scss';
import { Employee, Department } from "../../types/models";
import { DropDownItem } from "../../componets/dropDown/DropDownProps";

const fakeEmployeesData = [
    {id: 1, lastName: 'Иванов', firstName: 'Иван', midleName: 'Иванович', birthDate: new Date().toISOString(), email: 'ivanov@ivan.com', phoneNumber: '8-900-555-55-55'},
    {id: 2, lastName: 'Иванов', firstName: 'Иван', midleName: 'Иванович', birthDate: new Date().toISOString(), email: 'ivanov@ivan.com', phoneNumber: '8-900-555-55-55'},
    {id: 3, lastName: 'Иванов', firstName: 'Иван', birthDate: new Date().toISOString(), email: 'ivanov@ivan.com', phoneNumber: '8-900-555-55-55'},
    {id: 4, lastName: 'Иванов', firstName: 'Иван', midleName: 'Иванович', birthDate: new Date().toISOString(), email: 'ivanov@ivan.com', phoneNumber: '8-900-555-55-55'},
    {id: 5, lastName: 'Иванов', firstName: 'Иван', midleName: 'Иванович', birthDate: new Date().toISOString(), email: 'ivanov@ivan.com', phoneNumber: '8-900-555-55-55'}
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
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>()
    const [showEmployeeDialog, setShowEmployeeDialog] = useState(false)
    const [userActionMode, setUserActionMode] = useState<'create' | 'edit'>('create')
    const [userToEdit, setUserToEdit] = useState(0)

    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [midleName, setMidleName] = useState('')

    useEffect(() => {
        setTimeout(() => {
            setDepartmentsData(fakeDepartmentsData);
            if(Array.isArray(fakeDepartmentsData) && fakeDepartmentsData.length){
                setSelectedEmployeeId(fakeDepartmentsData[0].id)
            }
        }, 2000)
    }, [])

    useEffect(() => {
        const selectedDepartment = departmentsData.find (d => d.id === selectedDepartmentId);
        setEmployeesData(selectedDepartment ? selectedDepartment.employees : []);
        setSelectedEmployeeId(undefined)
    }, [departmentsData, selectedDepartmentId])

    useEffect (() => {
        setEmployeesData(fakeEmployeesData);
    }, [])

    useEffect(() =>{
        setLastName('')
        setFirstName('')
        setMidleName('')
        if(userActionMode === 'edit') {
            const employee = userActionMode === 'edit'
                ? employeesData.find(e => e.id === userToEdit)
                : undefined;
            
            setLastName(employee?.lastName ?? '')
            setFirstName(employee?.firstName ?? '')
            setMidleName(employee?.midleName ?? '')
        }
    }, [employeesData, userActionMode, userToEdit])

    const createEmployeeHandler = () => {
        setUserActionMode('create');
        setShowEmployeeDialog(true);
    }

    const editEmployeeHandler = (id: number) => {
        setUserActionMode('edit');
        setUserToEdit(id);
        setShowEmployeeDialog(true);
    }

    const userDialogContentRender = () => {
        return(
            <>
                <TextField labelText="Фамилия"/>
                <TextField labelText="Имя"/>
                <TextField labelText="Отчество"/>
            </>
        );
    }

    const userDialogContentRenderer = () => {
        return(
            <>
                <TextField labelText="Фамилия" value={lastName} onChange={(val) => setLastName(val)}/>
                <TextField labelText="Имя" value={firstName} onChange={(val) => setFirstName(val)}/>
                <TextField labelText="Отчество" value={midleName} onChange={(val) => setMidleName(val)}/>
            </>
        )
    }

    const closeEmployeeDialogHandler = () => {
        setShowEmployeeDialog(false);
        setLastName('');
        setFirstName('');
        setMidleName('');
    }

    const departmentChangeHandler = (id?: string) => {
        const _id: number | undefined = !id ? undefined : +id;
        setSelectedDepartmentId (_id);
    }

    const onEmployeeSelectedHandler = (id: number) =>{
        setSelectedEmployeeId(id);
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
                <div>

                    <Dialog title={userActionMode !== 'edit' ? 'Добавить сотрудника' : 'Изменить сотрудника'}
                    open={showEmployeeDialog}
                    onSave={() => {}}
                    onCancel={closeEmployeeDialogHandler}>
                        {userDialogContentRenderer()}
                    </Dialog>      

                    <div>
                        <span>ФИО</span>
                        <div>+</div>
                    </div>
                    <div>
                        <div>Личные данные данные данные</div>
                        <div>Данные о работе</div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}