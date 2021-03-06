import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.less';

import Login from './pages/login/login.jsx'
import Admin from './pages/admin/admin.jsx'

class App extends Component{
  render () {
    return (
      <BrowserRouter>
        <Switch> {/**只匹配其中一个路由 */}
          <Route path='/Login' component={Login}></Route>
          <Route path='/' component={Admin}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
