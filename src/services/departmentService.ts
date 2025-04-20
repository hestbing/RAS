import { createAsyncThunk } from "@reduxjs/toolkit";
import { 
    UploadFileResponseDto,
    AddDepartResponseDto,
    AddFucultiesResponseDto,
    AddVisitorResponseDto,
    EditFucultiesResponseDto,
    UpdateVisitorResponseDto } from "../types/apiTypes";
import { AsyncThunkOptions } from "../types/toolkitTypes";
import { FucultiesApi, VisitorApi, FilesApi } from "../api";
import { Fuculty } from "../types/models";

const NAMESPACE = 'fuculties'

export const getFuculties = createAsyncThunk<Array<Fuculty>, undefined, AsyncThunkOptions>(
    `${NAMESPACE}/getFuculties`,
    async(_, {rejectWithValue}) =>{
        try{
            return await FucultiesApi().getFuculties();
        }catch(error){
            return rejectWithValue((error as Error).message)
        }
    }
)

export const addFuculties = createAsyncThunk<Array<Fuculty>, AddFucultiesResponseDto, AsyncThunkOptions>(
    `${NAMESPACE}/addFuculties`,
    async(addFucultiesData, {rejectWithValue}) =>{
        try{
            await FucultiesApi().addFuculties(addFucultiesData)
            return await FucultiesApi().getFuculties();
        }catch(error){
            return rejectWithValue((error as Error).message)
        }
    }
)

export const editFuculties = createAsyncThunk<Array<Fuculty>, EditFucultiesResponseDto, AsyncThunkOptions>(
    `${NAMESPACE}/editFuculties`,
    async(editFucultiesData, {rejectWithValue}) =>{
        try{
            await FucultiesApi().editFuculties(editFucultiesData)
            return await FucultiesApi().getFuculties();
        }catch(error){
            return rejectWithValue((error as Error).message)
        }
    }
)

export const deleteFuculties = createAsyncThunk<Array<Fuculty>, string | number, AsyncThunkOptions>(
    `${NAMESPACE}/deleteFuculties`,
    async(id, {rejectWithValue}) =>{
        try{
            await FucultiesApi().deleteFuculties(id)
            return await FucultiesApi().getFuculties();
        }catch(error){
            return rejectWithValue((error as Error).message)
        }
    }
)

export const addVisitors = createAsyncThunk<Array<Fuculty>, AddVisitorResponseDto, AsyncThunkOptions>(
    `${NAMESPACE}/addVisitors`,
    async(addVisitorsData, {rejectWithValue}) =>{
        try{
            await VisitorApi().addVisitor(addVisitorsData)
            return await FucultiesApi().getFuculties();
        }catch(error){
            return rejectWithValue((error as Error).message)
        }
    }
)

export const editVisitors = createAsyncThunk<Array<Fuculty>, UpdateVisitorResponseDto, AsyncThunkOptions>(
    `${NAMESPACE}/editVisitors`,
    async(editVisitorsData, {rejectWithValue}) =>{
        try{
            await VisitorApi().editVisitor(editVisitorsData)
            return await FucultiesApi().getFuculties();
        }catch(error){
            return rejectWithValue((error as Error).message)
        }
    }
)

export const deleteVisitors = createAsyncThunk<Array<Fuculty>, string | number, AsyncThunkOptions>(
    `${NAMESPACE}/deleteVisitors`,
    async(id, {rejectWithValue}) =>{
        try{
            // await VisitorApi().deleteDepart(id)
            await VisitorApi().deleteVisitor(id)
            return await FucultiesApi().getFuculties();
        }catch(error){
            return rejectWithValue((error as Error).message)
        }
    }
)

export const addDepart = createAsyncThunk<Array<Fuculty>, AddDepartResponseDto, AsyncThunkOptions>(
    `${NAMESPACE}/addDepart`,
    async(addDepartData, {rejectWithValue}) =>{
        try{
            await VisitorApi().addDepart(addDepartData)
            return await FucultiesApi().getFuculties();
        }catch(error){
            return rejectWithValue((error as Error).message)
        }
    }
)

export const deleteDepart = createAsyncThunk<Array<Fuculty>, string | number, AsyncThunkOptions>(
    `${NAMESPACE}/deleteDepart`,
    async(id, {rejectWithValue}) =>{
        try{
            await VisitorApi().deleteDepart(id)
            return await FucultiesApi().getFuculties();
        }catch(error){
            return rejectWithValue((error as Error).message)
        }
    }
)

export const uploadFile = createAsyncThunk<Array<Fuculty>, UploadFileResponseDto, AsyncThunkOptions>(
    `${NAMESPACE}/uploadFile`,
    async(uploadFileData, {rejectWithValue}) =>{
        try{
            await FilesApi().uploadFile(uploadFileData)
            return await FucultiesApi().getFuculties();
        }catch(error){
            return rejectWithValue((error as Error).message)
        }
    }
)

export const deleteFile = createAsyncThunk<Array<Fuculty>, string | number, AsyncThunkOptions>(
    `${NAMESPACE}/deleteFile`,
    async(id, {rejectWithValue}) =>{
        try{
            await FilesApi().deleteFile(id)
            return await FucultiesApi().getFuculties();
        }catch(error){
            return rejectWithValue((error as Error).message)
        }
    }
)