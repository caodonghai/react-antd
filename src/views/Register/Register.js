import React, { Component } from 'react';
import './register.less'
import {
    Form,
    Input,
    Tooltip,
    Card,
    Button,
    message,
  } from 'antd';

import {
    UserOutlined,
    LockOutlined,MailOutlined,
    QuestionCircleOutlined,
} from '@ant-design/icons'


const formItemLayout = {
    labelCol: {
        xs: { span: 8 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 8 },
        sm: { span: 8 },
    },
};

const tailLayout = {
    labelCol: {
        xs: { span: 0 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};

class Register extends Component {
    render() {

        const goTOLogin =() => {
            this.props.history.push('./Login')
        }

        const onFinish = values => {
            // localStorage.setItem('registerInfo', JSON.stringify(values))
            message.success('注册成功，正在跳转...')
            setTimeout(() => goTOLogin(), 3000)
        };
        return (
            <div className='HZ_register_contener'>
            <Card
                className='HZ_register_card'
            >
                <Form
                    {...formItemLayout}
                    name="normal_register"
                    className="HZ_register_form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        {...tailLayout}
                        name="email"
                        label="邮箱"
                        rules={[
                        {
                            type: 'email',
                            message: '请输入正确的邮箱名称！',
                        },
                        {
                            required: true,
                            message: '邮箱名称不能为空！',
                        },
                        ]}
                    >
                        <Input prefix={<MailOutlined />} />
                    </Form.Item>

                    <Form.Item
                        {...tailLayout}
                        name="password"
                        label="密码"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码！',
                            },{
                                min: 6,
                                message: '密码长度不小于6位',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password prefix={<LockOutlined />} />
                    </Form.Item>

                    <Form.Item
                        {...tailLayout}
                        name="confirmPassword"
                        label="确认密码"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                        {
                            required: true,
                            message: '请确认你的密码！',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('两次输入的密码不一致！');
                            },
                        }),
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} />
                    </Form.Item>

                    <Form.Item
                        {...tailLayout}
                        name="nickName"
                        label={
                        <span>
                            昵称&nbsp;
                            <Tooltip title="你想要其他人怎么称呼你？">
                            <QuestionCircleOutlined />
                            </Tooltip>
                        </span>
                        }
                        rules={[{ required: true, message: '请输入昵称！', whitespace: true }]}
                    >
                        <Input prefix={<UserOutlined />} />
                    </Form.Item>
            
                    <Form.Item
                        labelCol={{span: 0}}
                        wrapperCol={{span: 24}}
                        style={{textAlign: 'center'}}
                    >
                        <Button type="primary" htmlType="submit" className="register-form-button">
                            注册
                        </Button>
                        <br />
                        <span className='register-form-loginup' onClick={goTOLogin} >已有账号</span>
                    </Form.Item>
                </Form>
            </Card>
            </div>
        );
    }
}

export default Register;