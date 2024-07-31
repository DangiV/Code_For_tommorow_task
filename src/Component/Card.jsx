import React, { useEffect, useState } from 'react';
import { TablePagination } from '@mui/material';
import '../assets/style/card.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, removeItem } from '../redux/feature/cartSlice';

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
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.allCart);

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
    });
    const [view, setView] = useState('card');

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleRemoveItem = (id) => dispatch(removeItem(id));

    const handleChangeUser = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isFormIncomplete = Object.values(user).some(value => value === "");
        if (isFormIncomplete) {
            alert('Please enter complete details');
        } else {
            console.log("Form submitted", user);
            setUser({
                fname: "",
                lname: "",
                address: "",
                email: "",
                country: "",
                number: ""
            });
            alert("Form submitted");
            handleClose();
        }
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <div>
                            <h2>View Toggle</h2>
                            <div className="cont">
                                <div className="toggle">
                                    <button onClick={() => setView('card')}>Card</button>
                                    <button onClick={() => setView('list')}>List</button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2>Have a feedback</h2>
                            <h6 className='feedBack' onClick={handleOpen}>We are listening</h6>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className='container'>
                            {view === 'card' ? (
                                <div className='row'>
                                    {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
                                        <div className="card col-4" style={{ marginTop: '20px' }} key={item.id}>
                                            <div className="card-body">
                                                <div className='d-flex'>
                                                    <h5 className="card-title">{item.title}</h5>
                                                    <p style={{ cursor: 'pointer' }} onClick={() => handleRemoveItem(item.id)}>&#x2716;</p>
                                                </div>
                                                <p className="card-text">{item.body}</p>
                                            </div>
                                            <img className="" style={{ height: '120px', width: '120px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLwzhli3UiGlUsTtOAoxA_f4dKRDG9DGa99w&s" alt="Card" />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className='row'>
                                    {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
                                        <div className='listParent mt-5' key={item.id}>
                                            <img className='listimg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLwzhli3UiGlUsTtOAoxA_f4dKRDG9DGa99w&s" alt="Not found" />
                                            <div className='TxtParent'>
                                                <h4>{item.title}</h4>
                                                <p>{item.body}</p>
                                            </div>
                                            <p style={{ cursor: 'pointer', marginTop: '-50px' }} onClick={() => handleRemoveItem(item.id)}>&#x2716;</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <TablePagination
                                rowsPerPageOptions={[6, 10, 15]}
                                component="div"
                                count={products.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Modal open={open} onClose={handleClose} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
                <Box sx={style}>
                    <h4 id="parent-modal-title">Thank you so much for taking the time!</h4>
                    <p>Please fill in the details below</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-outline mb-4">
                            <input type="text" id="fname" name='fname' value={user.fname} onChange={handleChangeUser} placeholder='Jon' className="form-control" />
                            <label className="form-label" htmlFor="fname">First Name</label>
                        </div>
                        <div className="form-outline mb-4">
                            <input type="text" id="lname" name='lname' value={user.lname} onChange={handleChangeUser} placeholder='Wick' className="form-control" />
                            <label className="form-label" htmlFor="lname">Last Name</label>
                        </div>
                        <div className="form-outline mb-4">
                            <textarea className="form-control" id="address" name='address' value={user.address} onChange={handleChangeUser} placeholder='Enter your full address' rows={4} />
                            <label className="form-label" htmlFor="address">Address</label>
                        </div>
                        <div className="form-outline mb-4">
                            <input type="text" id="country" name='country' value={user.country} onChange={handleChangeUser} placeholder='India' className="form-control" />
                            <label className="form-label" htmlFor="country">Country</label>
                        </div>
                        <div className="form-outline mb-4">
                            <input type="email" id="email" name='email' value={user.email} onChange={handleChangeUser} placeholder='Email address' className="form-control" />
                            <label className="form-label" htmlFor="email">Email address</label>
                        </div>
                        <div className="form-outline mb-4">
                            <input type="number" id="number" name='number' value={user.number} onChange={handleChangeUser} placeholder='1234569874' className="form-control" />
                            <label className="form-label" htmlFor="number">Number</label>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block mb-4">Submit feedback</button>
                    </form>
                </Box>
            </Modal>
        </>
    );
};

export default Card;