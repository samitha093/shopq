import {useParams} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import React, {useState, useEffect}  from 'react'
import axios from 'axios';
import swal from '@sweetalert/with-react'
import CircularProgress from '@material-ui/core/CircularProgress';
import '../Styles/Item.css';
import {getusername} from '../Session/Session';
const Item = (props) => {
    const {id} = useParams()
    //console.log(id);
    //<h1>item : {id}</h1>
    const [items, setitem] = useState([]);
    const [store, setstore] = useState([]);
    useEffect(()=>{
        showLoading();
        axios.get('http://localhost:8000/product/'+id)
        .then((res)=>{
            setitem(res.data);
            //console.log(items.store);
            axios.get('http://localhost:8000/seller/'+res.data.store)
            .then((res)=>{
                setstore(res.data.store);
                //console.log(res.data.store);
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
        //console.log(items.store);
        
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


    const history = useHistory();
    async function view_shop(){
        history.push("/store/"+items.store);
    }

    async function buynow(){
        const qty_s = items.qty;
        const qty_u = qty/1000;

        if(qty_s > qty_u){
            const checkout = [
                {
                    productid:items.id,
                    qty:Number(qty),
                },
            ]

            history.push({
                pathname: '/checkout',
                state: { 
                    items: checkout ,
                }
            });
        }else{
            swal({
                title: "Something went to wrong!",
                text: "There is not enough stock ",
                icon: "error",
            });
        }
    }

    async function add_cart(){

        const qty_s = items.qty;
        const qty_u = qty/1000;

        if(qty_s > qty_u){

            let cart = {
                title :items.title,
                productid :items.id,
                img :items.img,
                price : items.price*(Number(qty)/1000),
                qty :Number(qty),           
                username :getusername(),
                store :items.store,
                status :items.status,
            }
            //console.log(items);
            const url = 'http://localhost:8000/cart/add';
            axios.post(url,cart)
                .then((res)=>{
                    swal.close();
                    swal({
                        title: "Product added to cart successfully!",
                        text: "Now You Can Get it from Cart ",
                        icon: "success",
                    });
                })
                .catch((err)=>{
                    swal.close();
                    swal({
                        title: "Something went to wrong!",
                        text: "Please Login to your Account",
                        icon: "error",
                    });
                })

        }else{
            swal({
                title: "Something went to wrong!",
                text: "There is not enough stock ",
                icon: "error",
            });
        }
    }
    const [qty, setqty] = useState("5000");
    return (
        <div className="item">
            <div className="item-left">
                <img className="item_img" src={items.img}/>
            </div>
            <div className="item-right">
                <h1>{items.title}</h1>
                <h1>LKR {items.price} /Kg</h1>
                <p>simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic</p>
                <div className="itemcart">
                    <div className="dropdown">
                        <select id="item-drop" onChange={(e)=>setqty(e.target.value)}>
                            <option value="5000">5 Kg</option>
                            <option value="2000">2 Kg</option>
                            <option value="1000">1 Kg</option>
                            <option value="500">500 g</option>
                            <option value="250">250 g</option>
                        </select>
                    </div>
                    <div className="itembutton">
                        <button onClick={add_cart} className="addtocart">ADD to Cart</button>
                    </div>
                    <div className="itembuy">
                        <button onClick={buynow} className="buynow">Buy Now</button>
                    </div>
                </div>
                <div className="item-shop">
                    <div className="item-shop-left">
                        <h1>{store.storename} </h1>
                    </div>
                    <div className="item-shop-right">
                        <h6><button onClick={view_shop} className="item-shopbtn">View Shop</button></h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Item
