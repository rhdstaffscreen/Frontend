import Head from 'next/head'
import Image from 'next/image'
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import MenuItem from '@mui/material/MenuItem';
import {useEffect, useState} from "react"
import Online from '../Components/Online';
import Axios from "axios"
import * as React from 'react';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
const Screen = () => {
    const [data, setdata] = useState([]);
    const [email, setemail] = useState(" ");
    const [staff, setstaff] = useState([]);
    const [eyecaremodal, seteyecaremodal] = useState(false);
    const [role, setrole] = useState("");
    const [supermodal, setsupermodal] = useState(false);
    const [snackbar, setsnackbar] = useState(false);
    const [Bpmmodal, setBpmmodal] = useState(false);
    const [bloodmodal, setbloodmodal] = useState(false);
    const [snackmessage, setsnackmessage] = useState("");
    const [loading, setloading] = useState("block");

const [righteye, setrighteye] = useState("");
const [lefteye, setlefteye] = useState("");

const [bp, setbp] = useState("");
const [hr, sethr] = useState("");
const [weight, setweight] = useState("");
const [height, setheight] = useState("");

const [fbsrbs, setfbsrbs] = useState("");
const [ hepb, sethepb] = useState("");
const [ hepc, sethepc] = useState("");
    const Endpoint = "http://rhdscreen-api.herokuapp.com"
useEffect(() => {
if(sessionStorage.getItem("data") != undefined){
    const user = JSON.parse(sessionStorage.getItem("data"))
    setdata(user)
    setemail(user.login.email)
    setrole(user.login.role)
    
    }
},[]);
useEffect(() => {
Axios.get(Endpoint + "/staff/showall" ,  {
    headers: {
       authorization: `Bearer ${data.token}`,
     
    }
 }  
).then((data)=>{
    setstaff(data.data.staff)
    setloading("none")
}).catch(err=>{
    console.log(err)
    setloading("none")
})
});

const [Edituser, setEdituser] = useState([]);
const HandleEdit = (current)=>{
  setEdituser(current)
if(role === "super"){
    setsupermodal(true)
}else if(role === "eyecare"){
  seteyecaremodal(true)
}else if(role =="bpandbmi"){
setBpmmodal(true)
}else if(role === "blood"){
setbloodmodal(true)
}
}


const HandleEyeCare = ()=>{
if(role === "eyecare" || role === "super"){
  setloading("block")
if(righteye == "" || lefteye === ""){
setsnackbar(true)
setsnackmessage("make sure to enter inputs")
}else{
  Axios
  .patch(Endpoint + "/staff/eyecare/" + Edituser._id , {
    righteye:righteye,
    lefteye:lefteye
  },
  {
    headers: {
       authorization: `Bearer ${data.token}`,
     
    }
 }  
  ).then(()=>{
    setsnackbar(true)
    setsnackmessage("Updated successfully")
    seteyecaremodal(false)
  }).catch(err=>{
    console.log(err)
    seteyecaremodal(false)
    setsnackbar(true)
    setsnackmessage(err.message)
  })
}
}else{
  setsnackbar(true)
  setsnackmessage("Unauthorized access")
}
}
const HandleBpm = ()=>{
  if(role === "bpandbmi" || role ==="super"){
  setloading("block")
if(bp == "" && weight === "" && hr && height === ""){
setsnackbar(true)
setsnackmessage("make sure to enter inputs")
setloading("none")

}else{
  Axios
  .patch(Endpoint + "/staff/bpandbmi/" + Edituser._id , {
    bp:bp,
    hr:hr,
    weight:weight,
    height:height
  },
  {
    headers: {
       authorization: `Bearer ${data.token}`,
     
    }
 }  
  ).then(()=>{
    setsnackbar(true)
    setsnackmessage("Updated successfully")
    setBpmmodal(false)
setloading("none")

  }).catch(err=>{
    setsnackbar(true)
    setsnackmessage(err.message)
setloading("none")

  })
}
}else{
  setsnackbar(true)
  setsnackmessage("Unauthorized access")
}
}
const HandleBlood = ()=>{
  setloading("block")
  if(role === "blood" || role === "super"){
if(fbsrbs === "" && hepb === "" && hepc === ""){
setsnackbar(true)
setsnackmessage("make sure to enter inputs")
}else{
  Axios
  .patch(Endpoint + "/staff/blood/" + Edituser._id , {
    fbsrbs:fbsrbs,
    hepb:hepb,
    hepc:hepc
  },
  {
    headers: {
       authorization: `Bearer ${data.token}`,
     
    }
 }  
  ).then(()=>{
    setsnackbar(true)
    setsnackmessage("Updated successfully")
    setbloodmodal(false)
    setloading("none")
  }).catch(err=>{
    console.log(err)
    setloading("none")
    setsnackbar(true)
    setsnackmessage(err.message)
    
  })
}
}else{
  setsnackbar(true)
setsnackmessage("Unautorized access")
setloading("none")

}
}

const EyeOpen = ()=>{
  setsupermodal(false)
  seteyecaremodal(true)
  setBpmmodal(false)
  setbloodmodal(false)
}
const BloodOpen = ()=>{
  setsupermodal(false)
  seteyecaremodal(false)
  setBpmmodal(false)
  setbloodmodal(true)
}
const BpmOpen = ()=>{
  setsupermodal(false)
  seteyecaremodal(false)
  setBpmmodal(true)
  setbloodmodal(false)
}
const action = (
  <React.Fragment>
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={()=>setsnackbar(false)}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  </React.Fragment>
);
    return ( 
        <section>
   <Snackbar
        open={snackbar}
        autoHideDuration={6000}
        message={snackmessage}
        action={action}
      />
            <Online />
            {
                data != [] &&
                
        <div>
            <div className='openSans h4 container padding-top-40 padding-bottom-40'>
                Welcome {email}
                <div className="section opacity-4">
                  {role}
                </div>
            </div>
        </div>
            }

            <div className="container">
            <table className="table stripped text-small">
                <th>Staff Id</th>
                <th>Fullname</th>
                <th>Bmc</th>
                <th>Action</th>
                <tbody>
                
                  {
                      staff.map(user=>(
                        <tr key={user._id}>
                        <td>
                            {user.staffId}
                        </td>
                        <td>
                            {user.fullName}
                        </td>
                        <td>
                            {user.bmc}
                        </td>
                        <td>
                            <Button variant="outlined" onClick={()=>HandleEdit(user)}>
                                Edit
                            </Button>
                        </td>
                        </tr>
                      ))
                  }
                </tbody>
            </table>
    
            </div>
            <Dialog
        open={eyecaremodal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Eye Care."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <div className="editmodal" >
                <div className="form center">
                <div className="section padding">
                    {Edituser.fullName}
                  </div>
                    {
                      Edituser != [] &&
                      <div className="section padding">
                      <TextField
                      variant="outlined"
                      fullWidth
                      label="Id"
                      defaultValue={Edituser._id}
                      disabled
                      />
                  </div>

                  }
                    
            
                    <div className="section padding">
                        <TextField
                        variant="outlined"
                        fullWidth
                        label="Right Eye"
                        onChange={(e)=>setrighteye(e.target.value)}
                        />
                    </div>
                    <div className="section padding">
                        <TextField
                        variant="outlined"
                        fullWidth
                        label="Left Eye"
                        onChange={(e)=>setlefteye(e.target.value)}
                        />
                    </div>
                    <div>
                    <center style={{display:`${loading}`}}>
                            <div className="loaderbox">
                         <div className="loadercontainer">
                           <span className="loadercircle"></span>
                           <span className="loadercircle"></span>
                           <span className="loadercircle"></span>
                           <span className="loadercircle"></span>
                         </div>
                       </div>
                       </center>
                    </div>
                    <div className="section padding">
                    <Button variant="contained" color='primary' className="capitalized" onClick={HandleEyeCare}>
                        Submit
                    </Button>
                    </div>
                </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={()=>setmodal(false)}>Close</Button> */}
          <Button onClick={()=>seteyecaremodal(false)} color="error" autoFocus>
           Cancel
          </Button>
        </DialogActions>
      </Dialog>

            <Dialog
        open={Bpmmodal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"BPANDBMI."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <div className="editmodal" >
                <div className="form center">
                <div className="section padding">
                    {Edituser.fullName}
                  </div>
                    {
                      Edituser != [] &&
                      <div className="section padding">
                      <TextField
                      variant="outlined"
                      fullWidth
                      label="Id"
                      defaultValue={Edituser._id}
                      disabled
                      />
                  </div>
                    }
                    <div className="section padding">
                        <TextField
                        variant="outlined"
                        fullWidth
                        label="Bp"
                        onChange={(e)=>setbp(e.target.value)}
                        />
                    </div>
                    <div className="section padding">
                        <TextField
                        variant="outlined"
                        fullWidth
                        label="Hr"
                        onChange={(e)=>sethr(e.target.value)}
                        />
                    </div>
                    <div className="section padding">
                        <TextField
                        variant="outlined"
                        fullWidth
                        label="Hr"
                        onChange={(e)=>setweight(e.target.value)}
                        />
                    </div>
                    <div className="section padding">
                        <TextField
                        variant="outlined"
                        fullWidth
                        label="Hr"
                        onChange={(e)=>setheight(e.target.value)}
                        />
                    </div>
                    <div>
                    <center style={{display:`${loading}`}}>
                            <div className="loaderbox">
                         <div className="loadercontainer">
                           <span className="loadercircle"></span>
                           <span className="loadercircle"></span>
                           <span className="loadercircle"></span>
                           <span className="loadercircle"></span>
                         </div>
                       </div>
                       </center>
                    </div>
                    <div className="section padding">
                    <Button variant="contained" color='primary' className="capitalized" onClick={HandleBpm}>
                        Submit
                    </Button>
                    </div>
                </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={()=>setmodal(false)}>Close</Button> */}
          <Button onClick={()=>setBpmmodal(false)} color="error" autoFocus>
           Cancel
          </Button>
        </DialogActions>
      </Dialog>


            <Dialog
        open={bloodmodal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Blood"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <div className="editmodal" >
                <div className="form center">
                <div className="section padding">
                    {Edituser.fullName}
                  </div>
                    
                    {
                      Edituser != [] &&
                      <div className="section padding">
                      <TextField
                      variant="outlined"
                      fullWidth
                      label="Id"
                      defaultValue={Edituser._id}
                      disabled
                      />
                  </div>
                    }
                    <div className="section padding">
                        <TextField
                        variant="outlined"
                        fullWidth
                        label="fbsrbs"
                        onChange={(e)=>setfbsrbs(e.target.value)}
                        />
                    </div>
                    <div className="section padding">
                        <TextField
                        variant="outlined"
                        fullWidth
                        label="HepB"
                        onChange={(e)=>sethepb(e.target.value)}
                        />
                    </div>
                    <div className="section padding">
                        <TextField
                        variant="outlined"
                        fullWidth
                        label="HepB"
                        onChange={(e)=>sethepc(e.target.value)}
                        />
                    </div>
                    <div>
                    <center style={{display:`${loading}`}}>
                            <div className="loaderbox">
                         <div className="loadercontainer">
                           <span className="loadercircle"></span>
                           <span className="loadercircle"></span>
                           <span className="loadercircle"></span>
                           <span className="loadercircle"></span>
                         </div>
                       </div>
                       </center>
                    </div>
                    <div className="section padding">
                    <Button variant="contained" color='primary' className="capitalized" onClick={HandleBlood}>
                        Submit
                    </Button>
                    </div>
                </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={()=>setmodal(false)}>Close</Button> */}
          <Button onClick={()=>setbloodmodal(false)} color="error" autoFocus>
           Cancel
          </Button>
        </DialogActions>
      </Dialog>




            <Dialog
        open={supermodal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="width-300-min"
      >
        <DialogTitle id="alert-dialog-title">
          <div>
            Super
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <div className="">
            <div className="section">
            <Button fullWidth variant="contained" onClick={EyeOpen}>Eye Care</Button>
            </div>
            <div className="section">
            <Button fullWidth variant="contained" onClick={BloodOpen}>Blood</Button>
            </div>
            <div className="section">
            <Button fullWidth variant="contained" onClick={BpmOpen}>BPANDBMI</Button>
            </div>
          </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={()=>setmodal(false)}>Close</Button> */}
          <Button onClick={()=>setsupermodal(false)} color="error" autoFocus>
           Cancel
          </Button>
        </DialogActions>
      </Dialog>
        
        </section>
     );
}
 
export default Screen;