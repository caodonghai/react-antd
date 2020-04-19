import React, { Component, createRef, Fragment } from 'react';
import './edit.less'
import moment from 'moment'
import { getArticalDetail,getArticals } from '../../requests'
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

import E from 'wangeditor'//引入wangediter编辑器


class Edit extends Component {
    constructor() {
        super()
        this.state = {
            // myvalidateStatus: undefined,
            // myhelp: undefined//自定义校验数据
        }
        this.editorRef = createRef()
        this.formRef = createRef()
    }

    componentDidMount() {
        this.initEditor()
        this.getDetail()
    }

    initEditor = () => {
        this.editer = new E(this.editorRef.current)
        /* editor校验内容设置 */
        this.editer.customConfig.zIndex = 100
        this.editer.customConfig.onchange = (html) => {
            /* html 即变化之后的内容 */
            this.formRef.current.setFieldsValue({
                articalcontent: html,
            });
            this.editer.txt.html(html)
        }
        
        this.editer.create()
    }

    /* DataPicker校验内容设置 */
    onDataPickerChange = (time) => {
        console.log(time)
        this.formRef.current.setFieldsValue({
            createAt: time,
        });
    }
    
    getDetail = () => {
        getArticalDetail(this.props.match.params.id)
            .then(resp => {
                console.log(moment(resp.createAt))
                const {id, ...data} = resp;
                data.createAt = moment(data.createAt)
                console.log(data)
                this.formRef.current.setFieldsValue({
                    ...data
                });
                this.editer.txt.html(resp.content)
            })
    }

    goBack = () => {
        this.props.history.go(-1)
    }

    render() {
        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 16 },
        };
        const tailLayout = {
            wrapperCol: { offset: 4, span: 16 },
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
                    ref={this.formRef}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    >
                    <Form.Item
                        label="文章标题"
                        name="title"
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
                        name="auth"
                        rules={[{ required: true, message: '文章作者不能为空！' }]}
                    >
                        <Input placeholder='请输入文章作者姓名' />
                    </Form.Item>
                    <Form.Item
                        label="阅读量"
                        name="amount"
                        rules={[{ required: true, message: '文章阅读量不能为空！' }]}
                    >
                        <Input placeholder='0' />
                    </Form.Item>
                    <Form.Item
                        label="创建时间"
                        name="createAt"
                        rules={[{ required: true, message: '请选择创建时间！' }]}
                    >
                        <Fragment>{/* 包一个标签用于解决弹出时间选择框这部分内容无法准确获取DatePicker位置 */}
                            <DatePicker
                                style={{width: '100%'}}
                                format='YYYY年MM月DD日 HH:mm:ss'
                                showTime
                                onChange={this.onDataPickerChange}
                            />
                        </ Fragment>
                    </Form.Item>
                    <Form.Item
                        label="文章内容"
                        name="content"
                        rules={[{ required: true, message: '文章内容不能为空！' }]}
                    >
                        <div ref={this.editorRef} style={{background: 'LightCyan'}} />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        );
    }
}

export default Edit;