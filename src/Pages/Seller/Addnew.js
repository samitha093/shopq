import { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import {getusername} from '../../Session/Session';
import axios from 'axios';
import swal from '@sweetalert/with-react'
import './css/Products.css'
const useStyles = makeStyles((theme) => ({
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));
const Addnew = (props) => {
    
    const classes = useStyles();
    const [open, setOpen] =useState(false);
    const handleChange = (event) => {
        setstatus(event.target.value);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    
    const handleOpen = () => {
        setOpen(true);
    };

    async function test(){

    }

    const [Title, settitle] = useState("");
    const [Img, setimg] = useState("");
    const [Price, setprice] = useState("");
    const [Qty, setqty] = useState("");
    const [Status, setstatus] = useState("");
    const [User, setuser] = useState("");

    async function add_api(){
        if(props.id){
            const updatedata = {
                title : Title,
                img :Img,
                price : Price,
                qty : Qty,
                status : Status,
            };
            settitle("");
            setimg("");
            setprice("");
            setqty("");
            setstatus("");
            const url2 = 'http://localhost:5000/product/update/' + props.id;
            axios.post(url2,updatedata)
                .then((res)=>{
                    swal({
                        title: "Update Success!",
                        text: "Your Product is updated",
                        icon: "success",
                    });
                })
                .catch((err)=>{
                    swal({
                        title: "Something went to wrong!",
                        text: "Please Try Again Later",
                        icon: "error",
                    });
                })
        }else{
            const url = 'http://localhost:5000/seller/login';
            const useritem = {
                storeuser : getusername()
            };
            axios.post(url,useritem)
                .then((res)=>{
                    //setstore(res.data.store.storeid);

                    const registerseller = {
                        title : Title,
                        img :Img,
                        price : Price,
                        qty : Qty,
                        status : Status,
                        store : res.data.store.storeid
                    };
                    settitle("");
                    setimg("");
                    setprice("");
                    setqty("");
                    setstatus("");
                    const url2 = 'http://localhost:5000/product/add';
                    axios.post(url2,registerseller)
                        .then((res)=>{
                            swal({
                                title: "Product Save Success!",
                                text: "Product is on System",
                                icon: "success",
                            });
                        })
                        .catch((err)=>{
                            swal({
                                title: "Something went to wrong!",
                                text: "Please Try Again Later",
                                icon: "error",
                            });
                        })

                })
                .catch((err)=>{
                    swal({
                        title: "Something went to wrong!",
                        text: "Please Try Again",
                        icon: "error",
                    });
                })
        }   
        
    }

    useEffect(()=>{
        //setuser(props.id);
        //console.log(props.id);
        //settitle(props.id);
        if(props.id){
            axios.get('http://localhost:5000/product/'+props.id)
            .then((res)=>{
                //console.log(res.data.title);
                settitle(res.data.title);
                setimg(res.data.img);
                setprice(res.data.price);
                setqty(res.data.qty);
                setstatus(res.data.status);
            })
            .catch((err)=>{
                console.log(err);
            })
        }
       
    },[])

    return (
        <div>
            <div className="addnewform">
            <TextField  label="Product Title" value={Title} onChange={(e)=>settitle(e.target.value)} id="filled-size-normal"  variant="filled" style = {{width: '100%'}} />
            </div>
            <div className="addnewform">
            <TextField label="Image Url" value={Img} onChange={(e)=>setimg(e.target.value)} id="filled-size-normal"  variant="filled" style = {{width: '100%'}} />
            </div>
            <div className="addnewform">
            <TextField label="Price ($/Kg)" value={Price} onChange={(e)=>setprice(e.target.value)} id="filled-size-normal"  variant="filled" style = {{width: '100%'}} />
            </div>
            <div className="addnewform">
            <TextField label="Stock (Kg)" value={Qty} onChange={(e)=>setqty(e.target.value)} id="filled-size-normal"  variant="filled" style = {{width: '100%'}} />
            </div>
            <div className="end">
                <div className="left">
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-controlled-open-select-label">Status</InputLabel>
                        <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={Status}
                        defaultValue= {Status}
                        onChange={handleChange}
                        >
                        <MenuItem value="">
                        </MenuItem>
                        <MenuItem value={"Active"}>Active</MenuItem>
                        <MenuItem value={"Disable"}>Out of Stock</MenuItem>
                        <MenuItem value={"Unsalable"}>Unpublish</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <button onClick={add_api} className="button">Save Product</button>
                
            </div>

        </div>
    )
}

export default Addnew
