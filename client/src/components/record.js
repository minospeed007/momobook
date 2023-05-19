import React, {useState, useContext} from 'react'
import profile from '../assets/momo_pic.avif'
import { BsCash,BsClockHistory,BsSearch} from 'react-icons/bs';
import {RiLogoutCircleRLine} from 'react-icons/ri'
import axios from 'axios'
//import Select from 'react-select'
import {Input,Paper,Button} from '@mui/material'
import { AuthContext } from '../context/AuthContext'
import {Link, useNavigate,useLocation} from 'react-router-dom'
import {Select,FormControl,MenuItem,InputLabel} from '@mui/material'
import Cash from './cash'

const Record=()=>{
  const {currentUser} = useContext(AuthContext)
  const options = [
    { value: 'Send', label: 'Send' },
    { value: 'Deposit', label: 'Deposit' },
    { value: 'Withdrawal', label: 'Withdrawal' },
  ];
  const user=currentUser?.username
  const [number,setNumber]=useState('')
  const [lastName,setLastName]=useState('')
  const [firstName,setFirstName]=useState('')
  const [amount,setAmount]= useState('')
const location=useLocation();


const [recordErr,setRecordErr]=useState('')
  const [balance,setBalance]=useState([])
  const [selectInput,setSelectInput]=useState('Select Type')
    

 const navigate=useNavigate()

  const {cash, ok,setCurrentUser,set}= useContext(AuthContext)
  const handleSubmit = async ({selectInput,input}) => {
               
    

  };
  const handleSelect=(e)=>{
    setSelectInput(e.target.value)
    console.log(amount)
  }
console.log(selectInput)
const addForm= async (e)=>{
e.preventDefault()
setSelectInput('select type')
setAmount('')
setFirstName('')
setNumber('')
setLastName('')

const res= await axios.post("http://localhost:8080/record", {user,number,firstName,lastName,amount,selectInput})
      setCurrentUser(res.data)
      setRecordErr(res?.data?.message)
.then((response)=> {
  console.log("success")
  console.log(ok)

})
.catch(function (error) {
  console.error(error);
});


    }
    const logout=()=>{
      localStorage.clear();
     navigate("/login")
    window.location.reload()
     }   


console.log(balance)

return(<>
<div className='rec-parent'>

<div className='rec-paren'>

<div className='rec-paper'>
  <img src={profile} className='rec-photo' alt=''/>
<div className='rec-papers'>
<div className='rec-divs'><hr/>
 <div className='flex-icon'>
 <BsCash className='rec-icon' /><p className='rec-p'>View Balance</p>
 </div>
   <hr/>
  <Link to='/transaction' className='rec-link'> 
  <div className='flex-icon'>
 <BsClockHistory className='rec-icon' /><p className='rec-p'>Transaction History</p>
 </div>
  </Link><hr/>
 <Link to='/search' className='rec-link'>
 <div className='flex-icon'>
 <BsSearch className='rec-icon' /><p className='rec-p'>Search Transaction</p>
 </div>
  </Link><hr/>
  <div className='flex-icon'>
 <RiLogoutCircleRLine className='rec-icon' /><p className='rec-p' onClick={logout}>logout</p>
 </div>
  </div>
</div>
</div>
</div>

<div  className='record'>

<div className='toggle-container'>
<div className='cashToggle'>

</div>

</div>

<div className='rec-form-parent'>
<Cash/>
<p className='rec-error'>{recordErr}</p>
<section className='rec-form-paper'>

    <form onSubmit={addForm}>
    
    <div className='btn-divs'>
    
    
     
        <Paper className='inputs-form'>
        
       <div> 
       
<InputLabel style={{ fontSize: '12px' }}>Select transaction</InputLabel>
       <FormControl>
    <Select value={selectInput} onChange={handleSelect}  name='selectInput' className='select' >
    {options.map((option)=>(
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
 

    </Select>
</FormControl>
    <br/>
    
        
    <Input type='number' value={number}  placeholder='Enter number'
     onChange={(e)=>setNumber(e.target.value)} name='number' className='login-input'/><br/>
      <Input type='number' value={amount}  placeholder='Enter amount'
     onChange={(e)=>setAmount(e.target.value)} name='amount' className='login-input'/>
      <br/>
     <Input type='text' value={firstName}  placeholder='Enter first Name'
     onChange={(e)=>setFirstName(e.target.value)} name='firstName' className='login-input'/> <br/>

     <Input type='text' value={lastName}  placeholder='Enter Last Name'
     onChange={(e)=>setLastName(e.target.value)} name='lastName' className='login-input'/> <br/>
 <div className='submit-div'>
 <Button type='submit' variant='outlined' className='login-btn'   >
Submit</Button></div>

</div>
</Paper>
</div>
        </form>
        </section>
        </div>
        <div>
     
      
      </div> 
      
    </div>
    </div>
</>)
}
export default Record 
