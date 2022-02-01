import Head from 'next/head'
import Image from 'next/image'
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import MenuItem from '@mui/material/MenuItem';
import {useEffect, useState} from "react"
const Online = () => {
    useEffect(() => {
    if(sessionStorage.getItem("data") != undefined){
        }else{
            window.location.assign("/")
        }
    });
    return ( 
        <></>
     );
}
 
export default Online;