import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux";
import { delAllCart } from "../redux/action";
import { Getauth, Removeauth } from '../services/Auth'
import { setHeader } from '../services/Header'
import axios from 'axios'

const Navbar = () => {
    const state = useSelector(state => state.handleCart)
    const [userAuth, setUserAuth] = useState(false)
    const dispatch = useDispatch();
    const apiUrl = process.env.REACT_APP_BASE_URL


    useEffect(() => {
        const auth = Getauth()
        if (auth) {
            checkprelogin()
        }
    }, [userAuth])

    async function checkprelogin() {
        try {
            const user = await axios.get(`${apiUrl}/api/v1/user/checkauth`, setHeader())
            if (user.data) {
                setUserAuth(true)
            }
        } catch (error) {
            console.log(error);
        }
    }


    const logoutUser = () => {
        Removeauth()
        dispatch(delAllCart());
        setUserAuth(false)
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/"> E-COMM PLATFORM</NavLink>
                <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/product">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                    </ul>
                    <div className="buttons text-center">
                        {!userAuth ? <><NavLink to="/login" className="btn btn-outline-dark m-2"><i className="fa fa-sign-in mr-1"></i> Login</NavLink>
                            <NavLink to="/register" className="btn btn-outline-dark m-2"><i className="fa fa-user-plus mr-1"></i> Register</NavLink></> : ""}
                        <NavLink to="/cart" className="btn btn-outline-dark m-2"><i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length}) </NavLink>
                        {userAuth ? <NavLink to="/" onClick={logoutUser} className="btn btn-outline-dark m-2"><i className="fa fa-sign-out mr-1"></i> Log Out</NavLink> : ""}
                    </div>
                </div>

            </div>
        </nav>
    )
}

export default Navbar