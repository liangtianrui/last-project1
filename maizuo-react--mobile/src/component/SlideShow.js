/**
 * Created by dllo on 17/9/22.
 */
import React, {Component} from 'react'
import {Carousel, WingBlank} from 'antd-mobile/lib';
import {Link} from 'react-router-dom'
import '../assets/styles/slideshow.css'

class SlideShow extends Component {
    state = {
        status: '',
        data: [],
        img: [],
        initialHeight: 200,
    }

    componentDidMount() {
        // simulate img loading
        const time = new Date().getTime()
        this.ajax(`api/billboard/home?__t=${time}`)

    }

    ajax = (url) => {
        fetch(url)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    status: response.status,
                    data: response.data.billboards
                })
            })
    }

    render() {
        const hProp = this.state.initialHeight ? {height: this.state.initialHeight} : {};
        {
            console.log(this.state.status)
        }
        const sss = this.state.status !== 0 ? <div style={{display: 'none'}}/> : <WingBlank>
            <Carousel
                className="my-carousel"
                autoplay={true}
                infinite
                selectedIndex={1}
                swipeSpeed={35}
                dots={false}
            >
                {this.state.data.map((ii, index) => (
                    <Link to={Number(ii.url.substr(-4)).toString() !== 'NaN' ? `/details/${ii.url.substr(-4)}` : ii.url}
                          style={hProp}
                          key={index.toString()}>
                        <img
                            src={ii.imageUrl}
                            alt="icon"
                            onLoad={() => {
                                // fire window resize event to change height
                                window.dispatchEvent(new Event('resize'));
                                this.setState({
                                    initialHeight: null,
                                });
                            }}
                        />
                    </Link>
                ))}
            </Carousel>
        </WingBlank>
        return (
            <div>
                {sss}
            </div>
        );
    }
}

export default SlideShow