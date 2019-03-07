import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'

class PlaceList extends Component {
  state = {
    showingList: true,
    query: '',
    searchResult: this.props.allPlace
  }
  // 开关
  listSwitch = () => {
    this.setState({showingList: !this.state.showingList})
  }

  updateQuery = newQuery => {
    this.setState({query: newQuery})
  }

  handleQueryChange = (event) => {
    this.updateQuery(event.target.value)
    this.props.onUpdateSearchResult(event.target.value)
    if (event.target.value) {
      const match = new RegExp(escapeRegExp(event.target.value), 'i')
      let showingPlace = this.props.allPlace.filter((place) => match.test(place.name))
      this.setState({searchResult: showingPlace})
    } else {
      this.setState({searchResult: this.props.allPlace})
    }
  }

  componentDidMount () {
    if (this.props.mapWidth < 700) {
      this.setState({showingList: false})
    }
  }


  render() {
    const { allPlaces, onPlaceListItemClick, onUpdateSearchResult } = this.props;
    let { searchResult, query,showingList } = this.state;
    return (
      <div className='placeList'>

        <div className='placeListTitle'>
          <button onClick={this.listSwitch}>
              {showingList ? '-' : '+'}
          </button>
          <span>Favorite Places</span>
        </div>

        <div className={showingList ? 'placeListSearch' : 'hidden'}>
          <input type="text" placeholder='Type to filter'
                 value={query}
                 aria-label="Filter text input box"
                 onChange={event=>{
                   this.handleQueryChange(event)
                 }}
          />
        </div>

        <div className={showingList ? 'placeListContent' : 'hidden'}>
          <ul>
            {searchResult.map(place => (
                <li
                  data-placeid={place.placeID}
                  onClick={e => {
                    onPlaceListItemClick(e.target.dataset.placeid);
                  }}
                >
                  {place.name}
                </li>
            ))}
          </ul>
        </div>

      </div>
    )
  }
}

export default PlaceList