import React from 'react'
import { Bar } from 'react-chartjs-2'
import Chart from 'chart.js/auto'

import { useTracker } from 'hooks';
import { commafy, friendlyDate } from 'lib/util';

const BarChart = () => {
    const { data: stats = {} } = useTracker({
        api: 'all',
      })
    return (
        <div>
            <Bar
            data = {{
                labels: ['Cases', 'Recovered', 'Active', 'Deaths'],
                datasets: [
                    {
                        label: 'Covid Overall',
                        data: [stats?.cases, stats?.recovered, stats?.active, stats?.deaths],
                        backgroundColor: [
                            'rgba(255, 0, 0)',
                            'rgba(0, 255, 0)',
                            'rgba(0, 0, 255)',
                            'rgba(0, 0, 0)'
                        ],
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
   
export default BarChart

