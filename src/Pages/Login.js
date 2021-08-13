import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import React from 'react'
import swal from '@sweetalert/with-react'
import '../Styles/Login.css';
import axios from 'axios';
import {startsession} from '../Session/Session';
import CircularProgress from '@material-ui/core/CircularProgress';

const Login = () => {
    const [userName, setuserName] = useState("");
    const [password, setpassword] = useState("");
    const [R_username, setr_username] = useState("");
    const [R_password, setr_password] = useState("");
    const [R_cpassword, setr_cpassword] = useState("");

    const history = useHistory();
    function login(){
        let x = document.getElementById('login')
        let y = document.getElementById('register')
        let z = document.getElementById('login-btn')
        ReactDOM.findDOMNode(x).style.left = "0px"
        ReactDOM.findDOMNode(y).style.left = "450px"
        ReactDOM.findDOMNode(z).style.left = "0px"
    }
    function register(){
        let x = document.getElementById('login')
        let y = document.getElementById('register')
        let z = document.getElementById('login-btn')
        ReactDOM.findDOMNode(x).style.left = "-450px"
        ReactDOM.findDOMNode(y).style.left = "0px"
        ReactDOM.findDOMNode(z).style.left = "110px"
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
    async function login_api(){
        showLoading();
        let useritem = {username:userName,password:password}
        setuserName("");
        setpassword("");
        const url = 'http://localhost:8000/users/login';
        axios.post(url,useritem)
                .then((res)=>{
                    swal.close();
                    startsession(res.data.username, res.data.token);
                    history.push("/user") 
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
    async function register_api(){
        //showLoading();
        if( R_password == R_cpassword){
            showLoading();
            const registeruser = {
                r_username : R_username,
                r_password : R_password
            };
            setr_username("");
            setr_password("");
            setr_cpassword("");
            const url = 'http://localhost:8000/users/add';
            axios.post(url,registeruser)
                .then((res)=>{
                    swal.close();
                    swal({
                        title: "User Creation Success!",
                        text: "Now You Can Login to System",
                        icon: "success",
                    });
                })
                .catch((err)=>{
                    swal.close();
                    swal({
                        title: "Something went to wrong!",
                        text: "Please Try Again",
                        icon: "error",
                    });
                })
        }else{
           // swal.close();
           console.log("got e");
           //swal.close();
            swal({
                title: "Password mismatch!",
                text: "Please Try Again",
                icon: "error",
            });
        }
    }

    return (
        <div className="login-background">
            <div className="login-background-block">
                <div className="login-background-block-btnbox">
                    <div id="login-btn"></div>
                    <button type="button" className="toggle-btn" onClick={login}>Log In</button>
                    <button type="button" className="toggle-btn" onClick={register}>Register</button>
                </div>
                <form id="login" className="login-input-group">
                    <input type="text" value={userName} className="login-input-field" onChange={(e)=>setuserName(e.target.value)} placeholder="User name" required/>
                    <input type="password" value={password} className="login-input-field" onChange={(e)=>setpassword(e.target.value)} placeholder="Enter Password" required/>
                    <button type="button" className="login-submit-btn" onClick={login_api}>Login</button>
                </form>
                <form id="register" className="login-input-group">
                    <input type="text" value={R_username} className="login-input-field" onChange={(e)=>setr_username(e.target.value)}  placeholder="User name" required/>
                    <input type="password" value={R_password} className="login-input-field" onChange={(e)=>setr_password(e.target.value)} placeholder="Enter Password" required/>
                    <input type="password" value={R_cpassword} className="login-input-field" onChange={(e)=>setr_cpassword(e.target.value)}placeholder="Re-Enter Password" required/>
                    <button type="button" className="login-submit-btn" onClick={register_api}>Register</button>
                </form>
            </div>
        </div>
    )
}

export default Login
