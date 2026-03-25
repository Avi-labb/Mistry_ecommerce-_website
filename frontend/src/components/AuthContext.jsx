import { useEffect } from "react"
import { useState } from "react"
import api from "../api/axios"


export const AuthContext=()=>{
    const [user, setuser] = useState(null)
    const [isCheckingAuth, setisCheckingAuth] = useState(true)
    
    useEffect(()=>{
        const checkAuth=async()=>{

        
        try {
            const res=await api.get('/user/details')
            setuser(res.data)
        } catch (error) {
            setuser(null)
        }finally{
            setisCheckingAuth(false)
        }
    }
    checkAuth()
    },[])

}