import React, {useState, useContext,useEffect} from 'react'
import axios from "axios"
import Cookies from 'js-cookie'
import { AuthContext } from '../context/AuthContext'
import {Link, useLocation} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {Paper,Input,Button} from '@mui/material'


const Balance=()=>{
  const [bal,setBal]=useState([])
  const {currentUser} = useContext(AuthContext)
  Cookies.set('username', {user:currentUser?.username});

  const {recordErr} = useContext(AuthContext)
  const user=currentUser?.username
  const [input, setInput]=useState({ e_cash:"", cash:"" })
 const navigate=useNavigate()
  const location =useLocation() 
axios.defaults.withCredentials=true
  useEffect(()=>{
    axios.get("http://localhost:8080/login").then((response)=>{
        console.log(response)
    })
},[])
 
  const checkBal= async ()=>{
    try{
    const res=  await axios.get("http://localhost:8080/getBal", { withCredentials: true })
    setBal(res?.data)
 console.log(res?.data)
    }catch(error){
        console.log(error)
         }
    };
    const addBal= async(e)=>{
      e.preventDefault()
      navigate('/record')
    const res = await axios.post("http://localhost:8080/balance",input,{ withCredentials: true })
      console.log(res)
     
    }
    useEffect(()=>{
      checkBal()
      console.log(bal)
    },[])
    if(bal.balance){navigate('/record')}

const handleChange=(e)=>{
setInput(prev=>({...prev, [e.target.name]: e.target.value}))
}

return(<>
    <div  className='bal-containter'>
    <div>
          <div className='log-in'> 
            {!user && (<div className="login-record">
      <Link   to="/login" className='log-btns'>
      <div className='div-loge'>
      <Button type='submit'  variant='outlined' style={{boderColor:'black'}} >
      Login</Button>
      </div>

      </Link>
    </div>) }
    </div>

    {!user ? <p className="record-error">{recordErr}</p>:null}
<Paper className='bal-form'>
    <form >
    
 <div className='inp-divf'>
 <div className='input-divBal'>

    <Input type='number' value={input.e_cash} placeholder='Enter E-Cash for today'
     onChange={handleChange} name='e_cash' className='bal-input'/>
     </div>
     <div className='input-divBal'>

     <Input type='number' value={input.cash}  placeholder='Enter Cash for today'
     onChange={handleChange} name='cash' className='input'/></div>
      <div className='btn-div'>

     <Button type='submit' variant='contained' color='primary' onClick={addBal}  className='balbtn'>
      Submit</Button></div>
     </div>
     </form>
     </Paper>
     </div>
     </div>
</>)
}
export default Balance 
