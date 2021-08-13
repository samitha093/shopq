import '../Styles/Sellersidebar.css';
import ReactDOM from 'react-dom';
import SettingsIcon from '@material-ui/icons/Settings';
import RoomIcon from '@material-ui/icons/Room';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import {useHistory} from 'react-router-dom';
import {endsession, getusername} from '../Session/Session';
import axios from 'axios';
import swal from '@sweetalert/with-react'
import CircularProgress from '@material-ui/core/CircularProgress';
const Usersidebar = () => {
    const history = useHistory();
    const username = getusername();
    async function seller_dashboard(){
        //console.log('dashbord-click');
        let dashboard = document.getElementById('seller_dashboard-btn');
        let products = document.getElementById('seller_products-btn');
        let shop = document.getElementById('seller_shop-btn');
        let logout = document.getElementById('seller_logout-btn');
        ReactDOM.findDOMNode(dashboard).style.background = 'rgb(247, 197, 91)';
        ReactDOM.findDOMNode(products).style.background = 'rgb(255, 255, 255)';
        ReactDOM.findDOMNode(shop).style.background = 'rgb(255, 255, 255)';
        ReactDOM.findDOMNode(logout).style.background = 'rgb(255, 255, 255)';
        history.push("/user/");
    }
    async function seller_products(){
        let dashboard = document.getElementById('seller_dashboard-btn');
        let products = document.getElementById('seller_products-btn');
        let shop = document.getElementById('seller_shop-btn');
        let logout = document.getElementById('seller_logout-btn');
        ReactDOM.findDOMNode(dashboard).style.background = 'rgb(255, 255, 255)';
        ReactDOM.findDOMNode(products).style.background = 'rgb(247, 197, 91)';
        ReactDOM.findDOMNode(shop).style.background = 'rgb(255, 255, 255)';
        ReactDOM.findDOMNode(logout).style.background = 'rgb(255, 255, 255)';
        history.push("/user/account");
    }
    async function seller_orders(){
        let dashboard = document.getElementById('seller_dashboard-btn');
        let products = document.getElementById('seller_products-btn');
        let shop = document.getElementById('seller_shop-btn');
        let logout = document.getElementById('seller_logout-btn');
        ReactDOM.findDOMNode(dashboard).style.background = 'rgb(255, 255, 255)';
        ReactDOM.findDOMNode(products).style.background = 'rgb(255, 255, 255)';
        ReactDOM.findDOMNode(shop).style.background = 'rgb(255, 255, 255)';
        ReactDOM.findDOMNode(logout).style.background = 'rgb(255, 255, 255)';
        history.push("/user/address");
    }
    async function seller_shop(){
        showLoading()
        let dashboard = document.getElementById('seller_dashboard-btn');
        let products = document.getElementById('seller_products-btn');
        let shop = document.getElementById('seller_shop-btn');
        let logout = document.getElementById('seller_logout-btn');
        ReactDOM.findDOMNode(dashboard).style.background = 'rgb(255, 255, 255)';
        ReactDOM.findDOMNode(products).style.background = 'rgb(255, 255, 255)';
        ReactDOM.findDOMNode(shop).style.background = 'rgb(247, 197, 91)';
        ReactDOM.findDOMNode(logout).style.background = 'rgb(255, 255, 255)';
        const getsellerstore = {
            storeuser : getusername()
        };
        console.log(getsellerstore)
        const url = 'https://shopqapi.herokuapp.com/seller/login';
        axios.post(url,getsellerstore)
            .then((res)=>{
                swal.close();
                history.push("/seller");
            })
            .catch((err)=>{
                swal.close();
                history.push("/user/createstore");
            })
        
    }
    async function seller_logout(){
        //console.log('Logout');
        endsession();
        history.push("/login");
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
        <div className="sidebar">
            <ul className="sidebar-list">
                <li id="seller_dashboard-btn" className="listitem " onClick={seller_dashboard}>
                    <BubbleChartIcon className="listitem-icon"/>
                    <br/>Orders
                </li>
                <li id="seller_products-btn" className="listitem" onClick={seller_products}>
                    <SettingsIcon className="listitem-icon"/>
                    <br/>Account
                </li>
            
                <li id="seller_shop-btn" className="listitem" onClick={seller_shop}>
                    <AddShoppingCartIcon className="listitem-icon"/>
                    <br/>Sell
                </li>
                <li id="seller_logout-btn" className="listitem" onClick={seller_logout}>
                    <ExitToAppTwoToneIcon className="listitem-icon"/>
                    <br/>Logout
                </li>
            </ul>
        </div>
    )
}

export default Usersidebar
