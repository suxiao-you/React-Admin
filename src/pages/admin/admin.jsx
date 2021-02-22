import React, { Component } from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import MemoryUtils from '../../utils/memoryUtils'
import { Layout } from 'antd';

import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'

const { Footer, Sider, Content } = Layout;
/**
 * 这是主界面路由
 */
class Admin extends Component{
  render () {
    const user = MemoryUtils.user
    if(!user || !user._id) {
      return <Redirect to="/login" />
    }
    return (
      <Layout style={{height: '100%'}}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content>
            <Switch>
              <Route path='/home' component={Home} />
              <Route path='/category' component={Category} />
              <Route path='/product' component={Product} />
              <Route path='/role' component={Role} />
              <Route path='/user' component={User} />
              <Route path='/bar' component={Bar} />
              <Route path='/line' component={Line} />
              <Route path='/pie' component={Pie} />
              <Redirect to='/home' />
            </Switch>
          </Content>
          <Footer style={{textAlign: 'center', color: '#cccccc'}}>推荐使用谷歌浏览器，可以获得更加页面操作体验</Footer>
        </Layout>
      </Layout>
    )
  }
}
export default Admin