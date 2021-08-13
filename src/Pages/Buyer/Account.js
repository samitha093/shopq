import {getusername} from '../../Session/Session';
import React, {useState, useEffect}  from 'react'
import axios from 'axios';
import swal from '@sweetalert/with-react'
import CircularProgress from '@material-ui/core/CircularProgress';
import './css/Account.css'
function Account() {
    const [Storename, setstorename] = useState("");
    const [Storeid, setstoreid] = useState("");
    const [Email, setemail] = useState("");
    const [Mobile, setmobile] = useState("");
    const [Address, setaddress] = useState("");
    const [Province, setprovince] = useState("");
    const [x, setx] = useState([]);
    const [username, setusername] = useState("");
    const [oldpassword, setoldpassword] = useState("");
    const [newpassword, setnewpassword] = useState("");
    const [cnewpassword, setcnewpassword] = useState("");
    useEffect(()=>{
        showLoading();
        setusername(getusername());

        axios.get('https://shopqapi.herokuapp.com/seller/user/'+getusername())
            .then((res)=>{
                swal.close();
                console.log(res.data.store);
                setx(true);

                setstorename(res.data.store.storename);
                setstoreid(res.data.store.storeid);
                setemail(res.data.store.email);
                setmobile(res.data.store.mobile);
                setaddress(res.data.store.address);
                setprovince(res.data.store.province);
            })
            .catch((err1)=>{
                swal.close();
                //console.log(err1);
                setx(false);
            })
        
    },[]);

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
    async function editstore_api() {
        if( Storename && Email && Mobile && Address && Province ){

           const  seller = {
                storename : Storename,
                email : Email,
                mobile : Mobile,
                address : Address,
                province : Province
            }
            const url = 'https://shopqapi.herokuapp.com/seller/update/'+ getusername();
            axios.post(url,seller)
            .then((res)=>{
                swal({
                    title: "Update successfull !",
                    text: "Thank You",
                    icon: "success",
                })
            })
            .catch((err)=>{
                swal({
                    title: "Something went to wrong!",
                    text: "Please Try Again",
                    icon: "error",
                });
            })

        }else{
            swal({
                title: "Something went to wrong!",
                text: "Please fill all details",
                icon: "error",
            });
        }

    }
    async function reset_api() {
        if(newpassword==cnewpassword && oldpassword){
            const  user = {
                username: username,
                password: newpassword,
            }
            const url = 'https://shopqapi.herokuapp.com/users/update/'+ getusername();
            axios.post(url,user)
            .then((res)=>{
                swal({
                    title: "Update successfull !",
                    text: "Thank You",
                    icon: "success",
                })
            })
            .catch((err)=>{
                swal({
                    title: "Something went to wrong!",
                    text: "Please Try Again",
                    icon: "error",
                });
            })
            setoldpassword("");
            setnewpassword("");
            setcnewpassword("");
        }else{
            swal({
                title: "Something went to wrong!",
                text: "Password Mismatch",
                icon: "error",
            });
        }
        
    }
    return (
        <div className="user-account">
            <div className="user">
                <h5>User Account Details</h5>
                <div className="reset">
                    <div className="moderninput">
                        <input type="text" value={username} disabled={true} onChange={(e)=>setusername(e.target.value)} autoComplete="off" required/>
                        <label  className="label-moderninput">
                            <span className="content-moderninput"></span>
                        </label>
                    </div>
                    <div className="moderninput">
                        <input type="password"  value={oldpassword} onChange={(e)=>setoldpassword(e.target.value)} autoComplete="off" required/>
                        <label className="label-moderninput">
                            <span className="content-moderninput">Old Password</span>
                        </label>
                    </div>
                    <div className="contact">
                        <div className="left">
                            <div className="moderninput">
                                <input type="password"  value={newpassword} onChange={(e)=>setnewpassword(e.target.value)} autoComplete="off" required/>
                                <label className="label-moderninput">
                                    <span className="content-moderninput">New Password</span>
                                </label>
                            </div>
                        </div>
                        <div className="right">
                            <div className="moderninput">
                                <input type="password"  value={cnewpassword} onChange={(e)=>setcnewpassword(e.target.value)} autoComplete="off" required/>
                                <label className="label-moderninput">
                                    <span className="content-moderninput">Conform Password</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="contact">
                        <div className="right-btn">
                            <button onClick={reset_api} className="button-o">Reset Password</button>
                        </div>
                    </div>
                </div>
            </div>
            {
                x ?<div className="seller" disabled={true}>
                    <h5>Seller Account Details</h5>
                        <div className="storeedit">
                            <div className="moderninput">
                                <input type="text" value={Storename} onChange={(e)=>setstorename(e.target.value)} autoComplete="off" required/>
                                <label  className="label-moderninput">
                                    <span className="content-moderninput">Store Name</span>
                                </label>
                            </div>
                            <div className="moderninput">
                                <input type="text" value={Storeid}  disabled={true} onChange={(e)=>setstoreid(e.target.value)} autoComplete="off" required/>
                                <label className="label-moderninput">
                                    <span className="content-moderninput"></span>
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
                                    <button className="button-o"onClick={editstore_api}>Save Details</button>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                : null
            }
            
        </div>
    )
}

export default Account
