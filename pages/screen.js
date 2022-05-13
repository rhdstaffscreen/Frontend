import Head from 'next/head'
import Image from 'next/image'
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import MenuItem from '@mui/material/MenuItem';
import {useEffect, useState,useRef} from "react"
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
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
const Screen = () => {
  const chartdata = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];

  const eyeForm = useRef(null)
  const bmiForm = useRef(null)
  const bloodForm = useRef(null)

  const Endpoint = "https://rhdscreen-api.herokuapp.com"
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
    const [loadOnce, setloadOnce] = useState(false)
    const [total, settotal] = useState("")
// const [righteye, setrighteye] = useState("");
// const [lefteye, setlefteye] = useState("");

// const [bp, setbp] = useState("");
// const [hr, sethr] = useState("");
// const [weight, setweight] = useState("");
// const [height, setheight] = useState("");
// const [bmi, setbmi] = useState("")

// const [fbsrbs, setfbsrbs] = useState("");
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
const [hideremarks, sethideremarks] = useState("none");
const [displaybmi, setdisplaybmi] = useState("")

useEffect(() => {
if(sessionStorage.getItem("data") != undefined){
    const user = JSON.parse(sessionStorage.getItem("data"))
    setdata(user)
    setemail(user.login.email)
    setrole(user.login.role)
    
    }
},[]);
useEffect(() => {
  if(loadOnce === false){
Axios.get(Endpoint + "/staff/showall" ,  {
    headers: {
       authorization: `Bearer ${data.token}`,
     
    }
 }  
).then((userdata)=>{
  setloadOnce(true)
    setstaff(userdata.data.staff)
    settotal(userdata.data.staff.length)
    setloading("none")
    if(role === "super"){
      setshowsuper("block")
    }
    if(role != "remarks"){
      sethideremarks("block")
    }
}).catch(err=>{
    console.log(err)
    setloading("none")
    setloadOnce(false)
})
  }
});

const [Edituser, setEdituser] = useState([]);
const [update, setupdate] = useState(false);
const HandleEdit = (currentuser)=>{
    setEdituser(currentuser)
  setupdate(false)
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
  setdisplaybmi("")
  if(update === false){




setdisplayremarks(currentuser.remarks)
  }

  // const p = new Promise((resolve,reject)=>{
  //   if(update === false){
  //     resolve(currentuser)
  //   }else if(update === true){
  //     setupdate(false)
  //     resolve(currentuser)
  //   }
  // })

  // p.then(selectuser=>{
  
  //   console.log(selectuser)


  // })

if(role === "super"){
    setsupermodal(true)
    currentuser.eyescreen.map(eye=>{
      setdisplaylefteye(eye.lefteye)
      setdisplayrighteye(eye.righteye)
      setupdate(true)
      console.log("empty")
    })
    currentuser.blood.map(blood=>{
      // setdisplayhepb(blood.hepb)
      // setdisplayhepc(blood.hepc)
      setdisplayfbsrbs(blood.fbsrbs)
      setupdate(true)
      console.log("not empty")
  })
  currentuser.bpandbmi.map(bpm=>{
    // setdisplayhr(bpm.hr)
    setdisplaybp(bpm.bp)
    setdisplayheight(bpm.height)
    setdisplayweight(bpm.weight)
    setdisplaybmi(bpm.bmi)
    setupdate(true)
  })
}else if(role === "eyecare"){
  seteyecaremodal(true)
  if(currentuser.eyescreen != []){
    currentuser.eyescreen.map(eye=>{
      setdisplaylefteye(eye.lefteye)
      setdisplayrighteye(eye.righteye)
      setupdate(true)
      console.log("empty")
    })

         }else{
          setupdate(true)
          console.log("not empty")
         }
}else if(role =="bpandbmi"){
setBpmmodal(true)

if(currentuser.bpandbmi != []){
  currentuser.bpandbmi.map(bpm=>{
    // setdisplayhr(bpm.hr)
    setdisplaybp(bpm.bp)
    setdisplayheight(bpm.height)
    setdisplayweight(bpm.weight)
    setdisplaybmi(bpm.bmi)
    setupdate(true)
  })
  }else{
    setupdate(true)
   }
}else if(role === "blood"){
setbloodmodal(true)
if(currentuser.blood === []){
  setupdate(true)
  console.log("empty")
 }else{

  currentuser.blood.map(blood=>{
    // setdisplayhepb(blood.hepb)
    // setdisplayhepc(blood.hepc)
    setdisplayfbsrbs(blood.fbsrbs)
    setupdate(true)
    console.log("not empty")
})
 }
}else if(role === "remarks"){
  setsupermodal(false)
  seteyecaremodal(false)
  setBpmmodal(false)
  setbloodmodal(false)
  setremarksmodal(true)

  currentuser.eyescreen.map(eye=>{
    setdisplaylefteye(eye.lefteye)
    setdisplayrighteye(eye.righteye)
    setupdate(true)
    console.log("empty")
  })
  currentuser.blood.map(blood=>{
    // setdisplayhepb(blood.hepb)
    // setdisplayhepc(blood.hepc)
    setdisplayfbsrbs(blood.fbsrbs)
    setupdate(true)
    console.log("not empty")
})
currentuser.bpandbmi.map(bpm=>{
  // setdisplayhr(bpm.hr)
  setdisplaybp(bpm.bp)
  setdisplayheight(bpm.height)
  setdisplayweight(bpm.weight)
  setdisplaybmi(bpm.bmi)
  setupdate(true)
})
}
}


