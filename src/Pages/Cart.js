import '../Styles/Cart.css';
import React, {useState, useEffect}  from 'react'
import { useHistory } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from '@sweetalert/with-react'
import {getusername} from '../Session/Session';
const Cart = () => {
    const columns = [
        { 
            field: 'img', 
            headerName: 'Photo', 
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
            headerName: 'Title', 
            width: 300 },
        {
          field: 'price',
          headerName: 'Price ($)',
          width: 150,
        },
        {
            field: 'qty',
            headerName: 'quantity',
            width: 150,
        },
        {
            field: 'action',
            headerName: 'Remove',
            sortable: false,
            width: 260,
            renderCell: (params)=>{
                return(
                    <>
                    <DeleteOutlineIcon onClick={delete_api.bind(this,params.row.id)} className="dashboard-delete"/>
                    </>
                );
            }
          },
    ];
    const history = useHistory();
    async function gotocheckout(){
        history.push({
            pathname: '/checkout',
            state: { 
                items: items,
            }
        });
    }
     const [items, setitem] = useState([]);
    useEffect(()=>{  
        axios.get('http://localhost:5000/cart/'+getusername())
        .then(async (res)=>{
            setitem(res.data);
        })
        .catch((err)=>{
            console.log(err);
            swal({
                title: "Something went to wrong!",
                text: "Please Try Again",
                icon: "error",
            });
        })
    },[])
    

    async function delete_api(productid){
        
        swal({
            title: "Are you sure?",
            text: "Once deleted, your Product nor Longer!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete('http://localhost:5000/cart/'+productid)
                .then((res)=>{
                   // console.log(res);
                   axios.get('http://localhost:5000/cart/'+getusername())
                    .then(async (res)=>{
                        setitem(res.data);
                    })
                    .catch((err)=>{
                        console.log(err);
                        swal({
                            title: "Something went to wrong!",
                            text: "Please Try Again",
                            icon: "error",
                        });
                    })
                })
                .catch((err)=>{
                    console.log(err);
                })
              swal("Product has been Deleted!", {
                icon: "success",
              });
            }
          });
        
    }


    return (
        <div className="cart-background">
            <div className="cart-list">
                <div style={{ height: "500px", width: '100%' }}>
                    <DataGrid rows={items} disableSelectionOnClick columns={columns} pageSize={10} checkboxSelection />
                </div>
            </div>
            <button onClick={gotocheckout} className="checkout">Checkout</button>
            
        </div>
    )
}

export default Cart
