import React, {useState,useEffect,useContext} from 'react'
import axios from 'axios'
import moment from 'moment'
import {Link} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import {Input,Paper} from '@mui/material'

const  Search=()=>{
const {currentUser}= useContext(AuthContext)
const [searchTerm, setSearchTerm]= useState('')
const user=currentUser;
const [results,setResults] =useState([])
const [err,setErr]=useState('')
const handleSearch=(e)=>{
    setSearchTerm(e.target.value);
}
const searchUser= async ()=>{
    try{
   const res= await axios.get(`http://localhost:8080/search`)
        setResults(res)
      setErr(res.data?.message)
      
          console.log(err)
      
        
      }catch(err){
        console.log(err)
      }}
      useEffect(()=>{
        searchUser()
      },[])
      console.log(results)
      const filteredResult = results?.data?.filter((item) =>
    item?.firstName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );
  

return (
    <div className='search-parents'>
    <div>
    <div className='head'>
    <Input type='text' className='input'  placeholder='Search for trnx...'
     onChange={handleSearch}/>
</div>
{searchTerm && ( 
<Paper className='search-table'>
{user?.username && results && (<table>
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
        {filteredResult?.map((result)=>(
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
    </table>) }
    {!user?.username && (<div className='no-data-search'> 
    <div className='nodata'><p className='search-p'> 
    <Link to='/login'>
      Login 
    </Link> to search transaction</p></div> 
    </div>)}
    </Paper>)}
    </div>
    </div>
)
}
export default Search