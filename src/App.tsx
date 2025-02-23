import React from 'react';
import { DepartmentsPage, LoginPage } from './pages';
import { Route, Routes } from 'react-router-dom';
import { RegistrationPage } from './pages/registration';
import { RoutesPaths } from './constants/CommonConstants';
import { AdministrationPage } from './pages/administration/AdministrationPage';
import { NoPermissionsPage } from './pages/noPermessions/NoPermissionsPage';
import './styles/globalStyles.scss'

export const App: React.FC = () => {
  return (
  <Routes>
    <Route path={RoutesPaths.Login} element={<LoginPage />}/>
    <Route path={RoutesPaths.Registration} element={<RegistrationPage />}/>
    <Route path={RoutesPaths.Departments} element={<DepartmentsPage />}/>
    <Route path={RoutesPaths.Administration} element={<AdministrationPage />}/>
    <Route path={RoutesPaths.NoPermissions} element={<NoPermissionsPage />}/>
    <Route path={'*'} element={<LoginPage />}/>
  </Routes>);
};
