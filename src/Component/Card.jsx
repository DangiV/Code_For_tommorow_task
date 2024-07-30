import React, { useEffect, useState } from 'react'
import { makeApi } from '../Helper/ApiCall';
import { TablePagination } from '@mui/material';
import '../assets/style/card.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const Card = () => {
    const [details, setDetails] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(6);
    const [page, setPage] = useState(0);
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState({
        fname: "",
        lname: "",
        address: "",
        email: "",
        country: "",
        number: ""
    })

    const [checked, setChecked] = useState('card')

    console.log("checked", checked)

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const getData = async () => {
        try {
            const response = await makeApi('get', "https://jsonplaceholder.typicode.com/posts");
            // console.log(response)
            setDetails(response)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    //remove item from list but after refresh it will get auto come
    const removeItem = (id) => {
        console.log(id);
        const afterFilterData = details.filter((item) => item.id !== id);
        console.log("after delte", afterFilterData);
        setDetails(afterFilterData)
    }

    //function to get value of user details
    const handleChangeUser = (e) => {
        const { name, value } = e.target;
        setUser((preVal) => ({
            ...preVal,
            [name]: value
        }))
    }

    //submit form and get value 
    const handleSumbit = (e) => {
        e.preventDefault();
        if (user.fname !== "" && user.lname !== "" && user.address !== "" && user.email !== "" && user.country !== "" && user.number !== "") {
            alert('please enter complte details')
            return;
        } else {
            console.log("after form submit", user);
            setUser(" ")
            alert("form submitted");
            handleClose();
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <div>
                            <h2>View Toggle</h2>

                            <div className="cont">
                                <div className="toggle">
                                    <button onClick={() => setChecked('card')}>card</button>
                                    <button onClick={() => setChecked('list')}>list</button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2>Have a feedback</h2>
                            <h6 className='feedBack' onClick={() => handleOpen()}>We are listing</h6>
                        </div>
                    </div>


                    <div className="col-9">
                        <div className='container'>
                            {checked === 'card' ? <div className='row'>
                                {
                                    details.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => {
                                        return (
                                            <div className="card col-4" style={{ marginTop: '20px' }} key={item.id}>
                                                <div className="card-body">
                                                    <div className='d-flex'>
                                                        <h5 className="card-title">{item.title}</h5>
                                                        <p style={{ cursor: 'pointer' }} onClick={() => removeItem(item.id)}>&#x2716;</p>
                                                    </div>
                                                    <p className="card-text">{item.body}</p>
                                                </div>
                                                <img className="" style={{ height: '120px', width: '120px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLwzhli3UiGlUsTtOAoxA_f4dKRDG9DGa99w&s" alt="Card image cap" />
                                            </div>
                                        )
                                    })
                                }
                            </div> : <div className='row'>
                                {
                                    details.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => {
                                        return (
                                            <div className='listParent mt-5' key={item.id}>
                                                <img className='listimg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLwzhli3UiGlUsTtOAoxA_f4dKRDG9DGa99w&s" alt="not found" />
                                                <div className='TxtParent'>
                                                    <h4>{item.title}</h4>
                                                    <p>{item.body}</p>
                                                </div>
                                                <p  style={{ cursor: 'pointer', marginTop:'-50px' }} onClick={() => removeItem(item.id)}>&#x2716;</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>}

                            <TablePagination
                                rowsPerPageOptions={[6, 10, 15]}
                                component="div"
                                count={details.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <Modal open={open} onClose={handleClose} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
                    <Box sx={{ ...style }}>
                        <h4 id="parent-modal-title">Thank you for so much for taking the time!</h4>
                        <p>Please fill the below details</p>
                        <form onSubmit={handleSumbit}>
                            <div className="form-outline mb-4">
                                <input type="text" id="fname" name='fname' value={user.fname} onChange={handleChangeUser} placeholder='jon' className="form-control" />
                                <label className="form-label" htmlFor="form4Example1">
                                    first  Name
                                </label>
                            </div>

                            <div className="form-outline mb-4">
                                <input type="text" placeholder='wick' id="fname" name='lname' value={user.lname} onChange={handleChangeUser} className="form-control" />
                                <label className="form-label" htmlFor="form4Example1">
                                    last  Name
                                </label>
                            </div>

                            <div data-mdb-input-init="" className="form-outline mb-4">
                                <textarea className="form-control" placeholder='enter your full address'
                                    id="fname" name='address' value={user.address} onChange={handleChangeUser}
                                    rows={4}
                                />
                                <label className="form-label" htmlFor="form4Example3">
                                    address
                                </label>
                            </div>

                            <div className="form-outline mb-4">
                                <input type="text" placeholder='india' id="country" name='country' value={user.country} onChange={handleChangeUser} className="form-control" />
                                <label className="form-label" htmlFor="form4Example1">
                                    country
                                </label>
                            </div>

                            <div data-mdb-input-init="" className="form-outline mb-4">
                                <input type="email" id="email" name='email' value={user.email} onChange={handleChangeUser} className="form-control" />
                                <label className="form-label" htmlFor="form4Example2">
                                    Email address
                                </label>
                            </div>

                            <div className="form-outline mb-4">
                                <input type="number" placeholder='1234569874' id="number" name='number' value={user.number} onChange={handleChangeUser} className="form-control" />
                                <label className="form-label" htmlFor="form4Example1">
                                    number
                                </label>
                            </div>

                            <button type="submit" className="btn btn-primary btn-block mb-4">submit feedback</button>
                        </form>

                    </Box>
                </Modal>
            </div>

        </>
    )
}

export default Card
