import Head from 'next/head'
import Image from 'next/image'
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import MenuItem from '@mui/material/MenuItem';
import {useState} from "react"
import * as React from 'react';
import Alert from '@mui/material/Alert';
import Axios from "axios"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Home() {
  const Endpoint = "http://rhdscreen-api.herokuapp.com"
const [loginmodal, setloginmodal] = useState("none");
const [registermodal, setregistermodal] = useState("block");
const [fullname, setfullname] = useState("");
const [unit, setunit] = useState("");
const [staffId, setstaffId] = useState("");
const [message, setmessage] = useState("");
const [error, seterror] = useState("none");
const [modal, setmodal] = useState(false);
const [loader, setloader] = useState("none");
const [email, setemail] = useState("");
const [password, setpassword] = useState("");
const HandleRegister = ()=>{
  seterror("none")
  setloader("block")
  setmessage("")
  if(fullname === "" || unit==="" || staffId ===""){
    seterror("block")
    setmessage("Please make sure to fill all inputs")
  setloader("none")

  }else{
  seterror("none")
  Axios.post(Endpoint + "/staff/register/" , {
    staffId:staffId,
    fullName:fullname,
    bmc:unit
  }).then(()=>{
  setloader("none")
    setmodal(true)
  }).catch(err=>{
  console.log(err)
  setloader("none")
  })
  }
}
const HandleLogin = ()=>{
  seterror("none")
  setloader("block")
  setmessage("")
  if(email === "" || password  ===""){
    seterror("block")
    setmessage("Please make sure to fill all inputs")
  setloader("none")

  }else{
  seterror("none")
  Axios.post(Endpoint + "/login" , {
    email:email,
    password:password,
  }).then((user)=>{
  setloader("none")
  sessionStorage.setItem("data" , JSON.stringify(user.data))
  window.location.assign("/screen")
  }).catch(err=>{
  console.log(err.message)
  if(err.message === "Request failed with status code 422"){
    seterror("block")
    setmessage("Wrong credentials.")
  }
  setloader("none")
  })
  }
}

  const Login = ()=>{
    setloginmodal("block")
    setregistermodal("none")
  }
  const Register = ()=>{
    setloginmodal("none")
    setregistermodal("block")
  }
  return (
   <section className="padding-top-50">
        <Dialog
        open={modal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Account created successfully."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {fullname}, you have successfully created your account, don&#700;t forget to come along with your staff id for 
            the medical screening at the RHD conference hall.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={()=>setmodal(false)}>Close</Button> */}
          <Button onClick={()=>setmodal(false)} autoFocus>
           Ok
          </Button>
        </DialogActions>
      </Dialog>
     <div className="padding-20">
     <div className="center text-center h2 padding-20 openSans">
       RHD STAFF SCREENING
     </div>

     <div className="center width-500-max shadow-bingo form" style={{display:`${registermodal}`}}>
       <div className="padding-20 hr relative">
         <div className="top-10 right-10 absolute">
         <Button variant='outlined'  onClick={Login}>Login</Button>
         </div>
         <div className="h1 openSans">Register</div>
       </div>
       <div className="center text-center padding">
       <img src="/img/ghs.jpg" className="height-100" alt="" />
     </div>
       <div className="padding-bottom-30 padding-left-10 padding-right-10">
         <div className="section padding">
           <TextField
           variant="outlined"
           fullWidth
           label="Staff Id"
           onChange={(e)=>setstaffId(e.target.value)}
           />
         </div>
         <div className="section padding">
           <TextField
           variant="outlined"
           fullWidth
           label="Fullname"
           onChange={(e)=>setfullname(e.target.value)}
           />
         </div>
         <div className="section padding">
         <TextField
          id="outlined-select-currency-native"
          select
          label="Unit"
          SelectProps={{
            native: true,
          }}
          fullWidth
          onChange={(e)=>setunit(e.target.value)}
        >
          <option value=""> </option>
          <option value="ORD">ORD</option>
          <option value="Clinical care">Clinical Care</option>
          <option value="Hass">Hass</option>
          <option value="Public Health">Public Health</option>
        </TextField>
         </div>
         <div style={{display:`${loader}`}}>
         <div className="loaderbox">
          <div className="loadercontainer">
            <span className="loadercircle"></span>
            <span className="loadercircle"></span>
            <span className="loadercircle"></span>
            <span className="loadercircle"></span>
          </div>
        </div>
         </div>
         <div className="section padding">
           <Button variant="contained" color='primary' className="capitalized" onClick={HandleRegister}>
             Register
           </Button>
         </div>
         <div className="section padding"  style={{display:`${error}`}}>
         <Alert severity="error">{message}</Alert>
         </div>
       </div>
     </div>
     <div className="center width-500-max shadow-bingo form"  style={{display:`${loginmodal}`}}>
       <div className="padding-20 hr relative">
         <div className="top-10 right-10 absolute">
         <Button variant='outlined'  onClick={Register}>Register</Button>
         </div>
         <div className="h1 openSans">Login</div>
       </div>
       <div className="center text-center padding">
       <img src="/img/ghs.jpg" className="height-100" alt="" />
     </div>
       <div className="padding-bottom-30 padding-left-10 padding-right-10">
         <div className="section padding">
           <TextField
           variant="outlined"
           fullWidth
           label="Email"
           onChange={(e)=>setemail(e.target.value)}
           />
         </div>
         <div className="section padding">
           <TextField
           variant="outlined"
           fullWidth
           label="password"
           type="password"
           onChange={(e)=>setpassword(e.target.value)}
           />
         </div>
         <div style={{display:`${loader}`}}>
         <div className="loaderbox">
          <div className="loadercontainer">
            <span className="loadercircle"></span>
            <span className="loadercircle"></span>
            <span className="loadercircle"></span>
            <span className="loadercircle"></span>
          </div>
        </div>
         </div>
         <div className="section padding"  style={{display:`${error}`}}>
         <Alert severity="error">{message}</Alert>
         </div>
         <div className="section padding">
           <Button variant="contained" color='primary' className="capitalized" onClick={HandleLogin}>
             Login
           </Button>
         </div>
       </div>
     </div>
     </div>
   </section>
  )
}
