import { AccessTokenKey } from "../constants/CommonConstants"
import { LoginRequeseDto, LoginResponseDto, RegistrationRequestDto } from "../types/apiTypes"
import { AxiosInstance } from "./axiosinstanse"

const {axiosPost} = AxiosInstance() 

const signIn = async (loginData: LoginRequeseDto) => {
    const data = await axiosPost('/Login', loginData) as LoginResponseDto
    sessionStorage.setItem(AccessTokenKey, data.access_token)
    return data
}

const signUp = async (registrationData: RegistrationRequestDto) => 
    await axiosPost('/register', registrationData) as void

export const AuthApi = {
    signIn,
    signUp
}

