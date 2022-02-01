import Head from 'next/head'
import Image from 'next/image'
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import MenuItem from '@mui/material/MenuItem';
import {useState} from "react"

export default function Home() {
const [loginmodal, setloginmodal] = useState("none");
const [registermodal, setregistermodal] = useState("block");
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
     <div className="center width-500-max shadow-bingo form" style={{display:`${registermodal}`}}>
       <div className="padding-20 hr relative">
         <div className="top-10 right-10 absolute">
         <Button variant='outlined'  onClick={Login}>Login</Button>
         </div>
         <div className="h1">Register</div>
       </div>
       <div className="padding-top-30 padding-bottom-30 padding-left-10 padding-right-10">
         <div className="section padding">
           <TextField
           variant="outlined"
           fullWidth
           label="Staff Id"
           />
         </div>
         <div className="section padding">
           <TextField
           variant="outlined"
           fullWidth
           label="Fullname"
           />
         </div>
         <div className="section padding">
         <TextField
          id="outlined-select-currency-native"
          select
          label="ORD"
          SelectProps={{
            native: true,
          }}
          fullWidth
        >
          <option value="ORD">ORD</option>
          <option value="Clinical care">Clinical Care</option>
          <option value="Hass">Hass</option>
          <option value="Public Health">Public Health</option>
        </TextField>
         </div>

         <div className="section padding">
           <Button variant="contained" color='primary' className="capitalized">
             Register
           </Button>
         </div>
       </div>
     </div>
     <div className="center width-500-max shadow-bingo form"  style={{display:`${loginmodal}`}}>
       <div className="padding-20 hr relative">
         <div className="top-10 right-10 absolute">
         <Button variant='outlined'  onClick={Register}>Register</Button>
         </div>
         <div className="h1">Login</div>
       </div>
       <div className="padding-top-30 padding-bottom-30 padding-left-10 padding-right-10">
         <div className="section padding">
           <TextField
           variant="outlined"
           fullWidth
           label="Emaail"
           />
         </div>
         <div className="section padding">
           <TextField
           variant="outlined"
           fullWidth
           label="password"
           type="password"
           />
         </div>
   

         <div className="section padding">
           <Button variant="contained" color='primary' className="capitalized">
             Login
           </Button>
         </div>
       </div>
     </div>
   </section>
  )
}
