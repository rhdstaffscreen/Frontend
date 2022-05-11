import { useRouter } from "next/router";
import { useState , useEffect} from "react";
import Axios from "axios"
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
import { Button } from "@mui/material";
const Endpoint = "https://rhdscreen-api.herokuapp.com"
const Remarks = () => {
    const styles = StyleSheet.create({
        page: {
          flexDirection: 'row',
          backgroundColor: '#E4E4E4'
        },
        section: {
          margin: 10,
          padding: 10,
          flexGrow: 1
        }
      });

    const router = useRouter()
    const {remarks} = router.query;
    const [data, setdata] = useState("");
    const [display, setdisplay] = useState([]);
    const [lefteye, setlefteye] = useState("");
    const [righteye, setrighteye] = useState("");
    const [hepb, sethepb] = useState("");
    const [hepc, sethepc] = useState("");
    const [height, setheight] = useState("");
    const [weight, setweight] = useState("");
    const [hr, sethr] = useState("");
    const [bp, setbp] = useState("");
    const [fullname, setfullname] = useState("");
    const [dremarks, setdremarks] = useState("");
    const [bmi, setbmi] = useState("")
    const [fbsrbs, setfbsrbs] = useState("");
    const [sex, setsex] = useState("")
    const [age, setage] = useState("")
    useEffect(() => {
        if(sessionStorage.getItem("data") != undefined){
            const user = JSON.parse(sessionStorage.getItem("data"))
            setdata(user)
            if(user.login.role != "super"){
                window.location.assign("/screen")
            }
            }
        },[]);
    useEffect(() => {
        Axios.get(Endpoint + "/staff/" + `${remarks}` ,  {
            headers: {
               authorization: `Bearer ${data.token}`,
             
            }
         }  
        ).then((userdata)=>{
          
            setfullname(userdata.fullName)
            // setage(userdata.age)
            // setsex(userdata.sex)
            setdisplay(userdata.data.staff)
            console.log(userdata)
            userdata.data.staff.blood.map(blood=>{
                sethepb(blood.hepb)
                sethepc(blood.hepc)
                setfbsrbs(blood.fbsrbs)
            })
            
            userdata.data.staff.eyescreen.map(eye=>{
              setlefteye(eye.lefteye)
              setrighteye(eye.righteye)
            })
            
            userdata.data.staff.bpandbmi.map(bpm=>{
              sethr(bpm.hr)
              setbp(bpm.bp)
              setheight(bpm.height)
              setweight(bpm.weight)
              setbmi(bpm.bmi)
            })
            setdremarks(userdata.data.staff.remarks)
            // .map(remark=>{
           
            // })
            
          
        }).catch(err=>{
            console.log(err)
    
        })
        });

        const [displayprint, setdisplayprint] = useState("block");
        const Handleprint = ()=>{
            setdisplayprint("none")
            const p = new Promise((resolve, reject)=>{
                if(displayprint === "block"){
                    resolve("block")
                    window.print()
                }
            })
            p.then(result=>{
                setdisplayprint("block")
            })
        }
    return ( 
        <section className="padding">
            <div className="fixed bottom-20 right-20 z-index-5" style={{display:`${displayprint}`}}>
                <Button variant="contained" onClick={Handleprint}>
                    Print Results
                </Button>
            </div>
            <div className="center width-700-max border results">
                <div className="row">
                    <div className="col sm-12 md-4 lg-4 padding">
                    <div className="text-center">
            <img src="/img/ghs.jpg" className="height-100" alt="" />
            </div>
                    </div>
                    <div className="col sm-12 md-8 lg-8 padding">
                        <div className="h3 text bold">
                        GHANA HEALTH SERVICE 
                        </div>
                    <div className="h6 section">
                    RHD STAFF SCREENING RESULTS <br />
                    </div>
                    </div>
                </div>
       
      
         

            <div>
                <div className="padding-20 h6 top-border text-bold text-indigo">PERSONAL INFORMATION</div>
                <table>
                    <tr>
                        <td>
                       <div className="padding row-flex">
                        <div className="text-bold padding-right-10">Full Name: </div>
                        <div className="opacity-3">
                        {display.fullName}
                        </div>
                    </div>
                        </td>
                        <td>
                               
                    <div className="padding row-flex">
                        <div className="text-bold padding-right-10">Staff Id: </div>
                        <div className="opacity-3">
                        {display.staffId}
                        </div>
                    </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        <div className="padding row-flex">
                        <div className="text-bold padding-right-10">Gender: </div>
                        <div className="opacity-3">
                        {display.sex}
                        </div>
                    </div>
                        </td>
                        <td>

                        <div className="padding row-flex">
                        <div className="text-bold padding-right-10">Age: </div>
                        <div className="opacity-3">
                        {display.age}
                        </div>
                    </div>
                        </td>
                    </tr>
                </table>
              
            </div>
            <div>
                <div className="padding h6 top-border text-bold text-indigo">EYE CARE</div>
                <div className="row light ">
                    <div className="col sm-12 md-6 lg-6 padding">
                    <div className="row-flex">
                    <div className="text-bold padding-right-10">Right Eye: </div>
                        <div className="opacity-3">
                            {righteye}
                        </div>
                    </div>
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                      <div className="row-flex">
                      <div className="text-bold padding-right-10">Left Eye: </div>
                        <div className="opacity-3">
                            {lefteye}
                        </div>
                      </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="padding h6 top-border text-bold text-indigo">Blood</div>
                <div className="row light ">
                    {/* <div className="col sm-12 md-6 lg-6 padding">
                   <div className="row-flex">
                   <div className="text-bold padding-right-10">HepB: </div>
                        <div className="opacity-3">
                            {hepb}
                        </div>
                   </div>
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                     <div className="row-flex">
                     <div className="text-bold padding-right-10">HepC: </div>
                        <div className="opacity-3">
                            {hepc}
                        </div>
                     </div>
                    </div> */}
                    <div className="col sm-12 md-6 lg-6 padding">
                     <div className="row-flex">
                     <div className="text-bold padding-right-10">FBSRBS: </div>
                        <div className="opacity-3">
                            {fbsrbs}
                        </div>
                     </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="padding h6 top-border text-bold text-indigo">BP / BMI</div>
                <div className="row light ">
                    <div className="col sm-12 md-6 lg-6 padding">
                        <div className="row-flex">
                        <div className="text-bold padding-right-10">Bp: </div>
                        <div className="opacity-3">
                            {bp}
                        </div>
                        </div>
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                      <div className="row-flex">
                      <div className="text-bold padding-right-10">Height: </div>
                        <div className="opacity-3">
                           {height}
                        </div>
                      </div>
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                       <div className="row-flex">
                       <div className="text-bold padding-right-10">Hr: </div>
                        <div className="opacity-3">
                            {hr}
                        </div>
                       </div>
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                       <div className="row-flex">
                       <div className="text-bold padding-right-10">Weight: </div>
                        <div className="opacity-3">
                            {weight}
                        </div>
                       </div>
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                       <div className="row-flex">
                       <div className="text-bold padding-right-10">BMI: </div>
                        <div className="opacity-3">
                            {bmi}
                        </div>
                       </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="padding h6 top-border text-bold text-indigo">REMARKS</div>
                <div className="light ">
                    <div className="padding">
                        <div className="opacity-3">
                         {dremarks}
                        </div>
                    </div>
                  
                </div>
            </div>
            </div>
        </section>
     );
}
 
export default Remarks;