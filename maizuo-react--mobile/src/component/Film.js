/**
 * Created by dllo on 17/9/23.
 */

import React, {Component} from 'react'
import NowPlaying from './NowPlaying'
import Comingsoon from './ComingSoon'
import '../assets/styles/film.css'

import {SegmentedControl, WingBlank} from 'antd-mobile/lib';

class Film extends Component {
  state = {
    index: 0
  }

  componentDidMount () {

  }

  onChange = (e) => {
    this.setState({
      index: e.nativeEvent.selectedSegmentIndex
    })
    console.log(`selectedIndex:${e.nativeEvent.selectedSegmentIndex}`);
  }

  render () {
    return (
      <WingBlank size="xs" className="sc-example">
        <SegmentedControl values={['正在热映', '即将上映']}
                          onChange={this.onChange}
        />
        {this.state.index === 0 ? <NowPlaying /> : <Comingsoon />}
      </WingBlank>
    );
  }
}
export default Film