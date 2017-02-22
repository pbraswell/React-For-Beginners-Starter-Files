import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';

class App extends React.Component {
    constructor () {
      super();
      this.addFish = this.addFish.bind(this);
      this.loadSamples = this.loadSamples.bind(this);
      // Iniital state
      this.state = {
        fishes: {},
        orders: {},
      };
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
    
    loadSamples () {
      console.log('in loadSamples()')
      this.setState({ fishes: sampleFishes });
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
                        details={this.state.fishes[key]}/>
                    )
                }
              </ul>
            </div>
            <Order />
            <Inventory addFish={this.addFish}
                       loadSamples={this.loadSamples}/>
          </div>
        );
    }
}

export default App;