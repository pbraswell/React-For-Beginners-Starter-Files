import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../Base';

class App extends React.Component {
    constructor () {
      super();
      this.addFish = this.addFish.bind(this);
      this.loadSamples = this.loadSamples.bind(this);
      this.addToOrder = this.addToOrder.bind(this);
      this.updateFish = this.updateFish.bind(this);
      this.deleteFish = this.deleteFish.bind(this);
      this.deleteFromOrder = this.deleteFromOrder.bind(this);
      // Iniital state
      this.state = {
        fishes: {},
        orders: {},
      };
    }
    
    componentWillMount() {
      // This runs before <App> is rendered
      this.ref = base.syncState(`${this.props.params.storeId}/fishes`,
      {
        context: this,
        state: 'fishes',
      });
      
      // Check to see if there is any orders in local storage ...
      const localStoreageRef = 
        localStorage.getItem(`order-${this.props.params.storeId}`);
        
      if(localStoreageRef) {
        console.log('there was something in localStoreageRef!');
        // We need to update our in-memory state
        this.setState( { 
          orders: JSON.parse(localStoreageRef) 
        });
      }
    }
    
    componentWillUnmount() {
      base.removeBinding(this.ref);
    }
    
    componentWillUpdate(nextProps, nextState) {
      // This is an example of how you can ouput named objects to the console
      console.log('something changed');
      console.log({ nextProps, nextState });
      localStorage.setItem(`order-${this.props.params.storeId}`, 
                           JSON.stringify(nextState.orders));
    }
    
    addFish(fish) {
      // Best practice, make a copy of the state:
      const fishes = {...this.state.fishes};  
      // Add a new fish
      const timestamp = Date.now();
      fishes[`fish-${timestamp}`] = fish;
      // Update the state
      this.setState({ fishes: fishes });
      // You can also do:
      // this.setState({ fishes });
    }
    
    updateFish(key, updatedFish) {
      const fishes = {...this.state.fishes};
      fishes[key] = updatedFish;
      this.setState( { fishes });
    }
   
    deleteFish(key) {
      const fishes = {...this.state.fishes}
      fishes[key] = null;
      this.setState({ fishes });
    }
    
    loadSamples () {
      console.log('in loadSamples()')
      this.setState({ fishes: sampleFishes });
    }
    
    addToOrder(key) {
      const orders = {...this.state.orders};
      orders[key] = orders[key] + 1 || 1;
      this.setState({ orders });
    }
    
    deleteFromOrder(key) {
      const orders = {...this.state.orders};
      delete orders[key];
      this.setState({ orders });
    }
    
    render() {
        return(
          <div className="catch-of-the-day">
            <div className="menu">
              <Header tagline="Fresh Market Seafood"/>
              <ul>
                {
                  Object
                   .keys(this.state.fishes)
                   .map(key => <Fish key={key} 
                        details={this.state.fishes[key]}
                        addToOrder={this.addToOrder}
                        index={key}/>
                    )
                }
              </ul>
            </div>
            <Order 
              fishes={this.state.fishes} 
              orders={this.state.orders}
              deleteFromOrder={this.deleteFromOrder}
              params={this.props.params}
            />
            <Inventory 
              addFish={this.addFish}
              fishes={this.state.fishes}
              loadSamples={this.loadSamples}
              updateFish={this.updateFish}
              deleteFish={this.deleteFish}
            />
          </div>
        );
    }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default App;