/**
 * Created by dllo on 17/9/23.
 */

import React, {Component} from 'react'

class ComingSoon extends Component {

    state = {
        data: []
    }

    componentDidMount() {
        this.ajax('/api/film/coming-soon?page=1&count=7')
    }

    ajax(url) {
        fetch(url)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    data: response.data.films
                }, () => {
                    console.log(this.state.data)
                })
            })
    }

    time = (time) => {
        let months = new Date(parseInt(time)).toLocaleString().substr(5, 2).replace('/', '')
        let days = new Date(parseInt(time)).toLocaleString().substr(7, 2)

        return `${months}月${days}日上映`
    }
    week = (time) => {
        let weeks = new Date(parseInt(time)).getDay()
        const chineseArr = ['一', '二', '三', '四', '五', '六', '日']
        return `星期${chineseArr[weeks - 1]}`
    }

    render() {
        let comingArr = this.state.data.map((item, index) => {
            return (
                <div key={index.toString()} className='film-main'>
                    <div className="film-one">
                        <div className="film-img">
                            <img src={item.poster.thumbnail}/>
                        </div>
                        <div className="film-message">
                            <div className="message-header">
                                <div className="message-movie-name">
                                    {item.name}
                                </div>
                            </div>
                            <p className="message-content">{item.intro}</p>
                            <div className="message-coming">
                                {this.time(item.premiereAt)}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {this.week(item.premiereAt)}
                            </div>
                        </div>
                    </div>
                </div>

            )
        })


        return (
            <div>
                {comingArr}
            </div>
        )
    }
}

export default ComingSoon
