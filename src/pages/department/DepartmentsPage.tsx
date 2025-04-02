import { FC, useEffect, useState } from "react";
import { EmployeesList, Layout, DropDown, Button, Dialog, TextField, FilesList, StudDepartmentList, WorkExperienceList } from "../../componets";
import { Department, Visitors } from "../../types/models";
import { DropDownItem } from "../../componets/dropDown/DropDownProps";
import { UploadIcon } from "../../assets";
import { format } from "date-fns";
import { PlusIcon, PencilIcon, TrashIcon } from "../../assets";
import { FucultiesApi } from "../../api";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxToolkitHooks";
import './departmentsPageStyles.scss';
import { useNavigate } from "react-router-dom";
import { RoutesPaths } from "../../constants/CommonConstants";

export const DepartmentsPage: FC = () => {
    const { accessToken, role } = useAppSelector((state) => state.user)
    

    const { getFuculties, deleteFuculties } = FucultiesApi

    const [departmentsData, setDepartmentsData] = useState<Array<Department>>([])
    const [employeesData, setEmployeesData] = useState<Array<Visitors>>([])
    const [selectedDepartmentId, setSelectedDepartmentId] = useState<number>()
    const [selectedVisitors, setSelectedVisitors] = useState<Visitors>()
    const [showEmployeeDialog, setShowEmployeeDialog] = useState(false)
    const [userActionMode, setUserActionMode] = useState<'create' | 'edit'>('create')
    const [userToEdit, setUserToEdit] = useState(0)

    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [midleName, setMidleName] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        if(accessToken){
            if(role === 'user' || !role){
                navigate(`/${RoutesPaths.NoPermissions}`)
            } 
        } else {
            navigate(`${RoutesPaths.Login}`)
        }
    },[accessToken, role, navigate])

    useEffect(() => {
        getFuculties()
        .then(respData => {
            setDepartmentsData(respData)
            if(respData.length){
                setSelectedDepartmentId(respData[0].id)
            }
        }).catch(err => {
            setDepartmentsData([])
            console.log(err)
        })
    }, [getFuculties])

    useEffect(() => {
        const selectedDepartment = departmentsData.find (d => d.id === selectedDepartmentId);
        setEmployeesData(selectedDepartment ? selectedDepartment.visitors : []);
        setSelectedVisitors(undefined)
    }, [departmentsData, selectedDepartmentId])

    useEffect(() =>{
        if(userActionMode === 'edit') {
            const employee = userActionMode === 'edit'
                ? employeesData.find(e => e.id === userToEdit)
                : undefined;
            
            setLastName(employee?.nameSubject ?? '')
            setFirstName(employee?.nameTeacher ?? '')
            setMidleName(employee?.numberStudent ?? '')

            setBirthDate(employee?.date ?? '')
            setEmail(employee?.dayWeek ?? '')
            setPhoneNumber(employee?.numberVisitors ?? '')
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
        setSelectedVisitors(employee);
    }

    const getFIO = () =>{
        if(!selectedVisitors){
            return ''
        }
        return `${selectedVisitors.nameSubject} ${selectedVisitors.nameTeacher} гр. ${selectedVisitors.nameGroup}, количество студентов ${selectedVisitors.numberStudent} `.trim()
    }

    const deleteFucultiesHandler = () => {
        if(!window.confirm('Вы действительно хотите удалить данный факультет?')) {
            return
        }
        if(!selectedDepartmentId){
            return
        }

        deleteFuculties(selectedDepartmentId).then(() =>{
            setDepartmentsData(prev => {
                const filtered = prev.filter(d => d.id !== selectedDepartmentId)
                return [...filtered]
            })
        }).catch(err => {
            console.log(err)
        })
    }

    const uploadFileHandler = () => {

    }

    const downloadFileHandler = (id: number) => {

    }

    const deleteFileHandler = (id: number) => {
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
                    <div className="dep-page__add-btn">
                        <DropDown
                        items ={departmentsData.map(dd => {
                            return{
                                text: dd.name,
                                value: dd.id.toString()
                            } as DropDownItem
                        })} 
                            label="Факультеты"
                            selectedChanged={(val) => departmentChangeHandler(val)}
                        />
                        {role === 'admin' && (<>
                            <PlusIcon width={16} height={16} />
                            <PencilIcon width={16} height={16} />
                            <TrashIcon width={16} height={16} onClick={deleteFucultiesHandler}/>
                            </>
                        )}
                    </div>
                    <div>
                        Список занятий
                    </div>
                    <EmployeesList visitorsList = {employeesData}
                    onItemClick={(id) => onEmployeeSelectedHandler(id)}
                    onItemDelete={(id) => console.log('delete', id)}
                    onItemEdit={editEmployeeHandler}/>
                    <Button text="Добавить занятие" className="dep-page__add-user-btn" onClick={createEmployeeHandler}/>
                </div>
                <div className='dep-page__user-info-container'>      
                    <div className='dep-page__user-info-header'>
                        <div className='dep-page__user-info-user'>
                            <div className='dep-page__user-info-fullname'>
                                {getFIO()}
                            </div>
                            <div className='dep-page__user-info-pers-data'>
                                <div>
                                    <strong>Дата: </strong>
                                    <span>{
                                        selectedVisitors?.date 
                                            ? format(new Date(selectedVisitors.date), 'dd.MM.yyyy')
                                            : '-'
                                    }</span>
                                </div>
                                <div>
                                    <strong>День недели: </strong>
                                    <span>{selectedVisitors?.dayWeek ?? '-'}</span>
                                </div>
                                <div>
                                    <strong>Количество присутствующих: </strong>
                                    <span>{selectedVisitors?.numberVisitors ?? '-'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="dep-page__user-info-action">
                            <UploadIcon onClick={uploadFileHandler}/>
                        </div>
                    </div>
                    <div className="dep-page__user-add-info">
                        <div className="dep-page__user-add-info-files"> 
                            <span className="dep-page__label" >Прикрепленные данные</span>
                            <FilesList 
                                onFileDownload={downloadFileHandler}
                                onFileDelete={deleteFileHandler}
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
                                    <span className="dep-page__label">Студенты</span>
                                    <PlusIcon width={16} height={16} />
                                </div>    
                                <StudDepartmentList StudDepartmentList={selectedVisitors?.students ?? []} />
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