import  express from 'express'
import mysql from  'mysql2'
import bodyParser from 'body-parser'
import cors from 'cors'
import jwt from "jsonwebtoken"
import session from 'express-session'

import bcrypt from 'bcryptjs'
import cookieParser from 'cookie-parser'
const app = express()
app.use(session({
  key:'userId',
  secret: 'jwtkey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, expires:60*60*24 }
}));
app.use(cookieParser())

app.use(bodyParser.urlencoded({extented:true}))
app.use(cors({  credentials: true, origin: ["http://localhost:3000"],methods:["GET","POST"]}))
app.use(express.json())

app.use((req, res, next) => {
  req.session.username = req.cookies.username;
  next();
});


const db =mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mansa1234",
    database:"banks",
    port: 3307
})
db.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to MySQL server.');
    
  });

  app.get('/login', (req,res)=>{
    if(req.session.user){
      res.send({loggedIn:true,user:req.session.user})
      console.log('true')
    }else{
      res.send({loggedIn:false})
    }
  })

  // login user
  app.post("/login", (req, res, next) => {
    const { username } = req.body;
    const q = "SELECT * FROM users WHERE username=?";
    db.query(q, [username], async (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.length <= 0) {
        return res.send({ message: "Wrong username or password" });
      }
      const pass = await bcrypt.compare(req.body.password, result[0].password);
      if (!pass) {
        return res.send({ message: "Incorrect password" });
      }
      req.session.user=result
      console.log(req.session.user)
const token = jwt.sign({username}, "jwtkey", {expiresIn: '6hr'});
console.log(token)
const {password, ...other} = result[0];
const jsonOther = JSON.stringify(other);
const cookieValue = JSON.stringify({token: token, });
res.cookie("username", cookieValue, {httpOnly: true, path: '/'});
res.status(200).json(other);
        
        console.log("just to know ",other.username)
      // Pass the username to the next middleware or route
      req.username = username;
      next();
    });
  });
  
  
  // add ecash and cash balances for the day 
  app.post("/balance", async (req, res) => {
  const token = JSON.parse(req.cookies.username).token;

    console.log('token',token)
    try {
      const decoded = jwt.verify(token, "jwtkey");
      const username = decoded.username;
      console.log('after decoding', username);
  
      if (username) {
        const bal_query = "select balance from tbl_cash where username=? and recordDate=curDate();";
        db.query(bal_query, [username], (err, result) => {
          if (result.length > 0) {
            console.log("balance exist");
          }
          if (err) {
            console.log(err);
          }
        });
        const cash_value = req.body.cash;
        const cash_amnt = parseFloat(cash_value);
        console.log(cash_value);
        const generateRandomNum = (min, max) => {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        const trnx_id = generateRandomNum(0, 100);
        console.log(trnx_id);
        // send cash and e_cash data to cash an e_cash table
        const ecash_value = req.body.e_cash;
        const e_amount = parseFloat(ecash_value);
        const e_cashquery =
          "insert into tbl_ecash(trnx_id,username,balance) Values(?,?,?)";
        db.query(
          e_cashquery,
          [trnx_id, username, e_amount],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log("e_cash balance updated!");
              return;
            }
          }
        );
        console.log(trnx_id);
        const cash =
          "insert into tbl_cash(trnx_id,username,balance) Values(?,?,?)";
        db.query(cash, [trnx_id, username, cash_amnt], (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log("cash balance updated!");
            return;
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  });
  


// get balance


app.get("/getBal",async (req,res)=>{
    
  const token = JSON.parse(req.cookies.username).token;

    try {
      const decoded = jwt.verify(token, "jwtkey");
      const username = decoded.username;
      console.log('after decoding', username); 
const bal_query="select balance from tbl_cash where username=? and recordDate=curDate();"
db.query(bal_query,[username],(err,result)=>{
 if(result.length > 0){res.send( {balance:result})
 console.log(result)}
 if(err){console.log(err)}
})
}catch(err){
  console.log(err)
}
})


  //insert record
app.post("/record", async (req,res)=>{
     console.log('currentUSER'+ req.body.user)
 const token = JSON.parse(req.cookies.username).token;

 try {
   const decoded = jwt.verify(token, "jwtkey");
   const username = decoded.username;
   console.log('after decoding', username); 
     if(!username) return res.send({message:" Please login !"})
      console.log('type is ' + req.body.type)
      const rec_amnt= parseFloat( req.body.amount)
     const quer="insert into tbl_momo(username,phone_number,firstName,lastName, Transaction_type,amount) values(?);"
     const values=[username,req.body.number,req.body.firstName,
        req.body.lastName, req.body.selectInput, rec_amnt
                   ]
     console.log('from FE '+ req.body.number)
     console.log('from select '+ req.body.selectInput)

     db.query(quer,[values],(err, result)=>{

        if (err){console.log({status:"Failed! "})}
        else{ console.log('Success ')
    }
              
         }) 
        
        const trnx= req.body.selectInput
        const amount= parseFloat(rec_amnt)
        console.log(rec_amnt)
        db.query("call cash(?,?,?)",[trnx,username,amount], (err, result)=>{


            if (err) {
                console.log(err)
            }else{
                //res.send({data_status:'successful trnx'})
                // status_data='success data'
                
                ;
                } }) 
                }catch(err){
                  console.log(err)
                }
     })
     app.get("/cash/balance", async (req,res)=>{
      const token = JSON.parse(req.cookies.username).token;

 try {
   const decoded = jwt.verify(token, "jwtkey");
   const username = decoded.username;
   console.log('after decoding', username);
          const q= 'select * from tbl_cash where recordDate = curdate() and username=?; '
          db.query(q,[username], async(err,result)=>{
              if(err)return res.send(err)
              if(result.length > 0){ res.send({message:"you have added balance"})}
              else{console.log("add balance for today")}
          }) }catch(err){
            console.log(err)
          }
        })
        
             
        //view cash balance
        app.get(`/cash`,async (req,res)=>{
          const token = JSON.parse(req.cookies.username).token;

 try {
   const decoded = jwt.verify(token, "jwtkey");
   const username = decoded.username;
   console.log('after decoding', username);
    if(!username){
      res.json({success:false,message:'user not logged in'})
    }
           
    
    const qry= 'select balance from tbl_cash where recordDate = curDate() and username =?'
            db.query(qry,[username],async (err,result)=>{
                 
                if(result.length > 0){return res.send(result)}
                else{console.log(result[0].balance) 
                    }
                if (err){console.log(err)}else{console.log("success")};

                })
              }catch(err){
                console.log(err)
              }
})
    
// ecash balance
app.get(`/ecash`,async (req,res)=>{
  const token = JSON.parse(req.cookies.username).token;

  try {
    const decoded = jwt.verify(token, "jwtkey");
    const username = decoded.username;
    console.log('after decoding', username);
const qry= 'select balance from tbl_ecash where username =? and recordDate = curDate() '
    db.query(qry,[username],async (err,result)=>{
        if (err){console.log(err)}else{console.log("success")};
                 
                if(result.length > 0){return res.send(result)}
                else{console.log(result[0].balance) 
                    }
        })

}catch(err){
  console.log(err)
}
})


//seacrh user route
app.get(`/search`, (req,res)=>{
    
       const q="Select * from tbl_momo ;"
    db.query(q, (err,result)=>{
        if (err) {
            console.log(err);
            res.send({message:' Server Error '});
            return;
        }else{ 
            return res.send(result)}
    })

  });
  
    



 // view transaction history
 app.get(`/transaction`, (req,res)=>{
  const token = JSON.parse(req.cookies.username).token;

  try {
    const decoded = jwt.verify(token, "jwtkey");
    const username = decoded.username;
    console.log('after decoding', username);
    if(!username){
      res.send({message:"Login"})
    }
     const query='select * from tbl_momo where username =? and recordDate=curDate();'
   
 db.query(query,[username],(err,result)=>{
  if(err){
    console.log(err)
  }else{
    return res.send(result)
  }
 })
  
    }catch(err){
      console.log(err)
    }
   
    
})




 // create users
 app.post("/register",(req,res)=>{
    const q= "SELECT * FROM users WHERE username=?"
     
 db.query(q,[req.body.username],async (err,data)=>{
    try{
     if(err)return res.json(err)
     if(data.length > 0)
     return res.send({message:'user already exist'})
     // hash the password
     const hash =await bcrypt.hash(req.body.password ,10)
     const quer="insert into users(username,password)values(?);"
     const values=[req.body.username,hash,]
     db.query(quer,[values],(err, result)=>{
         if(err){ console.log(err)
        res.send({message:'server Error'})}
         else{console.log(result)
            res.send("user created")}
      })
     }catch(err){
         console.log(err)
     }
 })    
})
 


 app.post("/logout", (req,res)=>{
    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true
    }).status(200).json("user has been logged out")
  }  )





app.listen(8080,()=>{
    console.log("server running on port 8080...")
})