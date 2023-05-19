app.post("/login",(req,res, next)=>{
    const { username } = req.body;
  req.username = username;
  console.log("69"+ username)
const q= "SELECT * FROM users WHERE username=?" 
    
  db.query(q,[ username], async (err,result)=>{
console.log("session user "+ username)
      if(err) return res.send(err)
      if(result.length <= 0) return res.send({message :"wrong username or password "})
      if(result.length === 0)return res.status(404).json('user not found')
      const pass = await bcrypt.compare(req.body.password, result[0].password)
  const user=result[0];


      if(!pass) return  res.status(404).json('incorrect password')

  const token = jwt.sign({id: result[0].id}, "jwtkey")
   const {password, ...other}=result[0]
      res.cookie("access_token",token,{ httpOnly:false }).status(200).json(other)
      console.log('cook ln87'+other.username)
  console.log("ses" + username)
  
   })
   next();

  })