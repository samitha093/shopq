import React, {useState, useEffect}  from 'react'
import axios from 'axios';
import swal from '@sweetalert/with-react'
import CircularProgress from '@material-ui/core/CircularProgress';
import '../Styles/Checkout.css';
import { composeClasses, DataGrid } from '@material-ui/data-grid';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';
import {getusername} from '../Session/Session';
const Checkout = (props) => {
    const [checkoutproduct, setitems] = useState([]);
    const [Products, setitem] = useState([]);
    const[Amount,setamount] = useState(0);
    const history = useHistory();
    useEffect(()=>{
        //showLoading();
        setitems(props.location.state);
            if(props.location.state.items.length === 1){
                showLoading();
                axios.get('https://shopqapi.herokuapp.com/product/'+props.location.state.items[0].productid)
                .then((res)=>{
                    const data = {
                        id:res.data.id,
                        img:res.data.img,
                        title:res.data.title,
                        qty:props.location.state.items[0].qty,
                        price:res.data.price*(props.location.state.items[0].qty/1000),
                        shop:res.data.store
                    };
                    setamount(Amount + res.data.price*(props.location.state.items[0].qty/1000));
                    setitem(err=>[...Products,data]);
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
            }else{
                //setamount(Amount + res.data.price*(props.location.state.items[0].qty/1000));
                setitem(props.location.state.items);
                setamount(props.location.state.items.reduce((total, currentValue) => total = total + currentValue.price,0));
            }

        
        
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

    const columns = [
        { 
            field: 'img', 
            headerName: 'Product', 
            width: 150 ,
            renderCell : (params)=>{
                return(
                    <div className="userlist">
                        <img src={params.row.img} alt="" className="userlistimg"/>
                    </div>
                )
            }
        },
        { 
            field: 'title',
            headerName: 'Name', 
            width: 200 
        },
        {
            field: 'qty',
            headerName: 'quantity(g)',
            width: 150,
        },
        {
          field: 'price',
          headerName: 'Price (LKR)',
          width: 150,
        },
        
        
    ];

    const Products1 = [
        { 
            id:"2",
            img:"",
            title:"",
            qty:"",
            price:""
        },
        { 
            id:"3",
            img:"",
            title:"",
            qty:"",
            price:""
        }
    ];
    async function pay_api() {
        //showLoading();
        //console.log(Products.length);
        if(Products.length === 1){
            //console.log(Products[0]);
            const  item = {
                title: Products[0].title,
                img: Products[0].img,
                price: Products[0].price,
                qty: Products[0].qty,
                id: Products[0].id,
                store: Products[0].shop,
            }
            const  Address = {
                fullname: name,
                street: street,
                city: city,
                district: district,
            }
            const  order = {
                store : Products[0].shop,
                buyer : getusername(),
                status : "Pending",
                product:item,
                address:Address
            }
            //console.log(order);
            showLoading();
            const url = 'https://shopqapi.herokuapp.com/order/add';
            axios.post(url,order)
                .then((res)=>{
                    if(checkoutproduct.items[0].id){
                        axios.delete('https://shopqapi.herokuapp.com/cart/'+checkoutproduct.items[0].id);
                    }

                    axios.get('https://shopqapi.herokuapp.com/product/'+Products[0].id)
                        .then((res)=>{
                            //console.log(res.data)
                            const  itemupdate = {
                                title: res.data.title,
                                img: res.data.img,
                                price: res.data.price,
                                qty: res.data.qty - (Products[0].qty/1000),
                                status:res.data.status,
                                store: res.data.store,
                            }
                            const url = 'https://shopqapi.herokuapp.com/product/update/'+ Products[0].id;
                            axios.post(url,itemupdate)
                            .then((res)=>{
                                swal.close();
                                swal({
                                    title: "Order successfully Placed  !",
                                    text: "Thank You",
                                    icon: "success",
                                })
                                .then((value) => {
                                    history.push("/"); 
                                  })
                            })
                        })
                })
                .catch((err)=>{
                    swal.close();
                    swal({
                        title: "Something went to wrong!",
                        text: "Please Login to your Account",
                        icon: "error",
                    });
                }) 
                setName("");
                setStreet("");
                setCity("");
                setDistrict("");  
        }else{
            //swal.close();
            swal({
                title: "Something went to wrong!",
                text: "Please try again later",
                icon: "error",
            });
        }
        //swal.close();
            
            // axios.delete('https://shopqapi.herokuapp.com/cart/'+checkoutproduct.);       
    }
    const [name, setName] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");

    return (
        <div className="checkout-background">
            <div className="checkout-address">
                <h2>Shopping Cart</h2>
                <div style={{ height: "700px", width: '100%' }}>
                    <DataGrid rows={Products} disableSelectionOnClick columns={columns} pageSize={10} checkboxSelection />
                </div>
            </div>
            <div className="checkout-list">
                <h2>Shipping Info</h2>
                <div>
                    <h3>Total Bill (LKR) : {Amount}</h3>
                </div>
                <TextField className="textbox" value={name} onChange={(e)=>setName(e.target.value)} id="1" label="Full Name" />
                <TextField className="textbox" value={street} onChange={(e)=>setStreet(e.target.value)} id="2" label="Street Address" />
                <TextField className="textbox" value={city} onChange={(e)=>setCity(e.target.value)} id="3" label="City" />
                <TextField className="textbox" value={district} onChange={(e)=>setDistrict(e.target.value)} id="4" label="Districts" />
                <div className="space"></div>
                <TextField className="textbox" id="5" label="Card Number" />
                <div className="carddata">
                <TextField className="textbox" id="6" label="Exp date" />
                <TextField className="textbox" id="7" label="CVV" />
                </div><div className="carddata">
                <button onClick={pay_api} className="submit-btn">Pay Now</button>
                </div>

            </div>
        </div>
    )
}

export default Checkout
