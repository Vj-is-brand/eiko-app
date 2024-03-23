import Header from "./partials/AdminHeader";
import Left from "./partials/Left"

function Admindash() {
    return (
        <>
        <Header/>
        <section className="dash">
            <div className="container"> 
            <div className="row">
                <Left/>
                <div className="col-md-8"> </div>

            </div>

            </div>
        </section>

        </> 
     );
}

export default Admindash;