const HandleEyeCare = ()=>{
const eyeRef = eyeForm.current;
const lefteye = eyeRef["lefteye"].value
const righteye = eyeRef["righteye"].value
if(role === "eyecare" || role === "super"){

if(righteye === "" || lefteye === ""){
setsnackbar(true)
setsnackmessage("make sure to enter inputs")
}else{
  setloading("block")
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
    setloading("none")
  }).catch(err=>{
    console.log(err)
    seteyecaremodal(false)
    setsnackbar(true)
    setsnackmessage(err.message)
    setloading("none")
  })
}
}else{
  setsnackbar(true)
  setsnackmessage("Unauthorized access")
  setloading("none")
}
}
const HandleBpm = ()=>{
  const bmiRef = bmiForm.current;
const bp = bmiRef["bp"].value
const weight = bmiRef["weight"].value
const height = bmiRef["height"].value
const bmi = bmiRef["bmi"].value
  if(role === "bpandbmi" || role ==="super"){
    // && hr

if(bp === "" && weight === "" && height === "" && bmi === ""){
setsnackbar(true)
setsnackmessage("make sure to enter inputs")
setloading("none")

}else{
  setloading("block")
  Axios
  .patch(Endpoint + "/staff/bpandbmi/" + Edituser._id , {
    bp:bp,
    // hr:hr,
    weight:weight,
    height:height,
    bmi:bmi
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
  const bloodRef = bloodForm.current;
const fbsrbs = bloodRef["fbsrbs"].value
  if(role === "blood" || role === "super"){
    // && hepb === "" && hepc === ""
if(fbsrbs === "" ){
setsnackbar(true)
setsnackmessage("make sure to enter inputs")
}else{
    setloading("block")
  Axios
  .patch(Endpoint + "/staff/blood/" + Edituser._id , {
    fbsrbs:fbsrbs,
    // hepb:hepb,
    // hepc:hepc
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
<div className="padding-bottom-100">
  <Navbar />
</div>
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
  <div className='h4 container padding-top-20 padding-bottom-20'>
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
  <div className="row-flex space-between">
    <div className="padding">
    <TextField
        label="Search with staff Id"
        variant="outlined"
        onChange={(e)=>setsearch(e.target.value)}
        />

    </div>
    <div className="padding">
    <div className="h4">
            {total} Registrations
          </div>
    </div>
  </div>
   
   
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
      <th>
      <div style={{display:`${showsuper}`}}>
        Print
        </div>
      </th>
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
                  <Button color="success" variant="outlined" startIcon={<CreateOutlinedIcon />} onClick={()=>HandleEdit(user)}>
                      Edit
                  </Button>
              </td>
              <td>
              <div style={{display:`${showsuper}`}}>
              <Button variant="outlined" startIcon={<LocalPrintshopOutlinedIcon/>} onClick={()=>window.location.assign(`/remarks/${user._id}`)}>
                      Print
              </Button>
              </div>
              
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
<form ref={eyeForm} className="editmodal">
      <div className="form center">
  
          {
            update === true &&
            <div className="section padding">
            <TextField
            variant="outlined"
            fullWidth
            label="Staff Id"
            defaultValue={Edituser.staffId}
            disabled

            />
        </div>

        }
     
        <div>
            <div className="section padding">
              {
              displayrighteye === "" &&
                     <TextField
                     id="outlined-select-currency-native"
                     select
                     label="Right Eye"
                     SelectProps={{
                       native: true,
                     }}
                     fullWidth
                     defaultValue={displayrighteye}
                    //  onChange={(e)=>setrighteye(e.target.value)}
                     name="righteye"
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
            
               </TextField>
              }
              {
              displayrighteye != "" &&
                     <TextField
                     id="outlined-select-currency-native"
                     select
                     label="Right Eye"
                     SelectProps={{
                       native: true,
                     }}
                     fullWidth
                     defaultValue={displayrighteye}
                    //  onChange={(e)=>setrighteye(e.target.value)}
                    name="righteye"
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
            
               </TextField>
              }
            </div>
      <div className="section padding">
        {
          displaylefteye === "" &&
          <TextField
          id="outlined-select-currency-native"
          select
          label="Left Eye"
          SelectProps={{
            native: true,
          }}
          fullWidth
          defaultValue={displaylefteye}
          // onChange={(e)=>setlefteye(e.target.value)}
          name="lefteye"
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
    </TextField>
        }
        {
          displaylefteye != "" &&
          <TextField
          id="outlined-select-currency-native"
          select
          label="Left Eye"
          SelectProps={{
            native: true,
          }}
          fullWidth
          defaultValue={displaylefteye}
          // onChange={(e)=>setlefteye(e.target.value)}
          name="lefteye"

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
    </TextField>
        }
      </div>
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
  </form>
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
            label="Staff Id"
            defaultValue={Edituser.staffId}
            disabled
            />
        </div>
    
            </div>

        }
   
          <div>
                <div className="section padding h4">
                  Eye Care
                </div>
                {
                  displayrighteye === "" &&
                  <div className="padding">
                  <TextField
                  variant="outlined"
                  fullWidth
                  label="Right Eye"
                  defaultValue={displayrighteye}
                  disabled
                  />
              </div>
                }
                {
                  displayrighteye != "" &&
                  <div className="padding">
                  <TextField
                  variant="outlined"
                  fullWidth
                  label="Right Eye"
                  defaultValue={displayrighteye}
                  disabled
                  />
              </div>
                }
            {
              displaylefteye === "" &&
              <div className="padding">
              <TextField
              variant="outlined"
              fullWidth
              label="Right Eye"
              defaultValue={displaylefteye}
              disabled
              />
          </div>
            }
            {
              displaylefteye != "" &&
              <div className="padding">
              <TextField
              variant="outlined"
              fullWidth
              label="Right Eye"
              defaultValue={displaylefteye}
              disabled
              />
          </div>
            }
          </div>
   
        {    update === true &&
          <div>
                <div className="section padding h4">
                  Blood
                </div>
                <div className="padding">
                  <TextField
                  variant="outlined"
                  fullWidth
                  label="Fbsrbs"
                  defaultValue={displayfbsrbs}
                  disabled
                  />
              </div>
          
          </div>
        }

          <div>
                <div className="section padding h4">
                BP / BMI
                </div>
                {
                  displaybp === "" &&
                  <div className="padding">
                  <TextField
                  variant="outlined"
                  fullWidth
                  label="Bp"
                  defaultValue={displaybp}
                  disabled
                  />
              </div>
                }
                {
                  displaybp != "" &&
                  <div className="padding">
                  <TextField
                  variant="outlined"
                  fullWidth
                  label="Bp"
                  defaultValue={displaybp}
                  disabled
                  />
              </div>
                }
             {
               displayheight === "" &&
               <div className="padding">
               <TextField
               variant="outlined"
               fullWidth
               label="Height"
               defaultValue={displayheight}
               disabled
               />
           </div>
             }
             {
               displayheight != "" &&
               <div className="padding">
               <TextField
               variant="outlined"
               fullWidth
               label="Height"
               defaultValue={displayheight}
               disabled
               />
           </div>
             }
                {/* <div className="padding">
                  <TextField
                  variant="outlined"
                  fullWidth
                  label="Hr"
                  defaultValue={displayhr}
                  disabled
                  />
              </div> */}
         {
           displayweight === "" &&
           <div className="padding">
           <TextField
           variant="outlined"
           fullWidth
           label="Weight"
           defaultValue={displayweight}
           disabled
           />
       </div>
         }
         {
           displayweight != "" &&
           <div className="padding">
           <TextField
           variant="outlined"
           fullWidth
           label="Weight"
           defaultValue={displayweight}
           disabled
           />
       </div>
         }
        {
          displayremarks === "" &&
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
        }
        {
          displayremarks != "" &&
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
        }
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
<Button onClick={()=>{
  setremarksmodal(false)
  // setupdate(false)
}} color="error" autoFocus>
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
{"BP / BMI."}
</DialogTitle>
<DialogContent>
<DialogContentText id="alert-dialog-description">
<form ref={bmiForm} className="editmodal" >
      <div className="form center">
          {
            update === true &&
            <div className="section padding">
            <TextField
            variant="outlined"
            fullWidth
            label="Staff Id"
            defaultValue={Edituser.staffId}
            disabled
            />
        </div>
        }

          <div>
            {
              displaybp === "" &&
              <div className="section padding">
              <TextField
              variant="outlined"
              fullWidth
              label="Bp"
              defaultValue={displaybp}
              // onChange={(e)=>setbp(e.target.value)}
              name="bp"
              />
              </div>
            }
            {
              displaybp != "" &&
              <div className="section padding">
              <TextField
              variant="outlined"
              fullWidth
              label="Bp"
              defaultValue={displaybp}
              // onChange={(e)=>setbp(e.target.value)}
              name="bp"

              />
              </div>
            }

          {
               displayheight === "" &&
               <div className="padding">
               <TextField
               variant="outlined"
               fullWidth
               label="Height"
               defaultValue={displayheight}
              //  onChange={(e)=>setheight(e.target.value)}
              name="height"

               />
           </div>
             }
             {
               displayheight != "" &&
               <div className="padding">
               <TextField
               variant="outlined"
               fullWidth
               label="Height"
               defaultValue={displayheight}
              //  onChange={(e)=>setheight(e.target.value)}
              name="height"

               />
           </div>
             }
                {/* <div className="padding">
                  <TextField
                  variant="outlined"
                  fullWidth
                  label="Hr"
                  defaultValue={displayhr}
                  disabled
                  />
              </div> */}
         {
           displayweight === "" &&
           <div className="padding">
           <TextField
           variant="outlined"
           fullWidth
           label="Weight"
           defaultValue={displayweight}
          //  onChange={(e)=>setweight(e.target.value)}
          name="weight"

           />
       </div>
         }
         {
           displayweight != "" &&
           <div className="padding">
           <TextField
           variant="outlined"
           fullWidth
           label="Weight"
           defaultValue={displayweight}
          //  onChange={(e)=>setweight(e.target.value)}
          name="weight"

           />
       </div>
         }
         {
           displaybmi === "" &&
           <div className="section padding">
           <TextField
           variant="outlined"
           fullWidth
           label="BMI"
           type="number"
           defaultValue={displaybmi}
          //  onChange={(e)=>setbmi(e.target.value)}
          name="bmi"


           />
       </div>
         }
         {
           displaybmi != "" &&
           <div className="section padding">
           <TextField
           variant="outlined"
           fullWidth
           label="BMI"
           type="number"
           defaultValue={displaybmi}
          //  onChange={(e)=>setbmi(e.target.value)}
          name="bmi"

           />
       </div>
         }
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
  </form>
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
<form ref={bloodForm} className="editmodal" >
      <div className="form center">

          
          {
            update === true &&
            <div className="section padding">
            <TextField
            variant="outlined"
            fullWidth
            label="Staff Id"
            defaultValue={Edituser.staffId}
            disabled
            />
        </div>
          }

  
            <div>
              {
                displayfbsrbs === "" &&
                <div className="section padding">
                <TextField
                variant="outlined"
                fullWidth
                label="fbsrbs"
                onChange={(e)=>setfbsrbs(e.target.value)}
                // defaultValue={displayfbsrbs}
                name="fbsrbs"
                />
            </div>
              }
              {
                displayfbsrbs != "" &&
                <div className="section padding">
                <TextField
                variant="outlined"
                fullWidth
                label="fbsrbs"
                onChange={(e)=>setfbsrbs(e.target.value)}
                defaultValue={displayfbsrbs}
                name="fbsrbs"
                />
            </div>
              }
          {/* <div className="section padding">

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
          </div> */}
          {/* <div className="section padding">
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
          </div> */}
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
  </form>
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
<div className='h2'>
  Super Admin
</div>
<div>
    Super admin has control over all database
  </div>
</div>
</DialogTitle>
<DialogContent>
<DialogContentText id="alert-dialog-description">
<div className="">

  <div className="section">
  <Button fullWidth variant="contained" onClick={EyeOpen}>Eye Care</Button>
  </div>
  <div className="section">
  <Button fullWidth variant="contained" color="success" onClick={BloodOpen}>Blood</Button>
  </div>
  <div className="section">
  <Button fullWidth variant="contained" color="info" onClick={BpmOpen}>BPANDBMI</Button>
  </div>
  <div className="section">
  <Button fullWidth variant="contained" color="warning" onClick={RemarksOpen}>Remarks</Button>
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

<div>
<Footer />
</div>
</section>
     );
}
 
export default Screen;