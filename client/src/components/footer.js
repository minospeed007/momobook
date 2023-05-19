import React from 'react'
import {Link} from 'react-router-dom'
import {Typography} from '@mui/material'
import {FaFacebook,FaTelegram,FaTiktok, FaTwitter} from 'react-icons/fa'
import mtn_logo from '../assets/MTN_logo.png'
import airteltigo from '../assets/airteltigo.png'


const Footer=()=>{
return(<>

<div className='foot-container'>
<div className="footer-main">
    
    
    <div className='momo-footer'> 
    <div className='momo-div'>
    <Typography  component={Link} to='/' variant='h6'  color='inherit'>
               <span className='mo-footer'>Momo</span><span className='book-footer'>book</span>
                </Typography></div>
                </div>
    <div className='foot-link'>
    <Link className='foot' to='/cart'>Cart</Link>
    </div>
    <div className='foot-link'>

    <Link className='foot' to='/record'>Home</Link><br/>
</div>
<div className='mtn-logo'>
<div className='mtn-div'>
<img src={mtn_logo} className='logo-photo' alt=''/>

</div>
<div className='mtn-div'>
<img src={airteltigo} className='airtel-photo' alt=''/></div>

</div>
<div className='flexFoot-icon'>
    <div className='footer-icon'>
        <FaFacebook className='foot-icon'/>
        <FaTelegram className='foot-icon'/>
        <FaTiktok className='foot-icon'/>
        <FaTwitter className='foot-icon'/>
</div>
    </div>
    </div>
    </div>  
</>)
}
export default Footer