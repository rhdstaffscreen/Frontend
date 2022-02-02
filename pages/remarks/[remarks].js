import { useRouter } from "next/router";
import { useState , useEffect} from "react";
import Axios from "axios"
const Endpoint = "http://rhdscreen-api.herokuapp.com"
const Remarks = () => {
    const router = useRouter()
    const {remarks} = router.query;
    const [data, setdata] = useState("");
    const [display, setdisplay] = useState("");
    useEffect(() => {
        if(sessionStorage.getItem("data") != undefined){
            const user = JSON.parse(sessionStorage.getItem("data"))
            setdata(user)
            
            }
        },[]);
    useEffect(() => {
        Axios.get(Endpoint + "/staff/showall" ,  {
            headers: {
               authorization: `Bearer ${data.token}`,
             
            }
         }  
        ).then((data)=>{
            setdisplay(data.data)
          
        }).catch(err=>{
            console.log(err)
    
        })
        });
    return ( 
        <section className="padding-top-30">
            <div className="center width-800-max border padding">
            <div className="center text-center padding">
            <img src="/img/ghs.jpg" className="height-200" alt="" />
            </div>
            <div  className="center text-center padding">
                <div className="h4">
                    GHANA HEALTH SERVICE RHD STAFF SCREENING RESULTS <br />
                    0012340
                    </div>
            </div>
            <div className="padding hr"></div>

            <div>
                <div className="padding h2">EYE CARE</div>
                <div className="row light">
                    <div className="col sm-12 md-6 lg-6 padding">
                        <div>Right Eye</div>
                        <div>
                            Resulting
                        </div>
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                        <div>Left Eye</div>
                        <div>
                            Resulting
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="padding h2">Blood</div>
                <div className="row light">
                    <div className="col sm-12 md-6 lg-6 padding">
                        <div>HepB</div>
                        <div>
                            Resulting
                        </div>
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                        <div>HepC</div>
                        <div>
                            Resulting
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="padding h2">BPANDBMI</div>
                <div className="row">
                    <div className="col sm-12 md-6 lg-6 padding">
                        <div>Bp</div>
                        <div>
                            Resulting
                        </div>
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                        <div>Height</div>
                        <div>
                            Resulting
                        </div>
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                        <div>Hr</div>
                        <div>
                            Resulting
                        </div>
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                        <div>Weight</div>
                        <div>
                            Resulting
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </section>
     );
}
 
export default Remarks;