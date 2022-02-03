import Head from 'next/head'
import Image from 'next/image'
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import MenuItem from '@mui/material/MenuItem';
import Link from "next/link"
import {useEffect, useState} from "react"
const Navbar = () => {
    const [data, setdata] = useState("");
    const [Loginshow, setLoginshow] = useState("none");
    const [email, setemail] = useState("");
    useEffect(() => {
    if(sessionStorage.getItem("data") != undefined){
        const user = JSON.parse(sessionStorage.getItem("data"))
        setdata(user)
        setemail(user.login.email)
        setLoginshow("block")
        }else{
        
        }
    });
    const HandleLogout = ()=>{
    sessionStorage.removeItem("data")
    }
    return ( 
        <div className='fixed-top white openSans' style={{display:`${Loginshow}`}}>
        <div className="navigation-bar hr">
        <div className="">
           <Link href="/screen">
               <a>
               <img src="/img/ghs.jpg" className="height-50" alt="" />
               </a>
           </Link>
        </div>
            <div className="padding hide-small">
                <div className='button'>
                    RHD Staff Medical Screening
                </div>
            </div>
            <div className="padding">
            <div className="dropdown-hover">
    <div className="drop-button pointer">
        {
            data != [] &&
            <div>
            {email} <i class="fas fa-angle-up rotate-down"></i>
            </div>
        }
    </div>
     <div className="drop-menu white item-hoverable text-black">
         <div className="drop-item padding" onClick={HandleLogout}>LogOut</div>
     </div>
</div>
            </div>
        </div>
        </div>
     );
}
 
export default Navbar;