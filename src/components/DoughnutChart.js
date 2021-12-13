import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import Chart from 'chart.js/auto'

import { useTracker } from 'hooks';
import { commafy, friendlyDate } from 'lib/util';

const DoughnutChart = () => {
    const { data: stats = {} } = useTracker({
        api: 'all',
      })
    return (
        <div>
            <Doughnut
            data = {{
                labels: ['Today Cases', 'Today Recovered', 'Today Deaths'],
                datasets: [
                    {
                        label: 'Covid Today',
                        data: [stats?.todayCases, stats?.todayRecovered, stats?.todayDeaths],
                        backgroundColor: [
                            'rgba(255, 0, 0)',
                            'rgba(0, 255, 0)',
                            'rgba(0, 0, 0)'
                        ]
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

export default DoughnutChart 