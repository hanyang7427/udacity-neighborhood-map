import React, { Component } from 'react';
import MapContainer from './MapContainer'

class App extends Component {
  state = {
    places: [
      {
        name: "保定站",
        pos: {
          lat: 38.8633667593,
          lng: 115.4799336044
        },
        placeID: "4bf7ca688d30d13a3b82ff17"
      },
      {
        name: "河北保定第二中学",
        pos: {
          lat: 38.85278683653362,
          lng: 115.4899527405313
        },
        placeID: "4eb2449461af6506d5358d11"
      },
      {
        name: "万博广场",
        pos: {
          lat: 38.876228,
          lng: 115.468681
        },
        placeID: "5234786011d2807c6c56659d"
      },
      {
        name: "华北电力大学",
        pos: {
          lat: 38.875401466974246,
          lng: 115.50940326130765
        },
        placeID: "4bdd1250d33f2d7fce418a3c"
      },
      {
        name: "电谷国际酒店",
        pos: {
          lat: 38.906675531914075,
          lng: 115.46034391393472
        },
        placeID: "4bdf12e97ea362b5ee4e43c4"
      }
    ]
  };

  render() {
    return (
      <div className="App">
        <MapContainer allPlace={this.state.places}/>
      </div>
    );
  }
}

export default App;
