import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import PlaceList from './PlaceList'
import escapeRegExp from 'escape-string-regexp'
import sizeMe from 'react-sizeme';
import { _fetch } from './utils/timeoutFetch'
// import LoadingContainer from './LoadingContainer'


export class MapContainer extends Component {
  state = {
    showingInfoWindow: [],
    venueData: {},
    showingPlace: this.props.allPlace
  };

  // 改变地图中显示的Marker
  changeDisplayMark = query => {
    let searchResult = this.props.allPlace
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      searchResult = this.props.allPlace.filter((place) => match.test(place.name))
    }
    this.setState({showingPlace: searchResult})
  }

  changeInfoWindow = (props) => {
    this.markerClick(props)
}

  closeInfoWindow = () => {
    this.setState({
      showingInfoWindow: {},
      venueData: {}
    })
  };
  // 点击Mark时
  markerClick = props => {
    this.setState({venueData: {name: 'loading', photo: ''}})
    this.props.allPlace.forEach(place => {
      // 当changeInfowindow调用时，prop是对象，Mark的onClick调用时，props是字符串
      if (place.placeID === (typeof(props)==='string' ? props : props.id)) {
        this.setState({
          showingInfoWindow: place
        });
      }
    });
    _fetch(fetch(`https://api.foursquare.com/v2/venues/${typeof(props)==='string' ? props : props.id}?&client_id=ZMGY14BYASSW2NLKURSQWSMJVJPVQ14OFKRMFHM4CILWTMXC&client_secret=G41IDHCMF4Y5GGI5ZHT244JCGRKTQJQ2J0ASWIEGFKDTDUHU&v=20181030`),2000)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({
            venueData: {
              name: data.response.venue.name,
              photo: data.response.venue.bestPhoto.prefix + 'width200' + data.response.venue.bestPhoto.suffix
            }
          }
        )
      }).catch(e => alert(e));
  };


  render() {
    const { width } = this.props.size;
    let { showingInfoWindow, venueData, showingPlace } = this.state;
    return (
      <Map google={this.props.google}
           zoom={12}
           initialCenter={{lat: 38.874434, lng: 115.464589}}
           mapTypeControl={false}
      >
        {showingPlace.map(place => {
          return (
            <Marker
              id={place.placeID}
              name={place.name}
              onClick={this.markerClick}
              position={place.pos}
            />
          )
        })}
        <InfoWindow
          position={showingInfoWindow ? showingInfoWindow.pos : {}}
          visible={showingInfoWindow ? true : false}
          onClose={this.closeInfoWindow}
        >
          <div>
            <span style={{display: 'block'}}>{venueData.name}</span>
            <img src={venueData.photo} alt={venueData.name + '_image'}/>
          </div>
        </InfoWindow>
        <PlaceList
          allPlace={this.props.allPlace}
          onPlaceListItemClick={this.changeInfoWindow}
          onUpdateSearchResult={this.changeDisplayMark}
          mapWidth={width}
        />
      </Map>
    );
  }
}

export default sizeMe()(GoogleApiWrapper({
  apiKey: "AIzaSyAzFUJ-7-MeBZDrtY8vn2B7Tty46iTQN9c&",
  // LoadingContainer: LoadingContainer
})(MapContainer));
