import React, { Component } from 'react'
import './css/Orders.css'
export class Orders extends Component {
    constructor(props) {
        super(props);
        this.asd = this.asd.bind(this);
    }
    asd(){
        console.log('asdf');
    }
    render() {
        return (
            <div className="seller-orders">
                <h1>Orders</h1>
            </div>
        )
    }
}

export default Orders

