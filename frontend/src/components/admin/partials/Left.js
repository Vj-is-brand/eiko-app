import { Link } from "react-router-dom";

function Left() {
    return ( 
<>
<div className="col-md-3"> 
<Link  to='/productdash'> <button className="btn btn-secondary form-control p-3 mb-2"> Products Management</button></Link>
{/* <Link  to='/gallerymngt'> <button className="btn btn-secondary form-control p-3 mb-2"> Gallery Management</button></Link>
<Link  to='/aboutmngt'> <button className="btn btn-secondary form-control p-3 mb-2"> About Management</button></Link>
<Link  to='/querymngt'> <button className="btn btn-secondary form-control p-3 mb-2"> Query Management</button></Link>
<Link  to='/coursemngt'> <button className="btn btn-secondary form-control p-3 mb-2"> Course Management</button></Link> */}




</div>



</>
        );
}

export default Left;