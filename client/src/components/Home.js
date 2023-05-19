import {Link,useLocation} from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Login from './login'
const Home=()=>{
const {currentUser} = useContext(AuthContext)
const user= currentUser?.username
    const location =useLocation()
    return(<>
        <div clasName="links-btn">
        {!currentUser && (
                <Login/>
                
              )}       
               <p>{user}</p>

    <Link to="/transaction">
    <button className="btn">Transaction History</button>
</Link>
<Link to="/record">
      <button className="btn">Add Transaction</button>
</Link>
    
</div>
   


    </>)
}
export default Home;