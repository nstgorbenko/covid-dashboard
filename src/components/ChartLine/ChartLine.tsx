import React from 'react';
import { Line } from 'react-chartjs-2';
import styles from './ChartLine.scss';

interface ChartLineProps {
  values: {
    dates: Array<string>,
    counts: Array<number>,
  };
}

const ChartLine: React.FC<ChartLineProps> = (props: ChartLineProps) => {
  const { values } = props;

  const data: Chart.ChartData = {
    labels: values.dates,
    datasets:[
      {
        data: values.counts,
        backgroundColor: '#238636',
        pointBorderWidth: 1,
        pointBorderColor: '#238636',
        pointStyle: 'circle',
        radius: 1,
      }
    ]
  };

  return (
    <div className={styles['chart__wrapper']}>
      <Line
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          tooltips: {
            intersect: false,
            titleFontColor: '#c9d1d9',
            backgroundColor: '#474f59',
            titleAlign: 'center',
            bodyFontColor: '#c9d1d9',
            displayColors: false,
            callbacks: {
              label: (tooltipItem: any) => tooltipItem.yLabel.toLocaleString()
            }
          },
          scales: {
            xAxes: [{
              gridLines: {
                drawBorder: false,
              },
              ticks: {
                beginAtZero: true,
                lineHeight: 1.2,
                fontSize: 15,
                autoSkipPadding: 15,
              },
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true,
                lineHeight: 1.2,
                fontSize: 15,
                autoSkipPadding: 15,
                callback: (value: any) => value.toLocaleString(),
              },
            }],
          },
        }}
      />
    </div>
  );
};

export default ChartLine;
