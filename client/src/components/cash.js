import React, {useState,useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import Toggle from './toggle'

const Cash=()=>{
const [balance, setBalance]=useState([])
const [ebalance, setEbalance]= useState([])
const [isVisible, setIsVisible]= useState(false)
const [showBal, setShowBal]= useState(false)

const cash_Bal= async ()=>{
    try{
        const res= await axios.get("http://localhost:8080/cash")
        setBalance(res)
        console.log(balance)
      setIsVisible(!isVisible)
         
        
      }catch(err){
        console.log(err)
      }
          
  }
  //get ecash balance
  const ecashBal= async ()=>{
    try{
        const res= await axios.get("http://localhost:8080/ecash")
        setEbalance(res)
setShowBal(!showBal)
        
      }catch(err){
        console.log(err)
      }
          
  }
  //get cash balance
  
  
return(<>
  
    <div className='cash-parent'>
  <Toggle/>
  <div className='cash-bal-parent'>
    <div className='cash-bal'>

   <button type='btn' onClick={ecashBal} className='cash-btn'>Ecash bal</button>
   {ebalance?.data?.map((bal,index)=>(
    <div key={index}>
   {showBal && <p className='cash-p'> {bal.balance}</p>}  
    </div>
   ))} 
 
   
   </div>
    <div className='cash-bal'>

    <button type='btn' onClick={cash_Bal} className='cash-btn'>Cash bal</button>
   {balance?.data?.map((bal,index)=>(
    <div key={index}>
    {isVisible && <p className='cash-p'> {bal.balance}</p>}
    </div>
   ))}
   </div>

</div>
    </div>
</>)
}
export default Cash
