import React from 'react';
import { formatPrice } from '../helpers';

class Order extends React.Component {
    constructor () {
      super();
      this.renderOrder = this.renderOrder.bind(this);
    }
  
    renderOrder(key) {
      const fish = this.props.fishes[key];
      const count = this.props.orders[key];
      
      if(!fish || fish.status === 'unavailable') {
        return <li key={key}>Sorry! {fish ? fish.name : "Fish"} is no longer available!</li>
      }
      
      return (
        <li key={key}>
          <span>{count}lbs {fish.name}</span>
          <span className="price">{formatPrice(count * fish.price)}</span>
        </li>
      );
      
    } 
    
    render() {
        const orderIds = Object.keys(this.props.orders);
        const totals = orderIds.reduce((previousTotal, key) => {
          const fish = this.props.fishes[key];
          const count = this.props.orders[key];
          const isAvailable = fish && fish.status === 'available';
          if(isAvailable) {
            return previousTotal + (count * fish.price || 0)
          }
          return previousTotal;
        }, 0);
        return(
          <div className="order-wrap`">
            <h2>Your Order</h2>
            <ul className="order">
              {orderIds.map(this.renderOrder)}
              <li className="total">
                <strong>Total:</strong>
                {formatPrice(totals)}
              </li>
            </ul>
          </div>
        );
    }
}

export default Order;