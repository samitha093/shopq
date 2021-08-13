import React, {useState, useEffect}  from 'react'
import { useHistory } from 'react-router-dom';
import {getusername} from '../../Session/Session';
import axios from 'axios';
import swal from '@sweetalert/with-react'
import CircularProgress from '@material-ui/core/CircularProgress';

import './css/Orders.css'

function Orders() {
    const history = useHistory();
    const [items, setitem] = useState([]);
    useEffect(()=>{
        showLoading();
        axios.get('https://shopqapi.herokuapp.com/order/user/'+getusername())
        .then((res)=>{
            swal.close();
            //console.log(res.data.orders);
            setitem(res.data.orders);
        })
        .catch((err1)=>{
            console.log(err1);
            swal.close();
        })
       // console.log(items)
    },[])

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

    async function item_click(value){
        //history.push("/item/"+ value)
    }


    const listItems = items.map((item) =>
        <div onClick={()=>item_click(item.product[0].id)} className="order-card" key={item.product[0].id}>
                <div className="order-card_img">
                    <img className="order-card_img_img" src={item.product[0].img}/>
                </div> 
                <div className="order-card_header">
                    <div className="order-card_header-ttle">
                        <p className="order-card_head_title">{item.product[0].title}</p>
                    </div>
                    <div className="order-card_header-right">
                        <p className="order-card_head_price">Amount : LKR {item.product[0].price}</p>
                        <p className="order-card_head_qty"> Quantity : {item.product[0].qty} g</p>
                    </div>
                    
                </div>
                <div className="order-card_status">
                    <p className="order-card_head_status">Status : {item.status}</p>
                </div>
        </div>

    );

    return (
        <div className="user-orders">
            <h2>order</h2>
            {listItems}
        </div>
    )
}

export default Orders
