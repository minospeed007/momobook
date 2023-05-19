import {BrowserRouter as Router,Link, Routes, Route,useLocation} from  'react-router-dom'
import {Transaction,Balance, Record,Home,Footer,Login,Cash,Search,Register,Navbar} from './components'
import { AuthContext } from '../src/context/AuthContext'

import './App.css'
const App=() =>{

  return (<>
    <div className='parent-app'>
    <Navbar/>
<div>
    <div className='parent'>
    <Routes>
    <Route path='/transaction' element={<Transaction/>}/>
    <Route path='/' element={<Register/>}/>
    <Route path='/balance' element={<Balance/>}/>

    <Route path='/search' element={<Search/>}/>

    <Route path='/cash/update' element={<Cash/>}/>

    <Route path='/transaction' element={<Transaction/>}/>
    <Route path='/record' element={<Record />}/>
    <Route path='/login' element={<Login/>}/>



 </Routes>
 
 
 </div>
 <Footer/>
</div>

   </div>
   

  </>);
}

export default App;
