import React, {Component} from "react";
import ProductService from "../../service/ProductService";
import { Link } from "react-router-dom";


class ProductList extends Component {
    constructor(props) {
        super(props);

        this.getProducts = this.getProducts.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.getProductsComplex = this.getProductsComplex.bind(this);
        this.onChangeSearchTerm = this.onChangeSearchTerm.bind(this);
        this.onChangeSortingDirection = this.onChangeSortingDirection.bind(this);
        this.search = this.search.bind(this);
        this.changePage = this.changePage.bind(this);

        this.state = {
            searchTerm : "",
            currentPage: 0,
            totalPages : 0,
            sortDirection : "asc",
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

    //Retreiving products with pagination, filtering and sorting
    getProductsComplex(pPerPage, pageNr, searchTerm, sortDirection) {
        ProductService.getAllComplex(pPerPage, pageNr, searchTerm, sortDirection)
            .then(response => {
                this.setState({
                    searchTerm: searchTerm,
                    products: response.data,
                    currentPage: pageNr,
                    sortDirection: sortDirection,
                    totalPages: response.headers["page-total"]
                })
                console.log(response.data);
                console.log(response.headers);
            })
            .catch(e => {
                console.log(e);
            })
    }

    changePage(increment) {
        this.getProductsComplex(4, this.state.currentPage + increment,
            this.state.searchTerm, this.state.sortDirection);
    }

    componentDidMount() {
       // this.getProducts();
        this.getProductsComplex(4,0, this.state.searchTerm, this.state.sortDirection);
    }

    search() {
        this.getProductsComplex(4,0,this.state.searchTerm, this.state.sortDirection);
    }

    onChangeSearchTerm(e) {
        const newSearchTerm = e.target.value;
        this.setState({
            searchTerm:  newSearchTerm,
        });
    }

    onChangeSortingDirection(e) {
        const newSortingDirection = e.target.value;
        this.setState({
            sortDirection:  newSortingDirection,
        });
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
            <div className="container-fluid bg-secondary p-0" >
                <div className="row-cols-1">
                    <nav className="navbar navbar-dark bg-dark">
                        <form className="form-inline" onSubmit={(e => e.preventDefault())}>
                            <input className="form-control mr-sm-2" type="search" placeholder="Search"
                                   aria-label="Search" onChange={this.onChangeSearchTerm}/>

                                <select className="form-control mr-sm-2" id="productsPerPage" onChange={this.onChangeSortingDirection}>
                                    <option value="">Sort price</option>
                                    <option value="asc">Asc</option>
                                    <option value="desc">Desc</option>
                                </select>
                                <button className="btn btn-outline-danger mr-sm-2" onClick={this.search} type="submit">Search</button>

                                <button
                                    className="btn btn-outline-danger mr-sm-2"
                                    type="button"
                                    onClick={() => this.changePage(-1)}
                                    disabled={this.state.currentPage === 0 ? ("disabled") : ("")}
                                >
                                    Previous
                                </button>
                                <h5><span className="badge badge-secondary mr-sm-2">{`${this.state.currentPage + 1} of ${this.state.totalPages}`}</span></h5>
                                <button
                                    className="btn btn-outline-danger mr-sm-2"
                                    type="button"
                                    disabled={this.state.currentPage < this.state.totalPages - 1 ? ("") : ("disabled")}
                                    onClick={() => this.changePage(1)}
                                >
                                    Next
                                </button>
                        </form>
                    </nav>
                </div>
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
                <div className="row-cols-1 pt-1 mb-2 text-center">
                    <Link
                        to={"/products/add"}
                        className="btn btn-dark btn-outline-danger btn-lg text-center"
                    >
                        Add a product
                    </Link>
                </div>
                <div className="row d-flex">
                    <div className={"col-md-auto mx-auto"}>
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
