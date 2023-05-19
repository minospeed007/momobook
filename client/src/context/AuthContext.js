import React, {createContext,useState, useEffect} from 'react'

import axios from 'axios'
export const AuthContext =createContext()

export const AuthContextProvider=({children})=>{
const [currentUser,setCurrentUser]=useState(localStorage.getItem("user")||null)
const [err, setErr] = useState('')
const [balance, setBalance] = useState('')
axios.defaults.withCredentials=true;

const [isError, setIsError] = useState('')
const [adError, setAdError] = useState('')
const [transaction, setTransaction]= useState('')
const [error, setError] = useState({})
const [success,setSuccess] =useState('')
const [recordErr,setRecordErr]= useState('')
const [ok,setOk]=useState('')

    
        const login= async (input)=>{
        
            try{
                const res=  await axios.post("http://localhost:8080/login",input)
        setCurrentUser(res.data)
        setIsError(res?.data?.message)
        console.log(isError)
    
            }catch(err){
                setErr(err)
    
            }
        
        };
        
        const record= async (inputs)=>{
            try{
            const res=  await axios.post("http://localhost:8080/record",inputs)
            setCurrentUser(res.data)
            setRecordErr(res?.data?.message)
            setSuccess(res?.data?.status)

        
            }catch(error){
                console.log(recordErr)
                setError(error) }
            };

            const cash= async ()=>{
                try{
                const res=  await axios.get("http://localhost:8080/cash")
                setBalance(res?.data)
             console.log(res?.data)
                }catch(error){
                    console.log(error)
                     }
                };
                

                
            const handleSubmit = async (inputs) => {
               
                const res= await axios.post("http://localhost:8080/record", inputs)
                  setCurrentUser(res.data)
                  setRecordErr(res?.data?.message)
                  setOk('ok trnx')

              };
    const logout= async (input)=>{
          await axios.post("http://localhost:8080/logout",input)
        setCurrentUser(null)
        };

        useEffect( () => {
           localStorage.setItem("user", currentUser)
        }, [currentUser])
        return( 
        <AuthContext.Provider value={{cash,balance,
        currentUser,transaction,setCurrentUser,setRecordErr,success,
        login,record, logout, adError,recordErr, handleSubmit,ok,
         isError,error,}}>
        {children}
        </AuthContext.Provider>
        )
}