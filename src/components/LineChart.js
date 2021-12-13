import React from 'react'
import { Line } from 'react-chartjs-2'
import Chart from 'chart.js/auto'

import { useTracker } from 'hooks';
import { commafy, friendlyDate } from 'lib/util';

const LineChart = () => {
    const { data: stats = {} } = useTracker({
        api: 'all',
      })
    return (
        <div>
            <Line
            data = {{
                labels: ['Active Per One Million', 'Recovered Per One Million', 'Critical Per One Million', 'Deaths Per One Million'],
                datasets: [
                    {
                        label: 'Per One Million People',
                        data: [stats?.activePerOneMillion, stats?.recoveredPerOneMillion, stats?.criticalPerOneMillion, stats?.deathsPerOneMillion],
                        backgroundColor: [
                            'rgba(0, 0, 255)',
                            'rgba(0, 255, 0)',
                            'rgba(125, 0, 255)',
                            'rgba(0, 0, 0)'                        ],
                        borderColor: [
                            'rgba(255, 255, 255)',
                            'rgba(255, 255, 255)',
                            'rgba(255, 255, 255)',
                            'rgba(255, 255, 255)'
                        ],
                        borderWidth: 1
                    }
                ]
            }} 
            height={500}
            width={500}
            options={{
                maintainAspectRatio: false,
            }}
            />
        </div>
    )
}    
   
export default LineChart