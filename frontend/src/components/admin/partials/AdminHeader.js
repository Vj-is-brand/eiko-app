import { Link } from 'react-router-dom';


function Header() {
    return ( 
        <section className="header mb-3">
                       
                        <header className="border-bottom">
                            <nav className="navbar navbar-expand-lg navbar-dark">
                                <div className="container">
                                    <button
                                        className="navbar-toggler"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#navbarScroll"
                                        aria-controls="navbarScroll"
                                        aria-expanded="false"
                                        aria-label="Toggle navigation"
                                    >
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <Link className="navbar-brand" to="/dashboard">
                                        <img src="./images/goldcroplogo.svg" alt="" />
                                    </Link>
                                    <div className="d-flex header-icons d-lg-none">
                                        <Link to="/cart">
                                            <i className="bi bi-bag-heart"></i>
                                        </Link>
                                        <Link to="/profile">
                                            <i className="bi bi-person"></i>
                                        </Link>
                                    </div>
                                    <div className="collapse navbar-collapse" id="navbarScroll">
                                        <ul className="navbar-nav mx-auto my-2 my-lg-0 navbar-nav-scroll" style={{ '--bs-scroll-height': 'auto' }}>
                                            <li className="nav-item">
                                                <a className="nav-link active" aria-current="page" to="/">
                                                    Admin Dashboard
                                                </a>
                                            </li>
                                        </ul>
                                        <form className="d-flex me-2">
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search..."
                                                    aria-label="Input group example"
                                                    aria-describedby="btnGroupAddon"
                                                />
                                                <div className="input-group-text" id="btnGroupAddon">
                                                    <i className="bi bi-search"></i>
                                                </div>
                                            </div>
                                        </form>
                                        
                                    </div>
                                </div>
                            </nav>
                        </header>
                    </section>
     );
}

export default Header;