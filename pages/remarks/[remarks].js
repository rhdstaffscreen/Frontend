import { useRouter } from "next/router";
import { useState , useEffect} from "react";
import Axios from "axios"
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
import { Button } from "@mui/material";
const Endpoint = "http://rhdscreen-api.herokuapp.com"
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
    useEffect(() => {
        if(sessionStorage.getItem("data") != undefined){
            const user = JSON.parse(sessionStorage.getItem("data"))
            setdata(user)
            
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
            setdisplay(userdata.data.staff)
            console.log(userdata)
            userdata.data.staff.blood.map(blood=>{
                sethepb(blood.hepb)
                sethepc(blood.hepc)
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
            <div className="center width-800-max border">
            <div className="center text-center padding">
            <img src="/img/ghs.jpg" className="height-100" alt="" />
            </div>
            <div  className="center text-center padding">
                <div className="h6">
                    GHANA HEALTH SERVICE RHD STAFF SCREENING RESULTS <br />
                    </div>
            </div>
         

            <div>
                <div className="padding h6 top-border">PERSONAL INFORMATION</div>
                <div className="">
                    <div className="padding row-flex">
                        <div>Full Name: </div>
                        <div className="opacity-3">
                        {display.fullName}
                        </div>
                    </div>
                    <div className="padding row-flex">
                        <div>Id: </div>
                        <div className="opacity-3">
                        {display.staffId}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="padding h6 top-border">EYE CARE</div>
                <div className="row light ">
                    <div className="col sm-12 md-6 lg-6 padding">
                    <div className="row-flex">
                    <div>Right Eye: </div>
                        <div className="opacity-3">
                            {righteye}
                        </div>
                    </div>
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                      <div className="row-flex">
                      <div>Left Eye: </div>
                        <div className="opacity-3">
                            {lefteye}
                        </div>
                      </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="padding h6 top-border">Blood</div>
                <div className="row light ">
                    <div className="col sm-12 md-6 lg-6 padding">
                   <div className="row-flex">
                   <div>HepB: </div>
                        <div className="opacity-3">
                            {hepb}
                        </div>
                   </div>
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                     <div className="row-flex">
                     <div>HepC: </div>
                        <div className="opacity-3">
                            {hepc}
                        </div>
                     </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="padding h6 top-border">BPANDBMI</div>
                <div className="row light ">
                    <div className="col sm-12 md-6 lg-6 padding">
                        <div className="row-flex">
                        <div>Bp: </div>
                        <div className="opacity-3">
                            {bp}
                        </div>
                        </div>
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                      <div className="row-flex">
                      <div>Height: </div>
                        <div className="opacity-3">
                           {height}
                        </div>
                      </div>
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                       <div className="row-flex">
                       <div>Hr: </div>
                        <div className="opacity-3">
                            {hr}
                        </div>
                       </div>
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                       <div className="row-flex">
                       <div>Weight: </div>
                        <div className="opacity-3">
                            {weight}
                        </div>
                       </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="padding h6 top-border">REMARKS</div>
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