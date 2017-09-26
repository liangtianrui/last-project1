import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import Main from './Main'
import Derails from './Details'
import SelectCity from './SelectCity'
import Film from './Film'
import {Drawer, List, NavBar} from 'antd-mobile/lib';
class Header extends Component {
  state = {
    open: false
  }
  onOpenChange = () => {
    this.setState({
      open: !this.state.open
    })
  }
  onOpenChanges = () => {
    this.setState({
      open: false
    })
  }

  render () {
    const array = ['首页', '影片', '影院', '商城', '我的', '卖座卡']
    const sidebar = (<List>
      {array.map((item, index) => {
        return (
          <Link onClick={this.onOpenChanges} key={index.toString()} to='/'><List.Item
            arrow="horizontal">{item}</List.Item></Link>);
      })}
    </List>);
    return (
      <Router>
        <header>
          <NavBar leftContent='卖座电影' className='header' onLeftClick={this.onOpenChange}
                  rightContent={
                    <Link to="/selectCity">
                      <div><span className='city'>焦作</span><span className='user-icon' /></div>
                    </Link>
                  } />
          <Drawer className="my-drawer"
                  style={{minHeight: document.documentElement.clientHeight - 50}}
                  enableDragHandle
                  sidebar={sidebar}
                  open={this.state.open}
                  onOpenChange={this.onOpenChange}>
            <Switch>
              <Route path="/film/:index" component={Film} />
              <Route path="/selectCity" component={SelectCity} />
              <Route path="/details/:id" component={Derails} />
              <Route exact path="/" component={Main} />
            </Switch>
          </Drawer>
        </header>
      </ Router >
    )
  }
}
export default Header