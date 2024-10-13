import {useRef, useState, useEffect} from 'react'
import { Footer, Navbar } from "../components";
import { Link, useNavigate } from 'react-router-dom';
import { Getauth } from '../services/Auth';
import { setHeader } from '../services/Header';
import toast from "react-hot-toast";
import axios from "axios"

const Register = () => {
    
    const [errmsg, setErrmsg] = useState(false)
    const name = useRef();
    const email = useRef();
    const password = useRef();
    const history = useNavigate();


    useEffect(()=>{
        const auth = Getauth()
        if(auth){
        checkprelogin()
        }
    },[errmsg])
    
    async function checkprelogin(){
      try {
          const user = await axios.get(`${REACT_APP_BASE_URL}/api/v1/user/checkauth`,setHeader())
          console.log(user);
          if(user.data){
              history("/")
          }
      } catch (error) {
          console.log(error);
      }
    }


    const clickHandle = async(e)=>{
        e.preventDefault();
            const user = {
                name: name.current.value,
                email: email.current.value,
                password: password.current.value
            }
            try {
                const result = await axios.post(`${REACT_APP_BASE_URL}/api/v1/user/register`, user);
                if(result.status === 200){
                toast.success("Registered successfully.");
                history("/login")}
                else{
                    toast.error("Somthing went wrong.");
                }
            } catch (err) {
                console.log(err);
            }
        
    }

    const onblurHandle = async()=>{
        try {
            const result = await axios.get(`${REACT_APP_BASE_URL}/api/v1/user/check-email/${email.current.value}`)
            result.data?setErrmsg(true):setErrmsg(false);
            console.log(result);
        } catch (error) {
            console.log(error);
        }
        
    }

    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Register</h1>
                <hr />
                <div class="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form onSubmit={clickHandle}>
                            <div class="form my-3">
                                <label for="Name">Full Name</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    ref={name}
                                    id="Name"
                                    minLength={3} 
                                    required
                                    placeholder="Enter Your Name"
                                />
                            </div>
                            <div class="form my-3">
                                <label for="Email">Email address</label>
                                <input
                                    type="email"
                                    class="form-control"
                                    ref={email}
                                    id="Email"
                                    placeholder="name@example.com"
                                    onBlur={onblurHandle} 
                                    onFocus={()=>(setErrmsg(false))}
                                    required
                                />
                                {errmsg?<span className="text-danger">Email is already registered!</span>:""}
                            </div>
                            <div class="form  my-3">
                                <label for="Password">Password</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    ref={password}
                                    id="Password"
                                    placeholder="Password"
                                    minLength={6} 
                                    required
                                />
                            </div>
                            <div className="my-3">
                                <p>Already has an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link> </p>
                            </div>
                            <div className="text-center">
                                <button class="my-2 mx-auto btn btn-dark" type="submit">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Register