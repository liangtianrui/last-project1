/**
 * Created by dllo on 17/9/9.
 */
import React, {Component} from 'react'
import SlideShow from './SlideShow'
import {Link} from 'react-router-dom'
class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [], // 热映数据
      datas: [], // 即将上映数据
      page: 1, // 热映请求的数据页数
      pages: 1, // 即将上映的数据页数

    }
  }

  // 请求更多热映影片
  ajax = (url) => {
    fetch(url)
      .then(response => response.json())
      .then(response => {
        this.setState({
          data: response.data.films
        })
      })
  }
  // 请求更多即将上映的影片
  ajaxs = (url) => {
    fetch(url)
      .then(response => response.json())
      .then(response => {
        this.setState({
          datas: response.data.films
        }, () => {
        })
      })
  }

  componentDidMount () {
    var time = new Date().getTime()
    this.ajax(`/api/film/now-playing?__t=${time}&page=${this.state.page}&count=5`)
    this.ajaxs(`/api/film/coming-soon?__t=${time}&page=1&count=3`)
  }

  // 上映时间
  time = (nS) => {
    let month = new Date(parseInt(nS)).toLocaleString().substring(5, 6)
    let day = new Date(parseInt(nS)).toLocaleString().substring(7, 9)
    return month + '月' + day + '日'
  }
  render () {
    let moreMovieArray = this.state.data.map((item, index) => {
      return (
        <li key={index.toString()} className='main-content'>
          <Link to={`/details/${item.id}`}>
            <div className='img'>
              <img src={item.cover.origin} />
            </div>
            <div className='main-bottom float-clear'>
              <div className="bottom-left float-left">
                <div className='movie-name'>
                  {item.name}
                </div>
                <div className='movie-count'>
                  {item.cinemaCount}家影院上映: {item.watchCount}张票
                </div>
              </div>
              <div className='bottom-right float-right'>
                <div>{item.grade}</div>
              </div>
            </div>
          </Link>
        </li>
      )
    })
    let futureMovieArray = this.state.datas.map((item, index) => {
      return (
        <li key={index.toString()} className='main-content'>
          <Link to={`/details/${item.id}`}>
            <div className='img'>
              <img src={item.cover.origin} />
            </div>
            <div className='main-bottom float-clear'>
              <div className="bottom-left float-left">
                <div className='movie-name'>
                  {item.name}
                </div>
              </div>
              <div className='future-right float-right'>
                <div>{this.time(item.premiereAt)}上映</div>
              </div>
            </div>
          </Link>
        </li>
      )
    })
    return (
      <div>
        <SlideShow />
        <ul className='main'>
          {moreMovieArray}
          <Link to="film/0">
            <div className='more-movie' onClick={this.moreMovie}>更多热映电影</div>
          </Link>
        </ul>
        <div className='future-line'>
          <div>即将上映</div>
        </div>
        <ul className="main">
          {futureMovieArray}
          <Link to="film/1">
          <div className="more-movie" onClick={this.futureMovie}>更多即将上映电影</div>
            </Link>
        </ul>
      </div>
    )
  }
}

export default Main