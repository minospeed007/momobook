import React,{useState,useContext} from'react'
import { AppBar,Toolbar, Typography, Button } from '@mui/material'
import { AuthContext } from '../context/AuthContext'
import Toggle from './toggle'
import {Link,useLocation,useNavigate} from 'react-router-dom'
import {BiHomeCircle } from "react-icons/bi";


const Navbar=()=>{
const {currentUser}= useContext(AuthContext)
console.log(currentUser)
const navigate=useNavigate()

const user= currentUser?.username 
const location =useLocation();

        

    return(
        <>
        <AppBar color='inherit'>
          <Toolbar className='nav' >
          
         <Typography className='momo' component={Link} to='/' variant='h6'  color='inherit'>
               <span className='mo'>Momo</span><span className='moBook'>book</span>
                </Typography>
                {location.pathname==='/transaction' && (
                  <div className='home-div'>
                  <Link to='/record' className='home-link'><BiHomeCircle className='home'/></Link>
                 
</div> )}
{location.pathname==='/search' && (
                  <div className='home-div'>
                  <Link to='/record' className='home-link'><BiHomeCircle className='home'/></Link>
                 
</div> )}


                {location.pathname==='/record' && (
                  <div className='login'>
                  
                  <div className='loginr1'>
              <div className='log-rec'> 
{currentUser && ( <p  className='p-log'>
 {currentUser?.username} 

</p> )}

{!user && ( <div className="rec-record">
      <Link  className='records-p' to="/login">
  <Button type='btn'variant='outlined'style={{ borderColor: 'black' }} className="record-btn" >
 <p className='pLogin'> Login</p></Button>
      </Link>
      

    </div>)}
</div>             {!currentUser && (
                <Link to='/register' className='login-title'>
                <p className='login-title'>Register</p>
                 </Link>
              )}
            
              </div>
             
              </div>
                )}
               
               
                
            </Toolbar>
            

        </AppBar>

        </>
    )

}

export default Navbar