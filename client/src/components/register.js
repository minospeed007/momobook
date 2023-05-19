import React, {useState} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import axios from 'axios'
import {Paper,Input,Button} from '@mui/material'

import Login from './login'
const Register=()=>{
    const [registerError, setRegisterError]=useState('');
const [user, setUser]=useState({
    username:"",

    password:"",
})
const navigate=useNavigate()

const addForm= async(e)=>{
e.preventDefault()
const res = await axios.post("http://localhost:8080/register",user)
setRegisterError(res?.data?.message)
if (res?.data?.message) {
    console.log('user error')
}else{navigate('/login')}
console.log(res)


}


const handleChange=(e)=>{
setUser(prev=>({...prev, [e.target.name]: e.target.value}))
console.log(user)
}
return(<>
        
 <div className='register-parent'>
 
<div className='register-form'>
    <Paper className='form-div' >
        <form  >
<p className='h-sign'>SignUp</p>
{registerError && <p className='error'>{registerError}</p>}

<div className='input-div'>

 <Input type='text' placeholder='Enter Username' className='input'
     onChange={handleChange} name='username'/> 

     </div>
 
    
    <div className='input-div'>      
 <Input type='password' placeholder='Enter Password'  className='input'
 onChange={handleChange} name='password'/>
 </div>

 <div className='btn-div'>
<Button type='submit' variant='contained' onClick={addForm} className='log-btn'>
Sign up </Button>
</div>
<div className='regis-div'>
<p className='sign-up-p'>Already have an account?  <Link to='/login' className='p-login'>Login</Link></p>
</div>

   </form>
    </Paper>
    </div>
</div>
          


</>)
}
export default Register 
