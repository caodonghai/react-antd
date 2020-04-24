import React, { Component } from 'react';
import moment from 'moment'
import { Modal, Card, Table, Tag, Typography, Popover, Button, message } from 'antd'
import XLSX from 'xlsx'//前端实现excel数据导出
import { getArticals, deleteArticalItem } from '../../requests'
import { DownloadOutlined, DeleteTwoTone, SmileTwoTone } from '@ant-design/icons'

const { Text, Title } = Typography

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
            pageNumber: 1,
            isModalvisible: false,
            isConfimLoading: false,
            modalTitle: '',
            ArticalId: '',
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
                        return (
                        <Popover
                            title={<Typography><SmileTwoTone twoToneColor={amount > 300 ? 'red' : 'blue'} />小提示：</Typography>}
                            content={<Typography>{amount > 300 ? '红色代表阅读数量大于300。' : '蓝色代表阅读数量小于300。'}</Typography>}
                        >
                            <Tag key={id} color={amount > 300 ? 'red' : 'geekblue'}>{ record.amount }</Tag>
                        </Popover>)
                    }
                }//
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
            width: '15%',
            render: (text,record) => {
                return(
                    <>
                        <Tag color="#2db7f5" onClick={this.toEdit.bind(this,record)} style={{cursor: "pointer",padding: '5px 20px',marginRight: '10px'}}>
                            编辑
                        </Tag>
                        <Tag color="red" onClick={this.showDeleteModal.bind(this, record)} style={{cursor: "pointer",padding: '4px 20px'}}>
                            删除
                        </Tag>
                    </>
                )
            }
        })

        //添加表格序号
        clumns.unshift({
            title: '序号',
            key: 'index',
            align: 'center',
            width: '5%',
            render: (text,record,index) => {
                return (this.state.pageNumber - 1) * this.state.pageSize + index + 1
            }
        })
        return clumns
    }

    toEdit = (record) => {
        this.props.history.push({
            pathname: `/admin/artical/edit/${record.id}`,
            state: {...record}
        })
    }

    showDeleteModal = (record) => {
        // Modal.confirm({
        //     title:<Typography level={1}><DeleteTwoTone twoToneColor='#F00' />删除不可逆，请谨慎！！</Typography>,
        //     cancelText:'我点错了',
        //     onText:'残忍删除',
        //     content:<Typography level={4}>确定是否删除<Text mark>{ record.title }？</Text></Typography>
        // })
        this.setState({
            isModalvisible: true,
            modalTitle: record.title,
            ArticalId: record.id,
        })
    }

    handleModalCancel = () => {
        this.setState({
            isModalvisible: false,
            isConfimLoading: false,
            modalTitle: '',
            ArticalId: '',
        })
    }

    handleModalOk = () => {
        this.setState({
            isConfimLoading: true,
        })
        deleteArticalItem(this.state.ArticalId)
            .then(resp => {
                message.success(resp.msg);
                //这里沟通的时候有坑，到底留在当前页还是回到第一页；
                this.setState({
                    pageNumber: 1,
                }, () => {//在回调里面请求数据
                    this.getData()
                })
            })
            .finally(msg => {
                this.setState({
                    isConfimLoading: false,
                    isModalvisible: false
                })
            })
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
        // console.log({pageNumber, pageSize});
        this.setState({
            pageNumber: pageNumber,
            pageSize: pageSize
        }, () => {
            this.getData();
        });
    }

    onShowSizeChange = (current, pageSize) => {
        // console.log({current, pageSize})
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
                        current:this.state.pageNumber,
                        defaultPageSize:10,
                        hideOnSinglePage: true,//当条数为零时是否显示分页
                        showQuickJumper:true,
                        showSizeChanger:true,
                        onChange:this.onPaginationChange,//注意这里调用函数的写法，没有加括号。
                        onShowSizeChange:this.onShowSizeChange,
                    }}
                />
                <Modal
                    title={<Title level={4}><DeleteTwoTone twoToneColor='#F00' />删除不可逆，请谨慎！！</Title>}
                    visible={this.state.isModalvisible}
                    onOk={this.handleModalOk.bind(this, this.state.ArticalId)}
                    onCancel={this.handleModalCancel}
                    confirmLoading={this.state.isConfimLoading}
                    maskClosable={false}
                    >
                        <Typography level={4}>确定是否删除<Text mark>{ this.state.modalTitle }</Text>？</Typography>
                </Modal>
            </Card>
        );
    }
}

export default Artical;