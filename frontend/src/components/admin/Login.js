
import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Contextapi } from "../../contexts/Contextapi"

function Login() {
  const{setLoginname} =useContext(Contextapi)
  let navigate = useNavigate('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [login, setLogin] = useState('')
  function handleForm(e) {
    e.preventDefault()
    const data = { email, password }
    fetch('/api/logincheck', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then((result) => { return result.json() }).then((data) => {
      // console.log(data)
      if (data.status === 200 && data.email==='admin@gmail.com') {
        localStorage.setItem('loginname',data.email)
        setLoginname(localStorage.getItem('loginname'))
        navigate('/dashboard')
      } else if(data.status===200  && data.email!=='admin'){
        localStorage.setItem('loginname',data.email)
        setLoginname(localStorage.getItem('loginname'))
        navigate('/profile')
      }else{
        setMessage(data.message)
      }
    })
  }

  return (
    <>
      <div className="site-mobile-menu">
        <div className="site-mobile-menu-header">
          <div className="site-mobile-menu-close">
            <span className="icofont-close js-menu-toggle" />
          </div>
        </div>
        <div className="site-mobile-menu-body" />
      </div>


      <div
        className="untree_co-hero inner-page overlay"
        style={{ backgroundImage: 'url("images/explore-1.png")' }}
      >
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-12">
              <div className="row justify-content-center ">
                <div className="col-lg-6 text-center ">
                  <h1
                    className="mb-4 heading text-white"
                    data-aos="fade-up"
                    data-aos-delay={100}
                  >
                    Login
                  </h1>
                  <p>{message}</p>
                </div>
              </div>
            </div>
          </div>{" "}
          {/* /.row */}
        </div>{" "}
        {/* /.container */}
      </div>{" "}
      {/* /.untree_co-hero */}
      <div className="untree_co-section">
        <div className="container">
          <div className="row mb-5 justify-content-center">
            <div
              className="col-lg-5 mx-auto order-1"
              data-aos="fade-up"
              data-aos-delay={200}
            >
              <form 
              onSubmit={(e) => { handleForm(e) }}
                action="#" className="form-box">
                <div className="row">
                <div className='col-12 mb-2 text-center text-danger'>
                  <p >{message}</p>
                  </div>
                  <div className="col-12 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value) }}
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value) }}
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <label className="control control--checkbox">
                      <span className="caption">Remember me</span>
                      <input type="checkbox" defaultChecked="checked" />
                      <div className="control__indicator" />
                    </label>
                  </div>
                  <div className="col-12">
                    <input
                      type="submit"
                      defaultValue="Send Message"
                      className="btn btn-primary"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* /.untree_co-section */}


      {/* /.site-footer */}
      {/* <div id="overlayer" />
  <div className="loader">
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div> */}
    </>

  );
}

export default Login;