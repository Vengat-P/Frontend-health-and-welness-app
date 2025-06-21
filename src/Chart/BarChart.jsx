import React from 'react';
import {Bar} from 'react-chartjs-2'
import { Chart as ChartJS ,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend } from 'chart.js';

ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend)
const BarChart = ({chartData}) => {
    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Tracking Report</h2>
          <Bar
            data={chartData}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: 'Calories per Day  ',
                },
                legend: {
                  display: true,
                  position: 'top',
                },
              },
              responsive: true,
            }}
          />
        </div>
    );
};

export default BarChart;