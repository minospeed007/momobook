import React, {useState,useEffect, useContext} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import {Paper,Input,Button} from '@mui/material'
import axios from 'axios'


const Login=()=>{
const {login,currentUser,isError}= useContext(AuthContext)

const [input, setInput]=useState({username:"", password:"",currentUser:currentUser})
const navigate=useNavigate()



//if( balance?.balance ){ navigate('/record')}




const addForm= async(e)=>{
e.preventDefault()

 await login(input).then((result)=>{
    
 })

 
}


   if(currentUser?.username){navigate('/balance')}

    
//check if user has already added balance for ecash and cash for the day
//{currentUser?.username && balance?.balance && (navigate('/record'))}
//{currentUser?.username && !balance?.balance && (navigate('/balance'))}

const handleChange=(e)=>{
setInput(prev=>({...prev, [e.target.name]: e.target.value}))
}
return(<>
 <div className='register-parent'>
 

    <div  className='register-form'>
    <Paper className='form-div'>

        <form >
        <p className='h-sign'>Sign  In</p>

        <p className='rec-error'>{isError}</p>
        <div className='inp-div'>
        <div>

        <div className='input-div'>

    <br/>
    <Input type='text' placeholder='Enter username'
     onChange={handleChange} name='username' className='input'/>
      </div>
     <Input type='password' placeholder='Enter password' className='input'
 onChange={handleChange} name='password'/>
     </div>
      <div className='input-div'>
      
 
  </div>
    </div>
 <br/>
 <div className='login-div'>
 <Button type='submit'  variant='contained' className='log-btn' onClick={addForm}>
<p className='log-btn-p' >Login</p></Button><br/>

</div>
<div className='sign-up-div'>

<p className='sign-up-p'>Need an account? <Link className='signup-link' to='/'>SignUp</Link></p>
</div>
        </form>
        
      
      
      </Paper> 
    </div>
    </div>
</>)
}
export default Login 
