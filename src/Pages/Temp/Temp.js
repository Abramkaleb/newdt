import React, {useEffect, useState} from 'react'
// import './Exhaust.css'
import { Chart } from 'react-google-charts';
import axios from 'axios'

const Temp = () => {
  const Getrealtime = 'http://localhost:8000/api';
  const [exhaustValue, setExhaustValue] = useState(0);
  const getexhaust = async () => 
  {
    try {
      const response = await axios.get(`${Getrealtime}/antares`);
      const value = parseInt(response["data"]["record"]["exhaust"]) 
      setExhaustValue(value)
      console.log(exhaustValue)
    } catch (e) {
      console.log(e.message);
    }
  }

  useEffect(() => {
    getexhaust();
  }, )

  return (
    <div className='exhaust-container'>
      <Chart className='gauge-chart'
        width={'200px'}
        height={'200px'}
        chartType="Gauge"
        loader={<div>Exhaust Chart</div>}
        data={[
          ['Label', 'Value'],
          ['Temp', exhaustValue]
        ]}
        options={{
          max:300,
          majorTicks: ['0','50','100','150','200','250','300'],
          greenFrom:0,
          greenTo:225,
          yellowFrom: 225,
          yellowTo: 270,
          redFrom: 270,
          redTo:300,
          minorTicks: 10,
          width: 180,

        }}
        />
    </div>
  )
}

export default Temp;