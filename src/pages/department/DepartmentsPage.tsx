import { FC, useEffect, useState } from "react";
import { EmployeesList, Layout, DropDown, Button, Dialog, TextField, FilesList, StudDepartmentList, WorkExperienceList } from "../../componets";
import { Fuculty, Visitors } from "../../types/models";
import { DropDownItem } from "../../componets/dropDown/DropDownProps";
import { UploadIcon } from "../../assets";
import { format } from "date-fns";
import { PlusIcon, PencilIcon, TrashIcon } from "../../assets";
// import { FucultiesApi } from "../../api";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxToolkitHooks";
import { useNavigate } from "react-router-dom";
import { RoutesPaths } from "../../constants/CommonConstants";
import './departmentsPageStyles.scss';
import { addDepart, addFuculties, addVisitors, deleteDepart, deleteFile, deleteFuculties, deleteVisitors, editFuculties, editVisitors, getFuculties } from "../../services";

export const DepartmentsPage: FC = () => {
    const { accessToken, role } = useAppSelector((state) => state.user)
    const { fuculties } = useAppSelector((state) => state.fuculties)
    const dispatch = useAppDispatch()

    const [fucultyName, setFucultyName] = useState('')
    const [showStudentDialog, setShowStudentDialog] = useState(false)
    const [studentName, setStudentName] = useState('')
    const [studentExamResults, setStudentExamResults] = useState('')
    const [studentAttending, setStudentAttending] = useState('')

    
    //const { getFuculties, deleteFuculties } = FucultiesApi

    //const [departmentsData, setDepartmentsData] = useState<Array<Department>>([])
    const [employeesData, setEmployeesData] = useState<Array<Visitors>>([])
    const [selectedDepartmentId, setSelectedDepartmentId] = useState<number>()
    const [selectedVisitors, setSelectedVisitors] = useState<Visitors>()
    const [showEmployeeDialog, setShowEmployeeDialog] = useState(false)
    const [userActionMode, setUserActionMode] = useState<'create' | 'edit'>('create')
    const [showFucultyDialog, setShowFucultyDialog] = useState(false)
    const [fucultyActionMode, setFucultyActionMode] = useState<'create' | 'edit'>('create')
    const [userToEdit, setUserToEdit] = useState(0)

    const [dayWeek, setDayWeek] = useState('')
    const [nameSubject, setNameSubject] = useState('')
    const [nameTeacher, setNameTeacher] = useState('')
    const [nameGroup, setNameGroup] = useState('')
    const [numberStudent, setNumberStudent] = useState('')
    const [numberVisitors, setNumberVisitors] = useState('')
    const [date, setDate] = useState('')
    const [course, setCourse] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        if(accessToken){
            if(role === 'user' || !role){
                navigate(`/${RoutesPaths.NoPermissions}`)
            } else {
                dispatch(getFuculties())
            }
        } else {
            navigate(`${RoutesPaths.Login}`)
        }
    },[accessToken, role, navigate, dispatch])

    useEffect(() => {
        const selectedDepartment = selectedDepartmentId ? fuculties.find(f => f.id === selectedDepartmentId): fuculties[0]
        setSelectedDepartmentId(selectedDepartment?.id)
        setEmployeesData(selectedDepartment ? selectedDepartment.visitors : []);
        if(selectedVisitors && selectedDepartment){
            const findedSelectedVisitor
                = selectedDepartment.visitors
                    .find(v => v.id === selectedVisitors.id)
            setSelectedVisitors(findedSelectedVisitor)
        } else if (selectedDepartment?.visitors.length) {
            setSelectedVisitors(selectedDepartment.visitors[0])
        } else {
            setSelectedVisitors(undefined)
        }
    }, [fuculties, selectedDepartmentId, selectedVisitors])

    useEffect(() =>{
        if(userActionMode === 'edit') {
            const employee = userActionMode === 'edit'
                ? employeesData.find(e => e.id === userToEdit)
                : undefined;
            
            setNameSubject(employee?.nameSubject ?? '')
            setNameTeacher(employee?.nameTeacher ?? '')
            setNumberStudent(employee?.numberStudent ?? '')
            setDate(employee?.date ?? '')
            setDayWeek(employee?.dayWeek ?? '')
            setNumberVisitors(employee?.numberVisitors ?? '')
            setCourse(employee?.course ?? '')
            setNameGroup(employee?.nameGroup ?? '')
        }
    }, [employeesData, userActionMode, userToEdit])

    const clearEmployeeDialogFields = () => {
        setUserActionMode('create')
        setUserToEdit(0)
        setNameSubject('')
        setNameTeacher('')
        setNumberStudent('')
        setDate('')
        setDayWeek('')
        setNumberVisitors('')
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

    const closeEmployeeDialogHandler = () => {
        setShowEmployeeDialog(false)
        clearEmployeeDialogFields()
    }

    const saveVisitorDialogHandler = () => {
        if (!selectedDepartmentId) {
            closeEmployeeDialogHandler()
            return
        }
    
        const savingVisitors = {
            fucultyId: selectedDepartmentId,
            dayWeek,
            nameSubject,
            nameTeacher,
            nameGroup,
            numberStudent,
            numberVisitors,
            date,
            course
        }
    
        if (userActionMode === 'create') {
            dispatch(addVisitors(savingVisitors))
        }
    
        if (userActionMode === 'edit' && selectedVisitors) {
            dispatch(editVisitors({
                ...savingVisitors,
                id: selectedVisitors.id,
                students: selectedVisitors.students,
                userFiles: selectedVisitors.userFile
            }))
        }
        closeEmployeeDialogHandler()
    }

    const deleteVisitorHandler = (id: number) => {
        setUserToEdit(id)
        if(window.confirm('Вы действительно хотите удалить данное занятие?')){
            dispatch(deleteVisitors(id))
        }
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
        return `${selectedVisitors.nameSubject} ${selectedVisitors.nameTeacher} гр. ${selectedVisitors.nameGroup} 
        ${selectedVisitors.course} курс, количество студентов ${selectedVisitors.numberStudent} `.trim()
    }

    const uploadFileHandler = () => {

    }

    const downloadFileHandler = (id: number) => {

    }

    const deleteFileHandler = (id: number) => {
        if (window.confirm("Вы действительно хотите удалить данный файл?")) {
            dispatch(deleteFile(id))
        }
    }
    
    const createFucultytHandler = () => {
        setFucultyActionMode('create')
        setShowFucultyDialog(true)
        setFucultyName('')
    }
    
    const editFucultyHandler = () => {
        if (!selectedDepartmentId) return
        
        setFucultyActionMode('edit')
        const fuculty = fuculties.find(f => f.id === selectedDepartmentId)
        setFucultyName(fuculty?.name || '')
        setShowFucultyDialog(true)
    }
    
    const closeFucultyDialogHandler = () => {
        setShowFucultyDialog(false)
        setFucultyName('')
        setFucultyActionMode('create')
    }

    const saveFucultyHandler = () => {
        if (fucultyActionMode === 'create') {
            dispatch(addFuculties({ name: fucultyName }))
            closeFucultyDialogHandler()
            return 
        }
    
        if (!selectedDepartmentId) {
            closeFucultyDialogHandler()
            return;
        }
    
        if (fucultyActionMode === 'edit') {
            dispatch(editFuculties({
                id: selectedDepartmentId,
                name: fucultyName
            }));
            closeFucultyDialogHandler()
        }
    }

    const deleteFucultiesHandler = () => {
        if(selectedDepartmentId && window.confirm('Вы действительно хотите удалить данный факультет?')) {
            dispatch(deleteFuculties(selectedDepartmentId))
            setSelectedDepartmentId(undefined)
        }
    }

    return(
        <Layout>
            {role === 'admin' && (
                <Dialog title={userActionMode !== 'edit' ? 'Добавить занятие' : 'Изменить занятие'}
                open={showFucultyDialog}
                onSave={saveFucultyHandler}
                onCancel={closeFucultyDialogHandler}
                >
                    <TextField labelText="Наименование" value={fucultyName} onChange={(val) => setFucultyName(val)}/>
                </Dialog>
            )}
                <Dialog title={userActionMode !== 'edit' ? 'Добавить занятие' : 'Изменить занятие'}
                open={showEmployeeDialog}
                onSave={saveVisitorDialogHandler}
                onCancel={closeEmployeeDialogHandler}
                >
                    <TextField labelText="Название предмета" value={nameSubject} onChange={(val) => setNameSubject(val)}/>
                    <TextField labelText="Имя учителя" value={nameTeacher} onChange={(val) => setNameTeacher(val)}/>
                    <TextField labelText="Курс" value={course} onChange={(val) => setCourse(val)}/>
                    <TextField labelText="Группа" value={nameGroup} onChange={(val) => setNameGroup(val)}/>
                    <TextField labelText="Количество студентов" value={numberStudent} onChange={(val) => setNumberStudent(val)}/>
                    <TextField labelText="Посещаемость" value={numberVisitors} onChange={(val) => setNumberVisitors(val)}/>
                    
                    <TextField labelText="День недели" value={dayWeek} onChange={(val) => setDayWeek(val)}/>
                </Dialog>
                <Dialog title="Данные о студенте"
                open={showStudentDialog}
                onSave={()=>{
                    dispatch(addDepart({
                        visitorId: selectedVisitors!.id,
                        fioStudent: studentName,
                        examResults: studentExamResults,
                        attending: studentAttending
                    }));
                    setShowStudentDialog(false)
                    setStudentName('')
                    setStudentExamResults('')
                    setStudentAttending('')
                }}
                onCancel={() => {
                    setShowStudentDialog(false)
                    setStudentName('')
                    setStudentExamResults('')
                    setStudentAttending('')
                }}
                >
                    <TextField labelText="Имя" value={studentName} onChange={(val) => setStudentName(val)}/>
                    <TextField labelText="Результаты экзаменов" value={studentExamResults} onChange={(val) => setStudentExamResults(val)}/>
                    <TextField labelText="Посещаемость" value={studentAttending} onChange={(val) => setStudentAttending(val)}/>
                </Dialog>
            <div className="dep-page">
                <div className="dep-page__users-list-container">
                    <div className="dep-page__add-btn">
                        <DropDown
                        items ={fuculties.map(dd => {
                            return{
                                text: dd.name,
                                value: dd.id.toString()
                            } as DropDownItem
                        }) ?? []}
                            label="Факультеты"
                            selectedChanged={(val) => departmentChangeHandler(val)}
                        />
                        {role === 'admin' && (<>
                            <PlusIcon width={16} height={16} onClick={createFucultytHandler} />
                            <PencilIcon width={16} height={16} onClick={editFucultyHandler}/>
                            <TrashIcon width={16} height={16} onClick={deleteFucultiesHandler}/>
                            </>
                        )}
                    </div>
                    <div>
                        Список занятий
                    </div>
                    <EmployeesList visitorsList = {employeesData}
                    onItemClick={(id) => onEmployeeSelectedHandler(id)}
                    onItemDelete={deleteVisitorHandler}
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
                                        selectedVisitors?.date ?? '-' 
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
                            {selectedVisitors && (<UploadIcon onClick={uploadFileHandler} color="#7a7a7a"/>)}
                        </div>
                    </div>
                    <div className="dep-page__user-add-info">
                        <div className="dep-page__user-add-info-files"> 
                            <span className="dep-page__label" >Прикрепленные файлы</span>
                            <FilesList 
                                onFileDownload={downloadFileHandler}
                                onFileDelete={deleteFileHandler}
                                filesList={selectedVisitors?.userFile ?? []}/>
                        </div>
                        <div className="dep-page__user-add-info-data">
                            <div className="dep-page__user-add-info-data__cell">
                                <div className="dep-page__list-title">
                                    <span className="dep-page__label">Студенты</span>
                                    {!!selectedVisitors && (
                                        <PlusIcon width={16} height={16} className="dep-page__add-btn" onClick={() => setShowStudentDialog(true)}/>
                                    )}
                                </div>    
                                <StudDepartmentList StudDepartmentList={selectedVisitors?.students ?? []} onDelete={(id) => {
                                    if(window.confirm('Вы действительно хотите удалить данную запись об студенте?')){
                                        dispatch(deleteDepart(id));
                                    }
                                }} />
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