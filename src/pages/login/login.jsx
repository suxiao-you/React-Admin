import React, { Component } from 'react'
import logo from '../../assets/images/logo.png'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import {reqLogin} from '../../api'
import './login.less'
import MemoryUtils from '../../utils/memoryUtils'
import StorageUtils from '../../utils/storageUtils'
import { Redirect } from 'react-router-dom'

/**
 * 登陆的路由组件
 */

class Login extends Component {
  formRef = React.createRef()

  state = {
    layout: {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    }
  }
   onFinish = async (values) => {
    const {username, password} = values

      const result = await reqLogin(username, password)
      if(result.status===0) {
        // 提示登陆成功
        message.success('登陆成功')
        const user = result.data
        // 将user保存到工具类中保存，用于主界面的显示
        MemoryUtils.user = user
        // 将user保存到local中（长期存储）
        StorageUtils.saveUser(user)
        // 跳转到管理页面
        this.props.history.replace('/')
      }else{
        // 提示错误信息
        message.error(result.msg)
      }
  }
  
  render() {
    // 如果用户已经登陆，自动跳转到管理页面
    const user = StorageUtils.getUser()
    if (user && user._id) {
      return <Redirect to='/' />
    }
    return (
      <div className='login'>
        <header className='login-header'>
          <img src={logo} alt="logo" />
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className='login-content'>
          <h2>用户登陆</h2>
          <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish} initialValues={{ remember: true }}>
            {
              /** 
               * 1.必须输入
               * 2.必须大于4位
               * 3.必须小于12位
               * 4.必须是英文、数字或下划线组成
               */
            }
            <Form.Item
              name="username"
              rules={[
                { required: true, whitespace: true,  message: '账号不能为空' },
                { min: 4, message: '账号不能低于4位数' },
                { max: 12, message: '账号不能超过12位数'},
                { pattern: /^[a-zA-Z0-9_]+$/, message: '账号应由英文、数字或下划线组成'}
              ]}
            >
              <Input
                placeholder="请输入账号"
                prefix={<UserOutlined style={{ color: 'rgba(0, 0, 0, .25)' }} />}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                // { required: true, message: '密码不能为空' },
                {validator(_, value) {
                  if(!value) {
                    return Promise.reject('密码不能为空')
                  }else if(value.length < 4) {
                    return Promise.reject('密码长度不能小于4位')
                  }else if(value.length > 12) {
                    return Promise.reject('密码长度不能大于12位')
                  }else if(!/^[a-zA-Z0-9_]+$/.test(value)) {
                    return Promise.reject('密码只能由英文、数字或下划线组成')
                  }else{
                    return Promise.resolve()
                  }
                }}   
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, .25)' }} />}
                placeholder="请输入密码"
              />
            </Form.Item>

            <Form.Item>
              <Button className='login' type="primary" htmlType="submit">登陆</Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}

export default Login