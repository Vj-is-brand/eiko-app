import React, { useState } from 'react';

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repassword, setRepassword] = useState('')
  const [message,setMessage] =useState('')
  function handleForm(e) {
    e.preventDefault();
    const data = { name, email, password, repassword }
   fetch('../api/reg',{
    method:"POST",
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(data)
   }).then((result)=>{return result.json()}).then((data)=>{
    console.log(data)
    if(data.status===201){
      setMessage(data.message)
    }else{
      setMessage(data.message)
    }
   })
  
    // Add your form submission logic here
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
                    Register
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="untree_co-section">
        <div className="container">
          <div className="row mb-5 justify-content-center">
            <div
              className="col-lg-5 mx-auto order-1"
              data-aos="fade-up"
              data-aos-delay={200}
            >
              <form onSubmit={(e) => { handleForm(e) }} action="#" className="form-box">
                <div className="row">
                  <div className='col-12 mb-2 text-center text-danger'>
                  <p >{message}</p>
                  </div>
                  <div className="col-12 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full name"
                      value={name}
                      onChange={(e) => { setName(e.target.value) }}
                    />
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
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Re-type Password"
                      value={repassword}
                      onChange={(e) => { setRepassword(e.target.value) }}
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <label className="control control--checkbox">
                      <span className="caption">
                        Accept our <a href="/terms-and-conditions">terms and conditions</a>
                      </span>
                      <input type="checkbox" defaultChecked="checked" />
                      <div className="control__indicator" />
                    </label>
                  </div>

                  <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                      Register
                    </button>
                  </div>

                  <span className='mt-2'>If you already have account <a href='/login'> Login Here</a></span>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Register;
