import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu } from 'antd'
// import {
//   AppstoreOutlined,
//   HomeOutlined,
//   UserOutlined,
//   SafetyOutlined,
//   BarChartOutlined,
//   UnorderedListOutlined,
//   ToolOutlined,
//   AreaChartOutlined,
//   LineChartOutlined,
//   PieChartOutlined
// } from '@ant-design/icons'
import './index.less'
import MenuList from '../../config/menuConfig'
import Logo from '../../assets/images/logo.png'

const { SubMenu } = Menu

class leftNav extends Component {
  // 根据menu的数据数组生成对应的标签数组
  getMenuNode = (MenuList) => {
    return MenuList.map(item => {
      if (item?.children) {
        return (
          <SubMenu key={item.key} title={item.title}>
            {this.getMenuNode(item.children)}
          </SubMenu>
        )
      } else {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        )
      }
    })
  }
  render () {
    const path = this.props.location.pathname
    const openKey = () => {
      let arrChildren
      MenuList.forEach(item => {
        if (item?.children) {
          item.children.forEach(items => {
            if(items.key === path){
              arrChildren = item.key
            }
          })
        }
      })
      return arrChildren
    }
    return (
      <div>
        <div className='left-nav'>
          <Link to='/' className='left-nav-header'>
            <img src={Logo} alt="logo"/>
            <h1>后台管理</h1>
          </Link>
        </div>
        <div>
        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[openKey()]}
          mode="inline"
          theme="dark"
        >
            {/* <Menu.Item key="1" icon={<HomeOutlined/>}>
            <Link to='/home'>首页</Link>
            </Menu.Item>
            <SubMenu icon={<AppstoreOutlined />} key="sub1" title="商品">
                <Menu.Item key="2" icon={<UnorderedListOutlined />}><Link to='/category'>品类管理</Link></Menu.Item>
                <Menu.Item key="3" icon ={<ToolOutlined />}><Link to='/product'>商品管理</Link></Menu.Item>
            </SubMenu>
            <Menu.Item key="4" icon={<UserOutlined />}>
            <Link to='/user'>用户管理</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<SafetyOutlined />}>
            <Link to='/role'>角色管理</Link>
            </Menu.Item>
          <SubMenu key="sub2" icon={<AreaChartOutlined />} title="图形图表">
              <Menu.Item key="6" icon={<BarChartOutlined/>}><Link to='/bar'>柱形图</Link></Menu.Item>
              <Menu.Item key="7" icon={<LineChartOutlined />}><Link to='/line'>折线图</Link></Menu.Item>
              <Menu.Item key="8" icon={<PieChartOutlined />}><Link to='/pie'>饼图</Link></Menu.Item>
          </SubMenu> */}
          {
            this.getMenuNode(MenuList)
          }
        </Menu>
      </div>
      </div>
      
    )
  }
}
/**
 * withRouter高阶组件：
 *  包装非路由组件，返回一个新的组件
 *  新的组件向非路由组件传递3个属性： history/location/match
 */
export default withRouter(leftNav)