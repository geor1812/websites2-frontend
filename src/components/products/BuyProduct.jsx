import React, {Component} from "react";
import OrderService from "../../service/OrderService";
import CustomerService from "../../service/CustomerService";
import http from "../../http-common";

class BuyProduct extends Component {
    constructor(props) {
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);

        this.state = {
            message: "",
            customersId: null,
            customerData: {
                email: "",
                firstName: "",
                lastName: "",
            }
        }
        this.setupOrder = this.setupOrder.bind(this);
        this.saveOrder = this.saveOrder.bind(this);
    }


    onChangeEmail(e) {
        let newOrderState = this.state.customerData;
        newOrderState.email = e.target.value;
        this.setState({
            customerData : newOrderState
        })
    }

    onChangeFirstName(e) {
        let newOrderState = this.state.customerData;
        newOrderState.firstName = e.target.value;
        this.setState({
            customerData : newOrderState
        })
    }

    onChangeLastName(e) {
        let newOrderState = this.state.customerData;
        newOrderState.lastName = e.target.value;
        this.setState({
            customerData : newOrderState
        })
    }


    setupOrder() {
        let customerData = this.state.customerData;
        console.log(customerData)
        CustomerService
            .create(customerData)
            .then((response) => {
                console.log(response.data);
                //console.log(customerData);
                this.setState({ customersId : response.data.id}, function() {this.saveOrder();})
            })
            .catch((e)=> {
                console.log(e);
            })
    }

    saveOrder(){
        console.log(this.state.customersId)
        let orderData = {
            customersId: this.state.customersId,
            productsId: this.props.match.params.id
        }

        console.log(orderData)

        OrderService
            .create(orderData)
            .then(() => {
                this.setState({
                    message: "Order successfully added"
                })
                window.scrollTo(0,0);
            })
            .catch((e) => {
                console.log(e);
            })

    }



    render() {
        return (
            <div className="container bg-secondary container-sm">
                {
                    this.state.message !== "" ?
                        (<div className="row-cols-1 pt-3 text-center">
                            <div className="alert alert-danger pt-2" role="alert">
                                {this.state.message}
                            </div>
                        </div>) : (
                            console.log("Not added yet")
                        )
                }
                <div className="row">
                    <div className="col">
                    </div>
                    <div className="col col-lg-8">
                        <form onSubmit={(e => e.preventDefault())}>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input className="form-control" type="text" id="email" placeholder=""
                                       onChange={this.onChangeEmail} required/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="first-name">First Name</label>
                                <input className="form-control" type="text" id="first-name" placeholder=""
                                       onChange={this.onChangeFirstName} required/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="last-name">Last Name</label>
                                <input className="form-control" type="text" id="last-name" placeholder=""
                                       onChange={this.onChangeLastName} required/>
                            </div>

                            <div className="form-group text-center">
                                <button className="btn btn-dark btn-lg" onClick={this.setupOrder}>Purchase</button>
                            </div>
                        </form>
                    </div>
                    <div className="col">
                    </div>
                </div>
            </div>
        )
    }
}

export default BuyProduct;