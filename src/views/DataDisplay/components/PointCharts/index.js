import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {
  Chart,
  Point,
} from 'bizcharts';


function PointCharts(props) {
    
   const [data, setData] = useState();
   useEffect(() => {
     fetch('https://alifd.alibabausercontent.com/materials/@bizcharts/point-scatter/0.2.8/mock.json')
       .then(res => res.json())
       .then(data => {
         console.log(data)
         setData(data);
       })
   }, [])
    return (
    <Chart
        height={250}
        data={data}
        padding={[10, 20, 50, 40]}
        autoFit
        interactions={['legend-highlight']}
    >
    <Point
        position="height*weight"
        color="gender"
        shape="circle"
        style={{
        fillOpacity: 0.85
        }} />
    </Chart>
    )
}

PointCharts.propTypes = {

}

export default PointCharts

