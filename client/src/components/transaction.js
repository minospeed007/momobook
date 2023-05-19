import React, {useState,useEffect, useContext} from 'react'
import { AuthContext } from '../context/AuthContext'
import {Link} from "react-router-dom"
import {Paper} from '@mui/material'
import { BsDatabaseFillExclamation} from 'react-icons/bs';

import axios from 'axios'
import moment from 'moment'
const Transaction=()=>{
const {currentUser}= useContext(AuthContext)

const user=currentUser?.username
console.log(currentUser)
const [transaction, setTransaction]=useState([])
const [showTransaction, setShowTransaction]=useState(false)
const [toggle, setToggle] =useState(false)
    
    const fetchUser= async ()=>{
        try{
            const res= await axios.get("http://localhost:8080/transaction")
            setTransaction(res)
            setShowTransaction(true)
            setToggle(!toggle)
              console.log(res)
           }catch(err){
            console.log(err)
          }
              
      }
  
    console.log(transaction)
return(<>
<div className='trnx-parents' >
{!user ? <div className='no-data-parent'>
<div className='no-data-divs'>
<p className='no-data-p'> No data yet <p></p>

<Link to='/login' className='no-data-link'>
Login</Link>  to view today's transactions</p>



<div className='no-data-icon-div'>
<BsDatabaseFillExclamation className='no-data-icon'/>


</div>
</div>

</div>:(<div>
    <div  className='form'>
  <button type='button' onClick={fetchUser} className='btn-trnx'>
  View Transaction</button>
</div>
<div>
{showTransaction && transaction &&  (
  <section className='flex-paper'>
<div className='trnx-paper'>
<Paper className='flex-table'>
 {toggle &&  <table>
<thead >
        <tr>
          <th className='tableh'>First Name</th>
          <th className='tableh'>Last Name</th>
          <th className='tableh'>Phone Number</th>
          <th className='tableh'>Amount</th>
          <th className='tableh'>Trnx type</th>

         <th className='tableh'>Trnx Date</th>
         <th className='tableh'>Trnx Time</th>



        </tr>
      </thead>
      <tbody>
        {transaction?.data?.map((result)=>(
            <tr  key={result.id}>
            <td className='search_p'>{result.firstName}</td>
            <td className='search_p'>{result.lastName}</td>

            <td className='search_p'>{result.phone_number}</td>
            <td className='search_p'>{result.amount}</td>
            <td className='search_p'>{result.transaction_type}</td>

            <td className='search_p'> 
         {moment(result.RecordDate).format('DD/MM/YYYY ')}
             </td>
            <td className='search_p'>{result.recordTime}</td>

            </tr>
        ))}
    </tbody>
    </table>

 }
    </Paper>
    </div>
    </section>
)}
</div> 
</div>)}

    </div>
</>)
}
export default Transaction 
