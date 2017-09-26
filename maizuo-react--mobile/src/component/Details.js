/**
 * Created by dllo on 17/9/11.
 */
import React, {Component} from 'react'
class Details extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      name: [],
      img: ''
    }
  }

  ajax = (url) => {
    let time = new Date().getTime()
    fetch(url + `?__t=${time}`)
      .then(response => response.json())
      .then(response => {
        this.setState({
          data: response.data.film,
          name: response.data.film.actors
        }, () => {
          console.log(this.state.data)
          this.setState({
            img: this.state.data.cover
          })
        })
      })
  }

  componentDidMount () {
    console.log(this.props.match.params.id)
    this.ajax(`/api/film/${this.props.match.params.id}`)
  }

  time = (nS) => {
    let month = new Date(parseInt(nS)).toLocaleString().substring(5, 6)
    let day = new Date(parseInt(nS)).toLocaleString().substring(7, 9)
    return month + '月' + day + '日'
  }

  // 详情页
  render () {
    let detailsArray = this.state.name.map((item, index) => {
      return <span key={index.toString()}>{item.name}</span>
    })
    return (
      <div>
        <div className='details-img'>
          <img src={this.state.img.origin} alt="" />
        </div>
        <div className='details-title'>
          影片简介
        </div>
        <div className='details-content'>
          <div>导&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;演:&nbsp;{this.state.data.director}</div>
          <div className='name'>主&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;演:&nbsp;{detailsArray}</div>
          <div>地区语言:&nbsp;{this.state.data.nation}({this.state.data.language})</div>
          <div>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型:&nbsp;{this.state.data.category}</div>
          <div>上映时间:&nbsp;{this.time(this.state.data.premiereAt)}上映</div>
          <p>{this.state.data.synopsis}</p>
        </div>
        <a href="http://m.maizuo.com/v4/#!/film/3841/cinema">
          <div className='click-buy'>立即购票</div>
        </a>

      </div>
    )
  }
}
export default Details