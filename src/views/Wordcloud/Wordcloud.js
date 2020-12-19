import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import echarts from 'echarts'
import 'echarts-wordcloud'
import { getWordcloud } from '../../requests'

class Wordcloud extends Component {
    static propTypes = {
        prop: PropTypes
    }
    constructor(prop){
        super(prop)
        this.state={
            keyWorld: ''
        }
        this.kpiRef = createRef()
    }

    componentDidMount() {
        this.kpiEcharts = echarts.init(this.kpiRef.current);
        this.kpiEcharts.on('click', (params) => {
            this.setState({
                keyWorld: params.name
            }, () => {
                this.initChartOption(this.state.dataList, this.state.keyWorld)
            })
            // this.props.onCkick(params.data)
        });
        let _this = this
        window.addEventListener("resize",function (){
            _this.kpiEcharts.resize();
        });
        this.setState({
            keyWordsList: this.props.keyWordsList
        })
        this.getData()
    }

    getData() {
        getWordcloud().then(resp => {
            if(resp && resp.list){
                this.setState({
                    dataList: resp.list
                })
                this.initChartOption(resp.list)
            }
        })
    }

    // ['(❤ ω ❤)', '爱❤情', '李颖❤', '东海❤', '喜欢你', '1314', '52013', '颖❤海', '在一起', '亲一个', '搂住你', '小宝贝', '乖宝宝', '要乖哦', '笑一个', '真乖啊', '小可爱', '小牛奶', '喵喵喵', '喵星人', '两个人', '要变美', '要变帅', '情侣❤', '走一起', '秀恩爱', '看电影', '要恋爱', '小甜甜', 'ILOVEU', '叫老公', '大胆爱', '要叫床', '霸占你', '是我的', '想你❤', '去见你', '小心肝', '要听话', '一起疯', '勇敢爱', '在等你', 'Mojito', '心上人', '爱丽丝', '朱丽叶', '祝英台', '颖❤颖', '我追你', '喝奶茶', '去看海', '带着你', '全世界', '我爱你', '牛奶颖', '保护我', '小吃货', '小饭桶', '一万年', '小公主', '我的妃', '抱紧我', '演唱会', '爱上我', '是唯一', '小霸王', '爱你哟', '爱❤你', '抱一抱', '举高高', '要睡你', '亲亲我', '缠❤绵', '掠夺你', '霸占你', '❤❤❤', '❤颖❤', '❤海❤', '❤帅❤', '美美哒', '❤美❤', '靓❤仔', '靓❤女']
    initChartOption(dataList, keyWorld) {
        let hasKeyWorld = keyWorld && keyWorld.length
        let maskImage = null
        let sizeRange = [5, 60]
        let size = ['10%', '75%']
        if(hasKeyWorld){
            sizeRange = [1, 20]
            size = ['1%', '15%']
            //调用函数获取到img的data数据
            let data = this.canvasWrapText({canvas:document.getElementById("myCanvas"),text: keyWorld});
            maskImage = new Image();//可以根据图片形状生成有形状的词云图
            maskImage.src=data
            // maskImage.src=require('../../static/jpg/4.jpg')
        }
        let option = {
            backgroundColor: '#F7F7F7',
            tooltip: {
                trigger: 'item',
                axisPointer: {
                type: 'none'
                },
                position: "top",
                formatter: function({name, value}) {
                return `${name}: --> ${'往后余生都是你'}`
                }
            },
            series: [{
                name: '搜索指数',
                left: 'center',
                top: 'center',
                width: '100%',
                height: '100%',
                right: null,
                bottom: null,
                type: 'wordCloud',
                size: ['1%', '15%'],
                sizeRange: sizeRange,
                //textRotation: [0, 45, 90, -45],
                rotationRange: [-45, 90],
                //shape: 'circle',
                // gridSize: 10,
                
                // shape: 'triangle',
                maskImage: maskImage,
                textPadding: 0,
                autoSize: {
                    enable: true,
                    minSize: 3
                },
                textStyle: {
                    normal: {
                        color: function() {
                            return 'rgb(' + [
                                Math.round(Math.random() * 250),
                                Math.round(Math.random() * 250),
                                Math.round(Math.random() * 250)
                            ].join(',') + ')';
                        }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: '#FF6A00'
                    }
                },
                data: dataList
            }]
        };
        // this.kpiEcharts.setOption(option, true);
        let _this = this
        if(hasKeyWorld){
            maskImage.onload = function() {
                _this.kpiEcharts.setOption(option, false);
            };
        }else{
            _this.kpiEcharts.setOption(option, false);
        }
    }

