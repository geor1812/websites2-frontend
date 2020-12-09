import './App.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import ProductList from "./components/products/ProductList";
import AddProduct from "./components/products/AddProduct";
import EditProduct from "./components/products/EditProduct";
import BuyProduct from "./components/products/BuyProduct";

class App extends Component {
    state = {
        customerId : null
    }
  render() {
      console.log(process.env.REACT_APP_NAME);
      return (
          <Router>
            <Navbar />
            <div className="container-fluid h-100 bg-dark">
                <Switch>
                    <Route
                        exact path={["/", "/products"]}
                        component={ProductList}
                    />

                    <Route
                        exact path="/products/add"
                        component={AddProduct}
                    />

                    <Route
                        exact path="/products/:id"
                        component={EditProduct}
                    />
                    <Route
                        exact path="/buy/:id"
                        component={BuyProduct}
                        //render={props => <BuyProduct {...props} />}
                    />
                </Switch>
            </div>
          </Router>
      );
  }
}

export default App;
