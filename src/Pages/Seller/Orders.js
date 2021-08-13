import React, {useState, useEffect}  from 'react'
import { useHistory } from 'react-router-dom';
import {getusername} from '../../Session/Session';
import axios from 'axios';
import swal from '@sweetalert/with-react'
import CircularProgress from '@material-ui/core/CircularProgress';

import './css/Orders.css'
const Orders = () => {
    const history = useHistory();
    const [items, setitem] = useState([]);
    useEffect(()=>{
        showLoading();
        axios.get('https://shopqapi.herokuapp.com/seller/user/'+getusername())
        .then((res)=>{
            axios.get('https://shopqapi.herokuapp.com/order/seller/'+ res.data.store.storeid)
                .then((res)=>{
                    swal.close();
                    setitem(res.data.orders);
                })
                .catch((err1)=>{
                    console.log(err1);
                    swal.close();
                })
        })
        .catch((err1)=>{
            console.log(err1);
            swal.close();
            swal({
                title: "Something went to wrong!",
                text: "Please try again later",
                icon: "error",
            });
        })

        
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

    async function delivered_api(orderid){
        showLoading();
        
        axios.get('https://shopqapi.herokuapp.com/order/'+ orderid)
            .then((res)=>{
                swal.close();
                const  order = {
                    store : res.data.store,
                    buyer : res.data.buyer,
                    status : "Delived",
                    product:res.data.product[0],
                    address:res.data.address[0]
                }
                if(res.data.status === "Delived"){
                    swal.close();
                    swal({
                        title: "Something went to wrong!",
                        text: "Product is already Delived",
                        icon: "error",
                    });
                }else{
                    const url = 'https://shopqapi.herokuapp.com/order/update/'+orderid;
                    axios.post(url,order)
                    .then((res)=>{
                        swal.close();
                        swal({
                            title: "Order successfully Placed  !",
                            text: "Thank You",
                            icon: "success",
                        })
                        .then((value) => {
                            axios.get('https://shopqapi.herokuapp.com/seller/user/'+getusername())
                            .then((res)=>{
                                axios.get('https://shopqapi.herokuapp.com/order/seller/'+ res.data.store.storeid)
                                    .then((res)=>{
                                        swal.close();
                                        setitem(res.data.orders);
                                    })
                                    .catch((err1)=>{
                                        console.log(err1);
                                        swal.close();
                                    })
                            })
                        })
                    })
                }
            })
            .catch((err1)=>{
                console.log(err1);
                swal.close();
                swal({
                    title: "Something went to wrong!",
                    text: "Please try again later",
                    icon: "error",
                });
            })
        
    }

    const listItems = items.map((item) =>
        <div className="order-card" key={item.id}>
                <div className="order-card_img">
                    <img className="order-card_img_img" src={item.product[0].img}/>
                </div> 
                <div className="order-card_header">
                    <div className="order-card_header-ttle">
                        <p className="order-card_head_title">{item.product[0].title}</p>
                    </div>
                    <div className="order-card_header-right">
                        <p className="order-card_head_price">Price (LKR): {item.product[0].price}</p>
                        <p className="order-card_head_qty"> Quantity : {item.product[0].qty} g</p>
                    </div>
                    
                </div>
                <div className="order-card_status">
                    <p className="order-card_head_status">Status : {item.status}</p>
                    <button onClick={()=>delivered_api(item.id)}>Mark As Delivered</button>
                </div>
        </div>

    );
    return (
        <div className="seller-orders">
            <h2>Orders</h2>
            {listItems}
        </div>
    )
}

export default Orders


