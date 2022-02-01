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
const Screen = () => {
    const [data, setdata] = useState([]);
    const [email, setemail] = useState("");
    const [staff, setstaff] = useState([]);
    const [eyecaremodal, seteyecaremodal] = useState(false);

    const Endpoint = "http://rhdscreen-api.herokuapp.com"
useEffect(() => {
if(sessionStorage.getItem("data") != undefined){
    const user = JSON.parse(sessionStorage.getItem("data"))
    setdata(user)
    setemail(user.login.email)
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
}).catch(err=>{
    console.log(err)
})
});

const HandleEdit = (current)=>{
seteyecaremodal(true)
}
    return ( 
        <section>

            <Online />
            {
                data != [] &&
                
        <div>
            <div className='openSans h4 container padding-top-40 padding-bottom-40'>
                Welcome {email}
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
                        staff === [] &&
                        <tr>
                            <td>
                            <div className="loaderbox">
                         <div className="loadercontainer">
                           <span className="loadercircle"></span>
                           <span className="loadercircle"></span>
                           <span className="loadercircle"></span>
                           <span className="loadercircle"></span>
                         </div>
                       </div>
                            </td>
                        </tr>
                    }
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
                    {/* <div className="padding-20 h3 hr">
                        Eye care
                    </div> */}
                    <div className="section padding">
                        <TextField
                        variant="outlined"
                        fullWidth
                        label="Right Eye"
                        />
                    </div>
                    <div className="section padding">
                        <TextField
                        variant="outlined"
                        fullWidth
                        label="Left Eye"
                        />
                    </div>
                    <div className="section padding">
                    <Button variant="contained" color='primary' className="capitalized">
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
        
        </section>
     );
}
 
export default Screen;