    //绘制文字到canvas，判断换行位置，和设置canvas高度
    canvasWrapText(options) {
        var settings = {
            canvas:document.getElementById("myCanvas")[0], //canvas对象，必填，不填写默认找到页面中的第一个canvas
            canvasWidth:750, //canvas的宽度
            drawStartX:50, //绘制字符串起始x坐标
            drawStartY:220, //绘制字符串起始y坐标
            lineHeight:70, //文字的行高
            font:"220px bold Arial", //文字样式
            text:"请修改掉默认的配置", //需要绘制的文本
            drawWidth:500, //文字显示的宽度
            color:"#000000", //文字的颜色
            backgroundColor:"#ffffff", //背景颜色
        };
    
        //将传入的配置覆盖掉默认配置
        if(!!options && typeof options === "object"){
            for(var i in options){
                settings[i] = options[i];
            }
        }
    
        //获取2d的上线文开始设置相关属性
        var canvas = settings.canvas;
        canvas.width = settings.canvasWidth;
        var ctx = canvas.getContext("2d");
    
        //绘制背景色
        ctx.fillStyle = settings.backgroundColor;
        ctx.fillRect(0,0,canvas.width,canvas.height);
    
        //绘制文字
        ctx.font = settings.font;
        ctx.fillStyle = settings.color;
        var lineWidth = 0; //当前行的绘制的宽度
        var lastTextIndex = 0; //已经绘制上canvas最后的一个字符的下标
        //由于改变canvas 的高度会导致绘制的纹理被清空，所以，不预先绘制，先放入到一个数组当中
        var arr = [];
        for(var i = 0; i<settings.text.length; i++){
            //获取当前的截取的字符串的宽度
            lineWidth = ctx.measureText(settings.text.substr(lastTextIndex,i-lastTextIndex)).width;
            
            if(lineWidth > settings.drawWidth){
                //判断最后一位是否是标点符号
                if(judgePunctuationMarks(settings.text[i-1])){
                    arr.push(settings.text.substr(lastTextIndex,i-lastTextIndex));
                    lastTextIndex = i;
                }else{
                    arr.push(settings.text.substr(lastTextIndex,i-lastTextIndex-1));
                    lastTextIndex = i-1;
                }
            }
            //将最后多余的一部分添加到数组
            if(i === settings.text.length - 1){
                arr.push(settings.text.substr(lastTextIndex,i-lastTextIndex+1));
            }
        }
    
        //根据arr的长度设置canvas的高度
        canvas.height = arr.length*settings.lineHeight+settings.drawStartY;
    
        ctx.font = settings.font;
        ctx.fillStyle = settings.color;
        for(var i =0; i<arr.length; i++){
            ctx.fillText(arr[i],settings.drawStartX,settings.drawStartY+i*settings.lineHeight);
        }
        //判断是否是需要避开的标签符号
        function judgePunctuationMarks(value) {
            var arr = [".",",",";","?","!",":","\"","，","。","？","！","；","：","、"];
            for(var i = 0; i< arr.length; i++){
                if(value === arr[i]){
                    return true;
                }
            }
            return false;
        }
        return canvas.toDataURL();
    }
    
    //清空画布
    clearCanvas() {  
        var c=document.getElementById("myCanvas");  
        var cxt=c.getContext("2d");  
        cxt.clearRect(0,0,c.width,c.height);  
    } 

    render() {
        return (
            <>
            <canvas id="myCanvas" style={{border: "1px solid #000000", display: 'none'}}></canvas>
            <div style={{height: '100%', width: '100%'}} ref={this.kpiRef}>
                
            </div>
            </>
        )
    }
}

export default Wordcloud