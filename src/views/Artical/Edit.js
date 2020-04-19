import React, { Component } from 'react';
import {
    Card,
    Button,
    Form,
    Input,
    DatePicker
} from 'antd'
import {
    RollbackOutlined,
} from '@ant-design/icons'


class Edit extends Component {
    constructor() {
        super()
        this.state = {
            // myvalidateStatus: undefined,
            // myhelp: undefined//自定义校验数据
        }
    }
    componentDidMount() {
        // console.log(this.props.location.state)
    }

    goBack = () => {
        this.props.history.go(-1)
    }

    render() {
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 6 },
        };
        const tailLayout = {
            wrapperCol: { offset: 8, span: 16 },
        };
        const edirLayout = {
            wrapperCol: { offset: 4, span: 16 },
        };
        
        const onFinish = values => {
            console.log('Success:', values);
        };
        
        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };

        return (
            <Card
                title={(this.props.location.state ? this.props.location.state.title : '') + '文章编辑'}
                extra={<Button onClick={this.goBack} type="primary" shape="round" icon={<RollbackOutlined />}> 取消 </Button>}
                bordered={false}
            >
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    >
                    <Form.Item
                        label="文章标题"
                        name="articaltitle"
                        rules={[{ required: true, message: '文章标题不能为空！' }]}
                    >
                        <Input placeholder='请输入文章标题' />
                    </Form.Item>


                    {/* 自定义校验示例 */}
                    {/* <Form.Item
                        label="文章标题"
                        name="articaltest"
                        rules={[{ 
                            validator: (rule, value) => {
                                console.log({rule, value})
                            }
                         }]}
                        validateStatus={this.state.myvalidateStatus}
                        hasFeedback
                        help={this.state.myhelp}
                        rules={[{ 
                            validator: async (rule, value) => {
                                console.log({rule, value});
                                if (value.length > 5) {
                                    throw new Error('超出最大长度');
                                    this.setState({
                                        myvalidateStatus: 'error',
                                        myhelp: '超出最大长度'
                                    })
                                } else{
                                   this.setState({
                                        myvalidateStatus: undefined,
                                        myhelp: undefined
                                    }) 
                                }
                            }
                         }]}
                    >
                        <Input placeholder='请输入文章标题' />
                    </Form.Item> */}
                    {/* 自定义校验示例 */}


                    <Form.Item
                        label="作者"
                        name="articalauth"
                        rules={[{ required: true, message: '文章作者不能为空！' }]}
                    >
                        <Input placeholder='请输入文章作者姓名' />
                    </Form.Item>
                    <Form.Item
                        label="阅读量"
                        name="articalamount"
                        rules={[{ required: false, message: '文章阅读量！' }]}
                    >
                        <Input placeholder='0' />
                    </Form.Item>
                    <Form.Item
                        label="创建时间"
                        name="articalcreatat"
                        rules={[{ required: true, message: '请选择创建时间！' }]}
                    >
                        <DatePicker style={{width: '100%'}} showTime />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                    <Form.Item {...edirLayout}>
                        <div style={{background: 'yellow'}}>fkjshkjdh</div>
                    </Form.Item>
                </Form>
            </Card>
        );
    }
}

export default Edit;