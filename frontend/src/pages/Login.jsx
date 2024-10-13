import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import toast from "react-hot-toast";
import { Setauth, Getauth } from "../services/Auth";
import axios from "axios"
import { setHeader } from "../services/Header";
import { CartUpdate } from "../services/CartUpdate";

const Login = () => {

  const [errmsg, setErrmsg] = useState(false)
  const email = useRef();
  const password = useRef();
  const history = useNavigate()
  const apiUrl = process.env.REACT_APP_BASE_URL

  const dispatch = useDispatch();



  useEffect(() => {
    const auth = Getauth()
    if (auth) {
      checkprelogin()
    }
  }, [errmsg])

  async function checkprelogin() {
    try {
      const user = await axios.get(`${apiUrl}/api/v1/user/checkauth`, setHeader())
      if (user.data) {
        history("/")
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getuserCartfromServer() {
    try {
      const result = await axios.get(`${apiUrl}/api/v1/cart`, setHeader())
      result.data.forEach(e => {
        const { qty } = e;
        for (let i = 0; i < qty; i++) {
          dispatch(addCart(e));
        }
      });
      CartUpdate()

    } catch (error) {
      console.log(error);
    }


  }



  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const user = {
        email: email.current.value,
        password: password.current.value
      }
      const result = await axios.post(`${apiUrl}/api/v1/user/login`, user);
      toast.success("Login successfully.");
      Setauth(result.data.token)
      getuserCartfromServer()
      history("/");
    } catch (err) {
      setErrmsg(true)
    }
  }

  const errorHandle = () => {
    setErrmsg(false)
  }

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div class="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={submitHandle}>
              {errmsg ? <span className="text-danger">Invalid Credentials!</span> : ""}
              <div class="my-3">
                <label for="display-4">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  ref={email}
                  onClick={errorHandle}
                  id="floatingInput"
                  placeholder="name@example.com"
                />
              </div>
              <div class="my-3">
                <label for="floatingPassword display-4">Password</label>
                <input
                  type="password"
                  class="form-control"
                  ref={password}
                  onClick={errorHandle}
                  id="floatingPassword"
                  placeholder="Password"
                />
              </div>
              <div className="my-3">
                <p>New Here? <Link to="/register" className="text-decoration-underline text-info">Register</Link> </p>
              </div>
              <div className="text-center">
                <button class="my-2 mx-auto btn btn-dark" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
