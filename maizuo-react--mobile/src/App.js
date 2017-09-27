import React, {Component} from 'react';

import Header from './component/Header'
import './App.css';
import './assets/styles/header.css'
import './assets/styles/main.css'
import './assets/styles/details.css'

class App extends Component {
    scroll = () => {
        console.log('app')
    }
  render () {
    return (
      <div onScroll={this.scroll}>
        <Header />
      </div>
    )
  }
}
export default App
