import React, {Component} from "react";
import {Link} from "react-router-dom";
import favicon from "../images/logo.ico"

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.refreshPage = this.refreshPage.bind(this);
    }

    refreshPage() {
        window.location.reload();
    }

    render() {
        return(
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <input type="image" className="img-fluid mx-sm-3" width="50" height="50" src={favicon} alt="responsive logo" onClick={this.refreshPage}/>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to={"/products"} className="nav-link">
                                    Products
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/customers"} className="nav-link">
                                    Customers
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/orders"} className="nav-link">
                                    Orders
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
        )
    }
}

export default Navbar;