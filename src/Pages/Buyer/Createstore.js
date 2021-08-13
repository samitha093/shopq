import './css/Createstore.css'
import {getusername} from '../../Session/Session';
import { useState } from 'react';
import swal from '@sweetalert/with-react'
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
const Createstore = () => {
    const [Storename, setstorename] = useState("");
    const [Storeid, setstoreid] = useState("");
    const [Email, setemail] = useState("");
    const [Mobile, setmobile] = useState("");
    const [Address, setaddress] = useState("");
    const [Province, setprovince] = useState("");
    const history = useHistory();
    async function register_api(){
        showLoading()
        const registerseller = {
            storename : Storename,
            storeid : Storeid,
            email : Email,
            mobile : Mobile,
            address : Address,
            province : Province,
            storeuser : getusername()
        };
        setstorename("");
        setstoreid("");
        setemail("");
        setmobile("");
        setaddress("");
        setprovince("");
        const url = 'http://localhost:8000/seller/add';
            axios.post(url,registerseller)
                .then((res)=>{
                    swal.close();
                    swal({
                        title: "User Creation Success!",
                        text: "Now You Can Login to System",
                        icon: "success",
                        timer: 3000
                    });
                    history.push("/seller");
                })
                .catch((err)=>{
                    swal.close();
                    swal({
                        title: "Something went to wrong!",
                        text: "Please Try Again",
                        icon: "error",
                    });
                })
    }

    async function showLoading() {
        swal({
            text: "Loading...",
            buttons: false,
            closeOnClickOutside: false,
            content: (
            <div>
               <CircularProgress disableShrink /> 
            </div>
            )
          });

      };

    return (
        <div className="user-creatstore">
            <h1>create new store</h1>
            <form>
                <div className="moderninput">
                    <input type="text" value={Storename} onChange={(e)=>setstorename(e.target.value)} autoComplete="off" required/>
                    <label  className="label-moderninput">
                        <span className="content-moderninput">Store Name</span>
                    </label>
                </div>
                <div className="moderninput">
                    <input type="text" value={Storeid} onChange={(e)=>setstoreid(e.target.value)} autoComplete="off" required/>
                    <label className="label-moderninput">
                        <span className="content-moderninput">Store ID</span>
                    </label>
                </div>
                <div className="contact">
                    <div className="left">
                        <div className="moderninput">
                            <input type="text"  value={Email} onChange={(e)=>setemail(e.target.value)} autoComplete="off" required/>
                            <label className="label-moderninput">
                                <span className="content-moderninput">Store Email Address</span>
                            </label>
                        </div>
                    </div>
                    <div className="right">
                        <div className="moderninput">
                            <input type="text"  value={Mobile} onChange={(e)=>setmobile(e.target.value)} autoComplete="off" required/>
                            <label className="label-moderninput">
                                <span className="content-moderninput">Store Mobile number</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="contact">
                    <div className="left">
                        <div className="moderninput">
                            <input type="text" value={Address} onChange={(e)=>setaddress(e.target.value)} autoComplete="off" required/>
                            <label  className="label-moderninput">
                                <span className="content-moderninput">Store Address</span>
                            </label>
                        </div>
                    </div>
                    <div className="right">
                        <div className="moderninput">
                            <input type="text"  value={Province} onChange={(e)=>setprovince(e.target.value)} autoComplete="off" required/>
                            <label  className="label-moderninput">
                                <span className="content-moderninput">Store Province</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="contact">
                    <div className="right-btn">
                        <button className="button-o"onClick={register_api}>Submit Application</button>
                    </div>
                </div>
                
            </form>
        </div>
    )
}

export default Createstore
