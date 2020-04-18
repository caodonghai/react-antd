import React, { Component } from 'react';
import moment from 'moment'
import { Card, Table, Tag } from 'antd'
import XLSX from 'xlsx'//前端实现excel数据导出
import { getArticals } from '../../requests'
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

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
            isLoading: false,
            pageSize: 10,
            pageNumber: 1
        }
    }

    creatClumns = (columnKeys) => {
        const clumns = columnKeys.map(item => {
            if (item === 'creatAt') {
                return {
                    title: titleDisplayMap[item],
                    key: item,
                    align: 'center',
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
                    align: 'center',
                    render: ( text, record ) => {
                        const { id, amount } = record;
                        return <Tag key={id} color={amount > 300 ? 'red' : 'geekblue'}>{ record.amount }</Tag>
                    }
                } 
            } else {
                return {
                    title: titleDisplayMap[item],
                    key: item,
                    align: 'center',
                    dataIndex: item,
                }
            }
        })
        clumns.push({
            title: '操作',
            key: 'action',
            align: 'center',
            render: (text,record) => {
                return(
                    <>
                        <Tag color="#2db7f5" style={{cursor: "pointer",padding: '5px 10px',margin: 'auto 10px'}}>
                            编辑
                        </Tag>
                        <Tag color="#108ee9" style={{cursor: "pointer",padding: '4px 10px',margin: 'auto 10px'}}>
                            修改
                        </Tag>
                    </>
                )
            }
        })
        return clumns
    }

    getData = () => {
        this.setState({
            isLoading: true
        })
        getArticals(this.state.pageSize, this.state.pageNumber)
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
                    columns,
                })
            })
            .catch(err => {
                //处理错误
                console.log(err)
            })
            .finally(() => {
                this.setState({
                    isLoading: false
                })
            })
    }

    onPaginationChange = (pageNumber, pageSize) => {
        console.log({pageNumber, pageSize});
        this.setState({
            pageNumber: pageNumber,
            pageSize: pageSize
        }, () => {
            this.getData();
        });
    }

    onShowSizeChange = (current, pageSize) => {
        console.log({current, pageSize})
        this.setState({
            pageNumber:1,
            pageSize,
        }, () => {
            this.getData();
        })
    }

    exportData = () => {
        //excel数据导出功能，本应该由后端实现，这里前端使用xlsx这个npm插件实现导出功能。
        const excelData = [];
        const excelTitle = Object.keys(this.state.dataSource[0]);
        excelData.push(excelTitle);
        for (let item of this.state.dataSource) {
            // excelData.push(Object.values(item));//没有处理时间戳的导出数据发
            excelData.push([
                item.id,
                item.title,
                item.auth,
                item.amount,
                moment(item.creatAt).format('YYYY年MM月DD日 HH:mm:ss'),
            ])
        }
        /* convert state to workbook */
		const ws = XLSX.utils.aoa_to_sheet(excelData);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
		/* generate XLSX file and send to client */
		XLSX.writeFile(wb, `articalData-${moment().format('YYYY年MM月DD日 HH:mm:ss')}-导出数据.xlsx`)
    }

    componentDidMount() {
        this.getData();
    }
    render() {
        return (
        <Card title="文章列表" extra={<Button onClick={this.exportData} type="primary" shape="round" icon={<DownloadOutlined />}> 导出数据 </Button>}>
                <Table
                    dataSource={this.state.dataSource}
                    columns={this.state.columns}
                    rowKey={(record) => record.id}
                    loading={this.state.isLoading}
                    pagination={{
                        total:this.state.total,
                        pageSize:this.state.pageSize,
                        defaultPageSize:10,
                        hideOnSinglePage: true,//当条数为零时是否显示分页
                        showQuickJumper:true,
                        showSizeChanger:true,
                        onChange:this.onPaginationChange,//注意这里调用函数的写法，没有加括号。
                        onShowSizeChange:this.onShowSizeChange,
                    }}
                />
            </Card>
        );
    }
}

export default Artical;