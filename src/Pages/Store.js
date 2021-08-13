import {useParams} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import '../Styles/Home.css';
import '../Styles/Store.css';
import axios from 'axios';
import swal from '@sweetalert/with-react'
import CircularProgress from '@material-ui/core/CircularProgress';
import { getusername } from '../Session/Session';
const Store = () => {
    const {id} = useParams()
    const [storename, setstorename] = useState([]);
    const [Product_data, setitem] = useState([]);
    useEffect(()=>{
        showLoading()
      axios.get('https://shopqapi.herokuapp.com/product/store/v/'+ id)
            .then((res)=>{
                //console.log(res1.data);
                setitem(res.data);
                swal.close()
            })
            .catch((err)=>{
                //console.log(err);
                swal.close();
                    swal({
                        title: "Something went to wrong!",
                        text: "Please Try Again",
                        icon: "error",
                    });
            })
            axios.get('https://shopqapi.herokuapp.com/seller/user/'+ getusername())
            .then((res)=>{
                //console.log(res.data.store.storename);
                setstorename(res.data.store.storename);
            })
    },[])
    
    const history = useHistory();
    async function item_click(value){
        history.push("/item/"+ value)
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

      const listItems = Product_data.map((item) =>
        <div onClick={()=>item_click(item.id)} className="card" key={item.id}>
                <div className="card_img">
                    <img className="card_img_img" src={item.img}/>
                </div> 
                <div className="card_header">
                    <p className="card_head_title">{item.title}</p>
                    <p className="card_head_price">{item.price}</p>
                </div>
        </div>

    );
    return (
        <di>
            <div className="shop-head-container">
                <div className="shop-head">
                    <h1> {storename}</h1>
                    <div>
                    <button className="item-shopbtn btn">Contact Seller</button>
                    </div>
                </div>
            </div>
            <div className="home-background">
                {listItems}
            </div>
        </di>
        
    )
}

export default Store
