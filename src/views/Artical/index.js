import React, { Component } from 'react';
import moment from 'moment'
import { Card, Table, Tag } from 'antd'

import { getArticals } from '../../requests'

const titleDisplayMap =  {
    id: 'id',
    title: '标题',
    auth: '作者',
    amount: '阅读量',
    creatAt: '创建时间'

}

class Artical extends Component {
    constructor() {
        super()
        this.state = {
            dataSource: [],
            columns: [],
            total: 0,
        }
    }

    creatClumns = (columnKeys) => {
        return columnKeys.map(item => {
            if (item === 'creatAt') {
                return {
                    title: titleDisplayMap[item],
                    key: item,
                    render: ( text, record ) => {
                        const { creatAt } = record;
                        return moment(creatAt).format('YYYY年MM月DD日 HH:mm:ss')
                    }
                } 
            }
            if (item === 'amount') {
                return {
                    title: titleDisplayMap[item],
                    key: item,
                    render: ( text, record ) => {
                        const { id, amount } = record;
                        return <Tag key={id} color={amount > 300 ? 'red' : 'geekblue'}>{ record.amount }</Tag>
                    }
                } 
            } else {
                return {
                    title: titleDisplayMap[item],
                    key: item,
                    dataIndex: item,
                }
            }
        })
    }

    getData = () => {
        getArticals()
            .then(resp => {
                const columnKeys = Object.keys(resp.list[0]);
                const columns = this.creatClumns(columnKeys)
                // const columns = columnKeys.map(item => {//将这部分内容提成一个方法
                //     return {
                //         title: titleDisplayMap[item],
                //         dataIndex: item,
                //         key: item,
                //     }
                // })
                this.setState({
                    dataSource: resp.list,
                    total: resp.total,
                    columns
                })
            })
    }

    componentDidMount() {
        this.getData();
    }
    render() {
        return (
            <Card title="文章列表" extra={<a href='#' >获取更多</a>}>
                <Table
                    dataSource={this.state.dataSource}
                    columns={this.state.columns}
                    rowKey={(record) => record.id}
                    loading={false}
                    pagination={{
                        total:this.state.total,
                        pageSize:50,
                        hideOnSinglePage: true,//当条数为零时是否显示分页
                    }}
                />
            </Card>
        );
    }
}

export default Artical;