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
import { PureComponent } from 'react';
const Screen = () => {
  const chartdata = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];

  const Endpoint = "http://rhdscreen-api.herokuapp.com"
    const [data, setdata] = useState([]);
    const [email, setemail] = useState(" ");
    const [staff, setstaff] = useState([]);
    const [eyecaremodal, seteyecaremodal] = useState(false);
    const [role, setrole] = useState("");
    const [supermodal, setsupermodal] = useState(false);
    const [snackbar, setsnackbar] = useState(false);
    const [Bpmmodal, setBpmmodal] = useState(false);
    const [bloodmodal, setbloodmodal] = useState(false);
    const [remarksmodal, setremarksmodal] = useState(false);
    const [search, setsearch] = useState("");
    const [snackmessage, setsnackmessage] = useState("");
    const [loading, setloading] = useState("block");
    const [nullshow, setnullshow] = useState("none");
    const [showsuper, setshowsuper] = useState("none");

const [righteye, setrighteye] = useState("");
const [lefteye, setlefteye] = useState("");

const [bp, setbp] = useState("");
const [hr, sethr] = useState("");
const [weight, setweight] = useState("");
const [height, setheight] = useState("");

const [fbsrbs, setfbsrbs] = useState("");
const [ hepb, sethepb] = useState("");
const [ hepc, sethepc] = useState("");

const [remarks, setremarks] = useState("");


const [display, setdisplay] = useState([]);
const [displaylefteye,  setdisplaylefteye] = useState("");
const [displayrighteye, setdisplayrighteye] = useState("");
const [displayhepb, setdisplayhepb] = useState("");
const [displayhepc, setdisplayhepc] = useState("");
const [displayheight, setdisplayheight] = useState("");
const [displayweight, setdisplayweight] = useState("");
const [displayhr, setdisplayhr] = useState("");
const [displaybp, setdisplaybp] = useState("");
const [displayfbsrbs, setdisplayfbsrbs] = useState("");
const [displayremarks, setdisplayremarks] = useState("");

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
).then((userdata)=>{
    setstaff(userdata.data.staff)
    setloading("none")
    if(role === "super"){
      setshowsuper("block")
    }
}).catch(err=>{
    console.log(err)
    setloading("none")
})
});

