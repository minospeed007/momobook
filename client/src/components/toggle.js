import {useState} from 'react'
import { BsCash,BsClockHistory,BsSearch} from 'react-icons/bs';
import {RiLogoutCircleRLine} from 'react-icons/ri'
import {AiOutlineMenu} from 'react-icons/ai'
import {GrClose} from 'react-icons/gr'
import {Link, useNavigate} from 'react-router-dom'

const Toggle=()=>{
const navigate= useNavigate()
const [isOpen, setIsOpen]=useState(false)
const mobileToggle=()=>{
    setIsOpen(!isOpen)
}

const logout=()=>{
    localStorage.clear();
   navigate("/login")
  window.location.reload()
   }  
    return(<>
<div className='menu-app'>
<div onClick={mobileToggle} className='toggle-'><AiOutlineMenu className='open' /></div>

{isOpen && (
<div className='sidebar'>
<div className='close-toggle'>
<div onClick={mobileToggle} className='close-div'><GrClose className='close'/></div>
</div>
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
</div>)}
</div>
    </>)
}

export default Toggle