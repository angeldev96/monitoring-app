import PropTypes from 'prop-types';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import React, { useRef, useEffect } from 'react';
import { CanvasRenderer } from 'echarts/renderers';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';

echarts.use([TooltipComponent, LegendComponent, GridComponent, LineChart, CanvasRenderer]);

const WaterLevelHistoryChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    const option = {
      xAxis: {
        type: 'category',
        data: data.map(entry => new Date(entry.timestamp).toLocaleDateString()),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: data.map(entry => entry.level),
          type: 'line',
        },
      ],
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
    };

    chart.setOption(option);

    return () => {
      chart.dispose();
    };
  }, [data]);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

WaterLevelHistoryChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      timestamp: PropTypes.string.isRequired,
      level: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default WaterLevelHistoryChart;
