import React, {useState, useEffect}  from 'react'
import { DataGrid } from '@material-ui/data-grid';
import {Link} from 'react-router-dom';
import './css/Products.css'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CustomizedDialogs from './popup/popup';
import MiniDialogs from './popup/minipopup ';
import Addnew from './Addnew';
import axios from 'axios';
import swal from '@sweetalert/with-react'
import {getusername} from '../../Session/Session';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Products() {

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
                axios.delete('https://shopqapi.herokuapp.com/product/'+productid)
                .then((res)=>{
                    console.log(res);
                })
                .catch((err)=>{
                    console.log(err);
                })
              swal("Product has been Deleted!", {
                icon: "success",
              });
            } else {
              swal("Product not Deleted!");
            }
          });
        //console.log(productid);
        
    }
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
            width: 500 },
        {
          field: 'price',
          headerName: 'Current price ($)',
          width: 200,
        },
        {
            field: 'qty',
            headerName: 'Available quantity',
            width: 200,
        },
        {
          field: 'status',
          headerName: 'Status',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
        },
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            width: 260,
            renderCell: (params)=>{
                return(
                    <><Link to={"/item/"+params.row.id} target="_blank">
                        <button className="dashboard-view">VIEW</button>
                    </Link>
                        <MiniDialogs title="Edit Product">
                            <Addnew id={params.row.id}></Addnew>
                        </MiniDialogs>
                        
                    
                        <DeleteOutlineIcon onClick={delete_api.bind(this,params.row.id)} className="dashboard-delete"/>
                    </>
                );
            }
          },
    ];
      
    const [items, setitem] = useState([]);
    useEffect(()=>{
        showLoading();
        axios.get('https://shopqapi.herokuapp.com/seller/user/'+getusername())
        .then((res)=>{
            //console.log(res.data.store);
            //setitem(res.data);
            axios.get('https://shopqapi.herokuapp.com/product/store/'+res.data.store.storeid)
            .then((res1)=>{
                //console.log(res1.data);
                setitem(res1.data);
                swal.close()
            })
            .catch((err1)=>{
                console.log(err1);
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
        <div className="seller-products">
            <div className="products-grid">
                <div className="head">
                    <h1 className="headname">Products</h1>
                    <div className="creat">
                        <CustomizedDialogs title="Add new Product">
                            <Addnew></Addnew>
                        </CustomizedDialogs>
                    </div>
                </div>
                
                <div style={{ height: 700, width: '100%' }}>
                <DataGrid rows={items} disableSelectionOnClick columns={columns} pageSize={10} checkboxSelection />
                </div>
            </div>
        </div>
    )
}
