import React, { Component } from 'react'
import './itemManagement.less'
import { defaultPagination } from '../../until/config'

import { getItemList } from '../../requests'

import {
    Card,
    Input,
    Table,
    Divider,
} from 'antd'

const itemListMap = {
  id: 'id',
  name: '物品名称',
  position: '物品位置',
  changeTime: '变更时间',
  imgInfo: '位置图片',
  remark: '备注'

}

export default class ItemManagement extends Component {
  constructor() {
    super()
    this.state = {
      total: 0,
      clumns: [],
      dataSource: [],
    }
  }
    componentDidMount() {
      this.getList()
    }

    getList = () => {
      getItemList()
        .then(resp => {
          if(resp.list.length <= 0) return
          const clumns = this.creatClumns(resp.list)
          this.setState({
            total: resp.total,
            pageSize: 10,
            current: 1,
            clumns,
            dataSource: resp.list,
          })
        })
    }


    creatClumns = (list) => {
      const clumnsKeys = Object.keys(list[0])
      const clumns = clumnsKeys.map(item => {
        if(item === 'name') {
          return {
            title: itemListMap[item],
            key: item,
            align: 'center',
            dataIndex: item,
            render: ( text, record ) => {
              return <a href='#' onClick={(e) => e.preventDefault()}>{text}</a>
            }
          }
        } else if(item === 'imgInfo') {
          return {
            title: itemListMap[item],
            key: item,
            align: 'center',
            dataIndex: item,
            render: ( text, record ) => {
              return <img className='imgInfo' src={record.imgInfo} alt={record.name} />
            }
          }
        }
        return {
          title: itemListMap[item],
          key: item,
          align: 'center',
          dataIndex: item,  
        }
      })
      clumns.shift()
      clumns.unshift({
        title: '序号',
        key: 'index',
        align: 'center',
        // dataIndex: item,
        render: ( text, record,index ) => {
          return index + 1
        }

      })
      clumns.push({
        title: '操作',
        key: 'action',
        align: 'center',
        // dataIndex: item,
        render: ( text, record ) => {
          return (
            <div onClick={(e) => {console.log(e.target.innerHTML)}}>
              <a href='#' onClick={(e) => e.preventDefault()}>查看</a>
              <Divider type='vertical'></Divider>
              <a href='#' onClick={(e) => e.preventDefault()}>编辑</a>
              <Divider  type='vertical'></Divider>
              <a href='#' style={{color: 'red'}} onClick={(e) => e.preventDefault()}>删除</a>
            </div>
          )
        }

      })
      return clumns
    }

    onPaginationChange = (page, pageSize) => {
      this.setState({
        current: page,
        pageSize
      })
    }

    onShowSizeChange = (current, size) => {
      this.setState({
        current,
        pageSize:size
      })
    }

    render() {
        const { Search } = Input;
          
        return (
            <Card
                title='物品管理'
                extra={<Search
                        placeholder="搜索您的物品"
                        onSearch={value => console.log(value)}
                        style={{ width: '30rem',borderRadius: 50}}
                    />
                }
            >
                <Table
                  columns={this.state.clumns}
                  dataSource={this.state.dataSource}
                  rowKey={(record) => record.id}
                  pagination={{
                      ...defaultPagination,
                      total:this.state.total,
                      current: this.state.current,
                      pageSize: this.state.pageSize,
                      hideOnSinglePage: true,//当条数为零时是否显示分页
                      showQuickJumper:true,
                      showSizeChanger:true,
                      onChange:this.onPaginationChange,//注意这里调用函数的写法，没有加括号。
                      onShowSizeChange:this.onShowSizeChange,
                  }}
                />
            </Card
            >
        )
    }
}
