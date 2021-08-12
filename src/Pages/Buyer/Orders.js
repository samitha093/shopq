import React, {useState, useEffect}  from 'react'
import { DataGrid } from '@material-ui/data-grid';
import {getusername} from '../../Session/Session';
import axios from 'axios';
import swal from '@sweetalert/with-react'
import CircularProgress from '@material-ui/core/CircularProgress';
import './css/Orders.css'
function Orders() {


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
            width: 500 
        },
        {
            field: 'qty',
            headerName: 'Available quantity',
            width: 200,
        },
        {
            field: 'price',
            headerName: 'Current price ($)',
            width: 200,
          },
        {
          field: 'status',
          headerName: 'Status',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
        },
    ];
    const [items, setitem] = useState([]);
    useEffect(()=>{
        showLoading();
        axios.get('https://shopqapi.herokuapp.com/order/user/'+getusername())
        .then((res)=>{
            swal.close();
            console.log(res.data.orders);
            setitem(res.data.orders);
        })
        .catch((err1)=>{
            console.log(err1);
            swal.close();
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

    return (
        <div className="user-orders">
            <h2>order</h2>
        </div>
    )
}

export default Orders
