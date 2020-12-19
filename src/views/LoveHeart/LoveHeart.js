import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import './loveHeart.less'

import myHtml from './myHtml.js'
import myHtml2 from './myHtml2.js'
import myHtml3 from './myHtml3.js'
import myHtml4 from './myHtml4.js'
import myHtml5 from './myHtml5.js'

class LoveHeart extends Component {
    static propTypes = {
        prop: PropTypes
    }
    constructor(prop){
        super(prop)
        this.state={
        }
    }

    componentDidMount() {
        this.initContener()
    }

    componentWillUnmount(){

    }

    initContener() {
      var heart=document.getElementById("heart");
      var html="";
      for(var i=0;i<36;i++){
          html+="<div class='line' style='transform:rotateY("+i*10+"deg) rotateZ(45deg) translateX(50px)'></div>";
      }
      heart.innerHTML += html;
    }
    render() {
        return (
            <div style={{height: '100%', width: '100%', display: 'flex', position: 'relative'}}>
                <iframe
                    title="resg"
                    srcDoc={myHtml}
                    style={{ width: '100%', border: '0px', flex: 1}}
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    scrolling="auto"
                />
                <div id="heart" style={{position: 'absolute', userSelect: 'none'}} >
                    {/* <div id="word">I LOVE You but also best you</div> */}
                    <div id="word"><br/>颖<br />牛奶<br />答应我<br />下半辈子<br />做我的女人</div>
                </div>
            </div>
        )
    }
}

export default LoveHeart