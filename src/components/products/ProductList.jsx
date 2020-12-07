import React, {Component} from "react";
import ProductService from "../../service/ProductService";
import { Link } from "react-router-dom";


class ProductList extends Component {
    constructor(props) {
        super(props);

        this.getProducts = this.getProducts.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);

        this.state = {
            products: [],
            message: ""
        }
    }

    //Method for retrieving all products
    getProducts() {
        ProductService.getAll()
            .then(response => {
                this.setState({
                    products: response.data
                });
                console.log(response.data); //for testing
            })
            .catch(e => {
                console.log(e);
            })
    }

    componentDidMount() {
        this.getProducts();
    }

    deleteProduct(id) {
        console.log("Delete " + id)
        ProductService
            .delete(id)
            .then(() => {
                this.setState({
                    message: "Product deleted successfully"
                })
                this.refreshList();
                window.scrollTo(0,0);
            })
            .catch(e => {
                console.log(e);
            })
    }

    refreshList() {
        this.getProducts();
    }

    render() {
        const products = this.state.products;
        return (
            <div className="container-fluid" >
                {
                    this.state.message !== "" ?
                        (<div className="row-cols-1 pt-3 text-center">
                            <div className="alert alert-danger pt-2" role="alert">
                                {this.state.message}
                            </div>
                        </div>) : (
                            console.log("No delete")
                        )
                }
                <div className="row-cols-1 pt-5 mb-2 text-center">
                    <Link
                        to={"/products/add"}
                        className="btn btn-dark btn-lg text-center"
                    >
                        Add a product
                    </Link>
                </div>
                <div className="row d-flex">
                    <div className="col-md-auto">
                        <ul className="list-unstyled row">
                            {products.map((product) => {
                                return <div key={product.id} className="card my-5 list-item mx-auto" style={{width: "35rem"}}>
                                    <img className="card-img-top" src={product.imgUrl} alt="AddProduct image"/>
                                    <div className="card-body text-center">
                                        <h4 className="card-title">{product.name}</h4>
                                        <h5 style={{fontStyle: "italic"}}>{product.price} kr<br/>Type: {product.type}</h5>
                                        <p className="card-text">{product.description}</p>
                                        <Link
                                            to={"/buy/" + product.id}
                                            className="btn btn-secondary btn-lg"
                                        >
                                            Buy
                                        </Link>
                                        <Link
                                            to={"/products/" + product.id}
                                            className="btn btn-danger btn-lg"
                                        >
                                            Edit
                                        </Link>
                                        <button type="submit" className="btn btn-dark btn-lg"
                                                onClick={(e)=> {
                                                    this.deleteProduct(product.id);
                                                }}>Delete
                                        </button>

                                    </div>
                                </div>
                            })}
                        </ul>
                    </div>
                </div>
            </div>)
    }
}

export default ProductList;
