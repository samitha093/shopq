import '../Styles/Sellersidebar.css';
import ReactDOM from 'react-dom';
import axios from 'axios';
import swal from '@sweetalert/with-react'
import React, {useState, useEffect}  from 'react'
import FastfoodTwoToneIcon from '@material-ui/icons/FastfoodTwoTone';
import ShoppingBasketTwoToneIcon from '@material-ui/icons/ShoppingBasketTwoTone';
import StorefrontTwoToneIcon from '@material-ui/icons/StorefrontTwoTone';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import DashboardTwoToneIcon from '@material-ui/icons/DashboardTwoTone';
import {useHistory} from 'react-router-dom';
import {endsession, getusername} from '../Session/Session';
import CircularProgress from '@material-ui/core/CircularProgress';
import PersonIcon from '@material-ui/icons/Person';

const Sellersidebar = () => {
    const [items, setitem] = useState([]);


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

    const history = useHistory();
    const username = getusername();
    
    async function seller_products(){
        
        let products = document.getElementById('seller_products-btn');
        let orders = document.getElementById('seller_orders-btn');
        let shop = document.getElementById('seller_shop-btn');
        let logout = document.getElementById('seller_logout-btn');
        
        ReactDOM.findDOMNode(products).style.background = 'rgb(247, 197, 91)';
        ReactDOM.findDOMNode(orders).style.background = 'rgb(255, 255, 255)';
        ReactDOM.findDOMNode(shop).style.background = 'rgb(255, 255, 255)';
        ReactDOM.findDOMNode(logout).style.background = 'rgb(255, 255, 255)';
        history.push("/seller/products");
    }
    async function seller_orders(){
        
        let products = document.getElementById('seller_products-btn');
        let orders = document.getElementById('seller_orders-btn');
        let shop = document.getElementById('seller_shop-btn');
        let logout = document.getElementById('seller_logout-btn');
        
        ReactDOM.findDOMNode(products).style.background = 'rgb(255, 255, 255)';
        ReactDOM.findDOMNode(orders).style.background = 'rgb(247, 197, 91)';
        ReactDOM.findDOMNode(shop).style.background = 'rgb(255, 255, 255)';
        ReactDOM.findDOMNode(logout).style.background = 'rgb(255, 255, 255)';
        history.push("/seller/orders");
    }
    async function seller_shop(){
        showLoading();
        //console.log(getusername());
        axios.get('http://localhost:8000/seller/user/'+getusername())
        .then((res)=>{
            //console.log(res.data.store);
            history.push("/store/"+res.data.store.storeid);
            swal.close();
        })
        .catch((err)=>{
            console.log(err);
            swal.close();
                    swal({
                        title: "Something went to wrong!",
                        text: "Please Try Again",
                        icon: "error",
                    });
        })   
        //console.log(items);
        //history.push("/store/");
    }
    async function seller_logout(){
        //console.log('Logout');
        endsession();
        history.push("/login");
    }
    async function useraccount(){
        history.push("/login");
    }
    return (
        <div className="sidebar">
            <ul className="sidebar-list">
                <li id="seller_products-btn" className="listitem" onClick={seller_products}>
                    <FastfoodTwoToneIcon className="listitem-icon"/>
                    <br/>Products
                </li>
                <li id="seller_orders-btn" className="listitem" onClick={seller_orders}>
                    <ShoppingBasketTwoToneIcon className="listitem-icon"/>
                    <br/>Orders
                </li>
                <li id="seller_shop-btn" className="listitem" onClick={seller_shop}>
                    <StorefrontTwoToneIcon className="listitem-icon"/>
                    <br/>Shop
                </li>
                <li id="seller_shop-btn" className="listitem" onClick={useraccount}>
                    <PersonIcon className="listitem-icon"/>
                    <br/>My Account
                </li>
                <li id="seller_logout-btn" className="listitem" onClick={seller_logout}>
                    <ExitToAppTwoToneIcon className="listitem-icon"/>
                    <br/>Logout
                </li>
            </ul>
        </div>
    )
}

export default Sellersidebar
