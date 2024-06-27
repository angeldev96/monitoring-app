import 'echarts-liquidfill';
import PropTypes from 'prop-types';
import * as echarts from 'echarts/core';
import React, { useRef, useEffect } from 'react';


const WaterLevelChart = ({ level }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    const normalizedLevel = level / 100;

    // Determine the number of waves based on the water level
    let data = [];
    if (normalizedLevel > 0.6) {
      data = [normalizedLevel, 0.6, 0.4, 0.2];
    } else if (normalizedLevel > 0.4) {
      data = [normalizedLevel, 0.4, 0.2];
    } else if (normalizedLevel > 0.2) {
      data = [normalizedLevel, 0.2];
    } else {
      data = [normalizedLevel];
    }

    const option = {
      series: [
        {
          type: 'liquidFill',
          data,
          radius: '80%',
          outline: {
            show: true,
          },
          backgroundStyle: {
            color: '#ffffff',
          },
          itemStyle: {
            opacity: 0.6,
            shadowBlur: 0,
            shadowColor: 'rgba(0, 0, 0, 0.4)',
          },
          label: {
            formatter: () => `${Math.round(normalizedLevel * 100)}%`,
            fontSize: 40,
            color: '#007FFF',
          },
        },
      ],
    };

    chart.setOption(option);

    return () => {
      chart.dispose();
    };
  }, [level]);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

WaterLevelChart.propTypes = {
  level: PropTypes.number.isRequired,
};

export default WaterLevelChart;