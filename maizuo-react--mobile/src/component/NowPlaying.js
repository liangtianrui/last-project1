/**
 * Created by dllo on 17/9/23.
 */
import React, {Component} from 'react'

class NowPlaying extends Component {
  state = {
    data: []
  }


  componentDidMount () {
    this.ajax('/api/film/now-playing?page=1&count=7')
    document.body.scroll = this.scroll
    window.addEventListener('scroll', this.scroll)
  }
  componentDidUpdate () {
    document.body.scroll = this.scroll
    window.addEventListener('scroll', this.scroll)
  }
  ajax (url) {
    fetch(url)
      .then(response => response.json())
      .then(response => {
        this.setState({
          data: response.data.films
        })
      })
  }

  scroll = () => {
    console.log('aaa')
  }

  render () {
    let filmsArr = this.state.data.map((item, index) => {
      return (
        <div className='film-main' key={index.toString()}>
          <div className="film-one">
            <div className="film-img">
              <img src={item.poster.thumbnail} />
            </div>
            <div className="film-message">
              <div className="message-header">
                <div className="message-movie-name">
                  {item.name}
                </div>
                <div className="message-grade">
                  {item.grade}
                </div>
              </div>
              <p className="message-content">{item.intro}</p>
              <div className="message-now">
                <span className="color-number">{item.cinemaCount}</span>家影院上映&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                className="color-number">{item.watchCount}</span>人购票
              </div>
            </div>
          </div>
        </div>
      )
    })


    return (
      <div>
        {filmsArr}
      </div>
    )
  }
}

export default NowPlaying