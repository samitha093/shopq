import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../Styles/Home.css';
import axios from 'axios';
import swal from '@sweetalert/with-react'
import Item from './Item';
import { Link } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
const Home = () => {

    const [Product_data, setitem] = useState([]);
    useEffect(()=>{
        showLoading()
      axios.get('https://shopqapi.herokuapp.com/product/')
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
        <div className="home-background">
            {listItems}
        </div>
    )
}

export default Home

