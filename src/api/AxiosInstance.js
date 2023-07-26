import axios from "axios"

export const AxiosUser = axios.create({
    baseURL: 'http://localhost:4000/',
})

export const AxiosAdmin=axios.create({
    baseURL:'http://localhost:4000/admin/'
})

export const AxiosPartner=axios.create({
    baseURL:'http://localhost:4000/partner/'
})