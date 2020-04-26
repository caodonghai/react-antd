import React, { Component, createRef } from 'react';
import './login.less'

import { Redirect } from 'react-router-dom'

import {
    Form,
    Input,
    Checkbox,
    Button,
    Card,
    Spin
} from 'antd'

import {
    UserOutlined,
    LockOutlined,
} from '@ant-design/icons'

import { login } from '../../action/loginActions'
import { connect } from 'react-redux'

const mapData = state => {
    return {
        loginReducer: state.loginReducer,
        isLogin: state.loginReducer.isLogin,
        isLoginLoading: state.loginReducer.isLoginLoading,
    }
}

@connect(mapData, { login })
class Login extends Component {

    componentDidMount () {
        this.autoLogin()
    }

    autoLogin = () => {
        // const registerInfo = JSON.parse(localStorage.getItem('registerInfo'))
        // if (registerInfo) {
        //     this.formRef.current.setFieldsValue({
        //         userName: registerInfo.email,
        //         password: registerInfo.password
        //     })
        // }
    }

    render() {
        this.formRef = createRef()
        const onFinish = values => {
            // console.log('Received values of form: ', values);
            this.props.login(values)
        };
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        }

        const goToRegister = () => {
            this.props.history.push('/Register')
        }
        
        return (
            this.props.isLogin
            ?
            <Redirect to='/admin' />
            :
            <div className='form-contener'>
                <Card
                    className='HZ_login_card'
                >
                    <Spin spinning={this.props.isLoginLoading}>
                        <Form
                            ref={this.formRef}
                            layout={formItemLayout}
                            name="normal_login"
                            className="HZ_login_form"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                // layout={formItemLayout}
                                name="userName"
                                rules={[{ required: true, message: '输入用户名！' }]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入密码！',
                                    },{
                                        min: 6,
                                        message: '密码长度不小于6位',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="密码"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Form.Item name="isRemember" valuePropName="checked" noStyle>
                                    <Checkbox>记住我</Checkbox>
                                </Form.Item>
                                <span className="login-form-forgot">
                                    <u>忘记密码</u>
                                </span>
                            </Form.Item>
                    
                            <Form.Item style={{textAlign: 'center'}} >
                                <Button type="primary" htmlType="submit" loading={this.props.isLoginLoading} className="login-form-button">
                                    登陆
                                </Button>
                                <br />
                                <span onClick={goToRegister} className='login-form-loginup' >立马注册</span>
                            </Form.Item>
                        </Form>
                    </Spin>
                </Card>
            </div>
        );
    }
}

export default Login;