const [Edituser, setEdituser] = useState([]);
const [update, setupdate] = useState(false);
const HandleEdit = (currentuser)=>{
  setdisplayhepb("")
    setdisplayhepc("")
    setdisplaylefteye("")
    setdisplayrighteye("")
    setdisplayhr("")
    setdisplaybp("")
    setdisplayheight("")
    setdisplayweight("")
    setdisplayfbsrbs("")
    setdisplayremarks("")
  const p = new Promise((resolve,reject)=>{
    if(update===false){
      resolve(currentuser)
    }else if(update === true){
      setupdate(false)
      resolve(currentuser)
    }
  })

  p.then(selectuser=>{
    setEdituser(selectuser)
    console.log(selectuser)
     setupdate(true)
     if(selectuser.blood != []){
      selectuser.blood.map(blood=>{
        setdisplayhepb(blood.hepb)
        setdisplayhepc(blood.hepc)
        setdisplayfbsrbs(blood.fbsrbs)
    })
     }
     if(selectuser.eyescreen != []){
selectuser.eyescreen.map(eye=>{
  setdisplaylefteye(eye.lefteye)
  setdisplayrighteye(eye.righteye)
})
     }
if(selectuser.bpandbmi != []){
selectuser.bpandbmi.map(bpm=>{
  setdisplayhr(bpm.hr)
  setdisplaybp(bpm.bp)
  setdisplayheight(bpm.height)
  setdisplayweight(bpm.weight)
})
}

setdisplayremarks(selectuser.remarks)

  })

if(role === "super"){
    setsupermodal(true)
}else if(role === "eyecare"){
  seteyecaremodal(true)
}else if(role =="bpandbmi"){
setBpmmodal(true)
}else if(role === "blood"){
setbloodmodal(true)
}else if(role === "remarks"){
  setremarksmodal(true)
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

const HandleRemarks = ()=>{
  setloading("block")
  if(role === "remarks" || role === "super"){
if(remarks === ""){
setsnackbar(true)
setsnackmessage("make sure to enter inputs")
}else{
  Axios
  .patch(Endpoint + "/staff/remarks/" + Edituser._id , {
    remarks:remarks
  },
  {
    headers: {
       authorization: `Bearer ${data.token}`,
     
    }
 }  
  ).then(()=>{
    setsnackbar(true)
    setsnackmessage("Updated successfully")
    setremarksmodal(false)
    setloading("none")
  }).catch(err=>{
    console.log(err)
    setloading("none")
    setsnackbar(true)
    setsnackmessage(err.message)
    setloading("none")

    
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
  setremarksmodal(false)
}
const BloodOpen = ()=>{
  setsupermodal(false)
  seteyecaremodal(false)
  setBpmmodal(false)
  setbloodmodal(true)
  setremarksmodal(false)
}
const BpmOpen = ()=>{
  setsupermodal(false)
  seteyecaremodal(false)
  setBpmmodal(true)
  setbloodmodal(false)
  setremarksmodal(false)
}
const RemarksOpen = ()=>{
  setsupermodal(false)
  seteyecaremodal(false)
  setBpmmodal(false)
  setbloodmodal(false)
  setremarksmodal(true)
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
            <div>
    
            </div>
        </div>

            }

        <div className="section container">
                  <TextField
                  label="Search with id"
                  variant="outlined"
                  onChange={(e)=>setsearch(e.target.value)}
                  />
        </div>

            <div className="container horizontal-scroll">
            <table className="table stripped text-small">
                <th>Staff Id</th>
                <th>
                  <div style={{display:`${showsuper}`}}>
                  Fullname
                  </div>
                </th>
                <th>Bmc</th>
                <th>Action</th>
                <th>Print</th>
                <tbody>
                
                  {
                      staff.filter(staffdata=>{
                        if(search === ""){
                          return staff
                        }else if(search.toString().includes(staffdata.staffId.toString())){
                          return staffdata
                        }
                      }).map(user=>(
                        <tr key={user._id}>
                        <td>
                            {user.staffId}
                        </td>
                        <td>
                           <div style={{display:`${showsuper}`}}>
                           {user.fullName}
                           </div>
                        </td>
                        <td>
                            {user.bmc}
                        </td>
                        <td>
                            <Button variant="outlined" onClick={()=>HandleEdit(user)}>
                                Edit
                            </Button>
                        </td>
                        <td>
                            <Button variant="outlined" onClick={()=>window.location.assign(`/remarks/${user._id}`)}>
                                Print
                            </Button>
                        </td>
                        </tr>
                      ))
                  }
                </tbody>
            </table>
    <center style={{display:`${nullshow}`}}>
      Nothing to show
    </center>
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
            
                    {
                      update === true &&
                      <div className="section padding">
                      <TextField
                      variant="outlined"
                      fullWidth
                      label="Id"
                      defaultValue={Edituser.staffId}
                      disabled
                      />
                  </div>

                  }
                  {update === true &&
                  <div>
                      <div className="section padding">
                    
        
                         <TextField
                              id="outlined-select-currency-native"
                              select
                              label="Right Eye"
                              SelectProps={{
                                native: true,
                              }}
                              fullWidth
                              defaultValue={displayrighteye}
                              onChange={(e)=>setrighteye(e.target.value)}
                            >
                              <option value=""> </option>
                              <option value="6/12">6/12</option>
                              <option value="6/18">6/18</option>
                              <option value="6/24">6/24</option>
                              <option value="6/36">6/36</option>
                              <option value="6/6">6/6</option>
                              <option value="6/60">6/60</option>
                              <option value="6/9">6/9</option>
                              <option value="CF1M">CF1M</option>
                              <option value="CF2M">CF2M</option>
                              <option value="CF3M">CF3M</option>
                              <option value="CF4M">CF4M</option>
                              <option value="CF5M">CF5M</option>
                              <option value="NPL">NPL</option>
                              <option value="PL">PL</option>
                              <option value="Blanks">BLANKS</option>
                       </TextField>
                    
                </div>
                <div className="section padding">
             
                               <TextField
                              id="outlined-select-currency-native"
                              select
                              label="Left Eye"
                              SelectProps={{
                                native: true,
                              }}
                              fullWidth
                              defaultValue={displaylefteye}
                              onChange={(e)=>setlefteye(e.target.value)}
                            >
                              <option value=""> </option>
                              <option value="6/12">6/12</option>
                              <option value="6/18">6/18</option>
                              <option value="6/24">6/24</option>
                              <option value="6/36">6/36</option>
                              <option value="6/6">6/6</option>
                              <option value="6/60">6/60</option>
                              <option value="6/9">6/9</option>
                              <option value="CF1M">CF1M</option>
                              <option value="CF2M">CF2M</option>
                              <option value="CF3M">CF3M</option>
                              <option value="CF4M">CF4M</option>
                              <option value="CF5M">CF5M</option>
                              <option value="NPL">NPL</option>
                              <option value="PL">PL</option>
                              <option value="Blanks">BLANKS</option>
                       </TextField>
                </div>
                  </div>

                }
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
        open={remarksmodal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Remarks"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <div className="editmodal" >
                <div className="form center">
            
                    {
                      update === true &&
                      <div>
                    <div className="section padding">
                      <TextField
                      variant="outlined"
                      fullWidth
                      label="Id"
                      defaultValue={Edituser.staffId}
                      disabled
                      />
                  </div>
             
                      </div>

                  }
                  { update === true &&
                    <div>
                          <div className="section padding h4">
                           Eye Care
                         </div>
                         <div className="padding">
                           <TextField
                           variant="outlined"
                           fullWidth
                           label="Right Eye"
                           defaultValue={displayrighteye}
                           disabled
                           />
                       </div>
                         <div className="padding">
                           <TextField
                           variant="outlined"
                           fullWidth
                           label="Right Eye"
                           defaultValue={displaylefteye}
                           disabled
                           />
                       </div>
                    </div>
                  }
                  {    update === true &&
                    <div>
                          <div className="section padding h4">
                           Blood
                         </div>
                         <div className="padding">
                           <TextField
                           variant="outlined"
                           fullWidth
                           label="Hepb"
                           defaultValue={displayhepb}
                           disabled
                           />
                       </div>
                         <div className="padding">
                           <TextField
                           variant="outlined"
                           fullWidth
                           label="Hepc"
                           defaultValue={displayhepc}
                           disabled
                           />
                       </div>
                    </div>
                  }
                  {     update === true &&
                    <div>
                          <div className="section padding h4">
                          BPANDBMI
                         </div>
                         <div className="padding">
                           <TextField
                           variant="outlined"
                           fullWidth
                           label="Bp"
                           defaultValue={displaybp}
                           disabled
                           />
                       </div>
                         <div className="padding">
                           <TextField
                           variant="outlined"
                           fullWidth
                           label="Height"
                           defaultValue={displayheight}
                           disabled
                           />
                       </div>
                         <div className="padding">
                           <TextField
                           variant="outlined"
                           fullWidth
                           label="Hr"
                           defaultValue={displayhr}
                           disabled
                           />
                       </div>
                         <div className="padding">
                           <TextField
                           variant="outlined"
                           fullWidth
                           label="Weight"
                           defaultValue={displayweight}
                           disabled
                           />
                       </div>
                       <div className="section padding">
                            <TextField
                            variant="outlined"
                            fullWidth
                            label="Remarks"
                            multiline
                            rows={2}
                            defaultValue={displayremarks}
                            onChange={(e)=>setremarks(e.target.value)}
                            />
                          </div>
                    </div>
                           

                  }
                    
        
          
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
                    <Button variant="contained" color='primary' className="capitalized" onClick={HandleRemarks}>
                        Submit
                    </Button>
                    </div>
                </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={()=>setmodal(false)}>Close</Button> */}
          <Button onClick={()=>setremarksmodal(false)} color="error" autoFocus>
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
                    {
                      update === true &&
                      <div className="section padding">
                      <TextField
                      variant="outlined"
                      fullWidth
                      label="Id"
                      defaultValue={Edituser.staffId}
                      disabled
                      />
                  </div>
                  }

                  {
                    displayhepb != "" &&
                    <div>
                               <div className="section padding">
                        <TextField
                        variant="outlined"
                        fullWidth
                        label="Bp"
                        defaultValue={displaybp}
                        onChange={(e)=>setbp(e.target.value)}
                        />
                    </div>
                    <div className="section padding">
                        <TextField
                        variant="outlined"
                        fullWidth
                        label="Hr"
                        defaultValue={displayhr}
                        onChange={(e)=>sethr(e.target.value)}
                        />
                    </div>
                    <div className="section padding">
                        <TextField
                        variant="outlined"
                        fullWidth
                        label="Weight"
                        defaultValue={displayweight}
                        onChange={(e)=>setweight(e.target.value)}
                        />
                    </div>
                    <div className="section padding">
                        <TextField
                        variant="outlined"
                        fullWidth
                        label="Height"
                        defaultValue={displayheight}
                        onChange={(e)=>setheight(e.target.value)}
                        />
                    </div>
                    </div>
                  }
           
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
  
                    
                    {
                      update === true &&
                      <div className="section padding">
                      <TextField
                      variant="outlined"
                      fullWidth
                      label="Id"
                      defaultValue={Edituser.staffId}
                      disabled
                      />
                  </div>
                    }

                    {
                      update === true &&
                      <div>
                    <div className="section padding">
                        <TextField
                        variant="outlined"
                        fullWidth
                        label="fbsrbs"
                        onChange={(e)=>setfbsrbs(e.target.value)}
                        defaultValue={displayfbsrbs}
                        />
                    </div>
                    <div className="section padding">

                                 <TextField
          id="outlined-select-currency-native"
          select
          label="HEPATITIS B"
          SelectProps={{
            native: true,
          }}
          fullWidth
          defaultValue={displayhepb}
          onChange={(e)=>sethepb(e.target.value)}
        >
          <option value=""> </option>
          <option value="Positive(+)">Positive(+)</option>
          <option value="Negative(-)">Negative(-)</option>
        </TextField>
                    </div>
                    <div className="section padding">
                        <TextField
                          id="outlined-select-currency-native"
                          select
                          label="HEPATITIS C"
                          SelectProps={{
                            native: true,
                          }}
                          fullWidth
                          defaultValue={displayhepc}
                          onChange={(e)=>sethepc(e.target.value)}
                        >
                          <option value=""> </option>
                          <option value="Positive(+)">Positive(+)</option>
                          <option value="Negative(-)">Negative(-)</option>
                        </TextField>
                    </div>
                      </div>
                    }
                
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
              Super admin has control over all database
            </div>
            <div className="section">
            <Button fullWidth variant="contained" onClick={EyeOpen}>Eye Care</Button>
            </div>
            <div className="section">
            <Button fullWidth variant="contained" onClick={BloodOpen}>Blood</Button>
            </div>
            <div className="section">
            <Button fullWidth variant="contained" onClick={BpmOpen}>BPANDBMI</Button>
            </div>
            <div className="section">
            <Button fullWidth variant="contained" onClick={RemarksOpen}>Remarks</Button>
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