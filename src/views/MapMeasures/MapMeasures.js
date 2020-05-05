import React, { Component } from 'react'
import './mapMeasure.less'
import AMap from 'AMap'
import { Radio, Button } from 'antd';
import { getMapMarker } from '../../requests'
import { creatRandomNumber } from '../../myFunction'

class MapMeasures extends Component {
    constructor() {
        super()
        this.state = {
            position: '',
            value: '',
            overlays: [],
            index: 0,
        }
    }
    componentDidMount() {
        this.initMap()
        this.getMapMarkerList()
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    initMap = () => {
        this.map = new AMap.Map('container', {
            zoom: 13,  //设置地图显示的缩放级别
            pitch:75, // 地图俯仰角度，有效范围 0 度- 83 度
            // center: [116.397428, 39.90923],//设置地图中心点坐标
            layers: [new AMap.TileLayer.Satellite()],  //设置图层,可设置成包含一个或多个图层的数组
            // mapStyle: 'amap://styles/whitesmoke',  //设置地图的显示样式
            lang:'zh_cn',  //设置地图语言类型
            viewMode:'3D'//使用3D视图
        });
        //实时路况图层
        // let trafficLayer = new AMap.TileLayer.Traffic({
        //     zIndex: 10
        // });
        // this.map.add(trafficLayer);//添加图层到地图
        let _this = this
        AMap.plugin([
                'AMap.CitySearch',
                'AMap.ToolBar',
                'AMap.MapType',
                'AMap.Geolocation',
                'AMap.AdvancedInfoWindow',
                'AMap.Scale',
                'AMap.OverView',
                'AMap.MouseTool',
            ], function () {//定位获取你所在的城市
            let citySearch = new AMap.CitySearch()
            citySearch.getLocalCity(function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    // 查询成功，result即为当前所在城市信息
                    if (!_this.updater.isMounted(_this)) return//解决路由快速切换时this.setState找不到组件而报错的问题
                    _this.setState({
                        position: `你所在的位置：${result.province}—${result.city}`
                    })
                }
            })
            let toolbar = new AMap.ToolBar();//地图缩放控制工具条
            let MapType = new AMap.MapType();//地图图层切换
            let Geolocation = new AMap.Geolocation();//获取用户当前准确位置、所在城市
            let AdvancedInfoWindow = new AMap.AdvancedInfoWindow();//获取用户当前准确位置、所在城市
            let Scale = new AMap.Scale();// 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
            let OverView = new AMap.OverView({isOpen:true});// 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
            _this.mouseTool = new AMap.MouseTool(_this.map);// 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
            _this.map.addControl(toolbar)
            _this.map.addControl(MapType)
            _this.map.addControl(Geolocation)
            _this.map.addControl(AdvancedInfoWindow)
            _this.map.addControl(Scale)
            _this.map.addControl(OverView)
        })
        _this.map.on('complete', function(){//地图加载完成后调用
            console.log('地图加载完成后调用')
            _this.map.setFitView();
        });
        _this.map.on('click', function(ev) {
            // alert('你点我干啥')
            // 触发事件的对象
            // let target = ev.target;
            // 触发事件的地理坐标，AMap.LngLat 类型
            let lnglat = ev.lnglat;
            console.log({lnglat})
            // 触发事件的像素坐标，AMap.Pixel 类型
            // let pixel = ev.pixel;
            // 触发事件类型
            // let type = ev.type;
        });
    }

    getMapMarkerList = () => {
        getMapMarker()
            .then(resp => {
                const newMarkerData = this.getLatAndLng(resp.data)
                this.mapMarker(newMarkerData)
            })

    }
    
    //将拿回的数字处理成经纬度
    getLatAndLng = (data) => {
        let newData = data
        for(let item in newData) {
            newData[item].forEach(element => {
                element.lat = element.lat.toString().substr(0, 3) + '.' + element.lng.toString().substr(4)
                element.lng = element.lng.toString().substr(0, 2) + '.' + element.lng.toString().substr(3)
            });
        }
        return newData
    }

    //添加标注
    mapMarker = (data) => {
        // console.log(data)
        let _this = this
        for(let item in data) {
            data[item].forEach(element => {
                // console.log(element)
                let icon
                switch(element.type) {
                    case 1:
                        icon = new AMap.Icon({            
                            size: new AMap.Size(40, 50),  //图标的大小
                            image: require('../../static/png/mapMarkerOne.png'),
                            // imageOffset: new AMap.Pixel(-6.4, -4),//类似于雪碧图
                            imageSize: new AMap.Size(40, 50)   // 根据所设置的大小拉伸或压缩图片
                        }) 
                       break;
                    case 2:
                        icon = new AMap.Icon({            
                            size: new AMap.Size(40, 50),  //图标的大小
                            image: require('../../static/png/mapMarkerTwo.png'),
                            // imageOffset: new AMap.Pixel(-6.4, -4),//类似于雪碧图
                            imageSize: new AMap.Size(40, 50)   // 根据所设置的大小拉伸或压缩图片
                        }) 
                       break;
                    case 3:
                        icon = new AMap.Icon({            
                            size: new AMap.Size(40, 50),  //图标的大小
                            image: require('../../static/png/mapMarkerThree.png'),
                            // imageOffset: new AMap.Pixel(-6.4, -4),//类似于雪碧图
                            imageSize: new AMap.Size(40, 50)   // 根据所设置的大小拉伸或压缩图片
                        }) 
                        break
                    default:
                       icon ='https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png'
                } 
                const marker = new AMap.Marker({
                    info: element,//绑定到marker上面，用来后面展示信窗体
                    icon: icon,
                    offset: new AMap.Pixel(-20, -43),//设置偏移
                    position: [Number(element.lat), Number(element.lng)],
                    // anchor:'top-center', // 设置锚点方位
                });
                
                const circle = new AMap.Circle({
                    center: new AMap.LngLat(Number(element.lat), Number(element.lng)), // 圆心位置
                    radius: 2500,  //半径
                    strokeColor: "#F33",  //线颜色
                    strokeOpacity: 0,  //线透明度
                    strokeWeight: 1,  //线粗细度
                    fillColor:  'rgb(132, 193, 235)',  //填充颜色
                    fillOpacity: 0.5 //填充透明度
                });
                this.map.add([marker, circle]);
                
                AMap.event.addListener(marker, 'click', (e) => {
                    _this.newInfoWindow(e)
                    //实例化信息窗体,如果在这里写法就是这样
                    // let data = e.target.w.info
                    // let title = data.title,
                    // content = [];
                    // content.push(`<img style='height:80px' src=${data.image}>地址：北京市朝阳区阜通东大街6号院3号楼东北8.3公里`);
                    // content.push("电话：010-64733333");
                    // content.push("<a href='javascript:void(0)'>详细信息</a>");
                    // let infoWindow = new AMap.InfoWindow({
                    // isCustom: true,  //使用自定义窗体
                    // content: _this.createInfoWindow(title, content.join("<br/>")),
                    // offset: new AMap.Pixel(16, -45)
                    // });
                    // infoWindow.open(_this.map, marker.getPosition());//如果在这里写法就是这样
                    // // console.log(e.target.w.info)
                });

                AMap.event.addListener(marker, 'mouseover', (e) => {
                    let data = e.target.w.info
                    let infoWindow = new AMap.InfoWindow({
                    isCustom: true,  //使用自定义窗体
                    content: `<div style='background-color: rgb(132, 193, 235); padding: 0 5px; border-radius: 10px'>${data.title}</ div>`,
                    offset: new AMap.Pixel(0, -35)
                    });
                    infoWindow.open(_this.map, marker.getPosition());
                    // console.log(e.target.w.info)
                });
            });
        }
        _this.timer = setInterval(() => {_this.intervalTimer(_this.state.index)},8000)
    }

    //实例化信息窗体
    newInfoWindow = (e) => {
        //实例化信息窗体
        let data = e.target ? e.target.w.info : e.w.info
        let title = data.title,
        content = [];
        content.push(`<img style='height:80px' src=${data.image}>地址：北京市朝阳区阜通东大街6号院3号楼东北8.3公里`);
        content.push("电话：010-64733333");
        content.push("<a href='javascript:void(0)'>详细信息</a>");
        let infoWindow = new AMap.InfoWindow({
        isCustom: true,  //使用自定义窗体
        content: this.createInfoWindow(title, content.join("<br/>")),
        offset: new AMap.Pixel(16, -45)
        });
        infoWindow.open(this.map, e.target ? e.target.getPosition() : e.getPosition());//如果在这里写法就是这样
        // console.log(e.target.w.info)
    }
    //构建自定义信息窗体
    createInfoWindow = (title, content) => {
        // console.log(title, content)
        let info = document.createElement("div");
        info.className = "custom-info";

        //可以通过下面的方式修改自定义窗体的宽高
        //info.style.width = "400px";
        // 定义顶部标题
        let top = document.createElement("div");
        let titleD = document.createElement("div");
        let closeX = document.createElement("img");
        top.className = "info-top";
        titleD.innerHTML = title;
        closeX.src = "https://webapi.amap.com/images/close2.gif";
        // closeX.style.cursor = 'pointer'
        closeX.onclick = () => {
            this.map.clearInfoWindow();
        };

        top.appendChild(titleD);
        top.appendChild(closeX);
        info.appendChild(top);

        // 定义中部内容
        let middle = document.createElement("div");
        middle.className = "info-middle";
        middle.style.backgroundColor = 'white';
        middle.innerHTML = content;
        info.appendChild(middle);

        // 定义底部内容
        let bottom = document.createElement("div");
        bottom.className = "info-bottom";
        bottom.style.position = 'relative';
        bottom.style.top = '0px';
        bottom.style.margin = '0 auto';
        let sharp = document.createElement("img");
        sharp.src = "https://webapi.amap.com/images/sharp.png";
        bottom.appendChild(sharp);
        info.appendChild(bottom);
        return info;
    }

    //关闭信息窗体
    // closeInfoWindow = () => {
    //     console.log('kkkk')
    //     this.map.clearInfoWindow();
    // }

    intervalTimer = (index) => {
        let indexMarlers = this.map.getAllOverlays('marker')[index]
        let markersLen = this.map.getAllOverlays('marker').length - 1
        this.newInfoWindow(indexMarlers)
        this.map.setCenter(indexMarlers.getPosition())
        this.map.setZoom(creatRandomNumber(9, 13))
        this.map.setPitch(creatRandomNumber(7, 80))
        let newIndex = index >= markersLen ? 0 : index + 1
        this.setState({
            index: newIndex
        })
    }

    onChange = e => {
        let _this = this
        clearInterval(_this.timer)
        this.setState({
            value: e.target.value,
        });
        // let mouseTool = null
        // console.log('radio', e.target.value);
        // AMap.plugin(["AMap.MouseTool"],function() {
        //     mouseTool = new AMap.MouseTool(_this.map)
        //     console.log({mouseTool})
        // })
        switch(e.target.value){
            case 'marker':{
                _this.mouseTool.marker({
                //同Marker的Option设置
                });
                break;
            }
            case 'polyline':{
                _this.mouseTool.polyline({
                strokeColor:'#80d8ff'
                //同Polyline的Option设置
                });
                break;
            }
            case 'polygon':{
                _this.mouseTool.polygon({
                fillColor:'#00b0ff',
                strokeColor:'#80d8ff'
                //同Polygon的Option设置
                });
                break;
            }
            case 'rectangle':{
                _this.mouseTool.rectangle({
                fillColor:'#00b0ff',
                strokeColor:'#80d8ff'
                //同Polygon的Option设置
                });
                break;
            }
            case 'circle':{
                _this.mouseTool.circle({
                fillColor:'#00b0ff',
                strokeColor:'#80d8ff'
                //同Circle的Option设置
                });
                break;
            }
            default:
                break
        }
        //监听draw事件可获取画好的覆盖物
        _this.mouseTool.on('draw',function(e){
            let overlay = _this.state.overlays;
            overlay.push(e.obj)
            _this.setState({
                overlays: overlay
            })
            // _this.setState((value) => {
            //     return {
            //         overlays: overlay
            //     }
            // }, () => {
            //     alert('完成绘制')
            // })
            // alert('完成绘制')
            // console.log(_this.state.overlays)
            
        })
        
    };

    clearMapMarker = () => {
        this.map.remove(this.state.overlays)
        this.setState({
            overlays: []
        })
    }

    closrMapMarker = () => {
        this.mouseTool.close(true)//关闭，并清除覆盖物
        this.setState({
            value: ''
        })
    }

    render() {
        return (
            <div id="container">
                <div className='map_position'>{this.state.position}</div>
                <div className='map_leftBottom_icon'>
                    <div>
                        <img src={require('../../static/png/mapMarkerOne.png')} alt='mapMarkerOne'></img>
                        <span>标注一</span>
                    </div>
                    <div>
                        <img src={require('../../static/png/mapMarkerTwo.png')} alt='mapMarkerOne'></img>
                        <span>标注二</span>
                    </div>
                    <div>
                        <img src={require('../../static/png/mapMarkerThree.png')} alt='mapMarkerOne'></img>
                        <span>标注三</span>
                    </div>
                </div>
                <div className="input-card" title='操作说明：圆和矩形通过拖拽来绘制，其他覆盖物通过点击来绘制'>
                    <Radio.Group onChange={this.onChange} value={this.state.value}>
                        <Radio value='marker'>画点</Radio>
                        <Radio value='polyline'>画折线</Radio>
                        <Radio value='polygon'>画多边形</Radio>
                        <br></br>
                        <Radio  value='rectangle'>画矩形</Radio>
                        <Radio  value='circle'> 画圆</Radio>
                    </Radio.Group>
                    <Button.Group size='small' className="input-item">
                        <Button id="clear" onClick={this.clearMapMarker} type="success" danger>清除绘图</Button>
                        <Button id="close" onClick={this.closrMapMarker}>关闭绘图</Button>
                    </Button.Group>
                </div>
            </div>
        )
    }
}

export default MapMeasures