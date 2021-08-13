export const initializeChartOptions = config => {
  return {
    tooltip: {},
    title: {
      text: config.currentValue.name,
      style: {
        fontFamily: 'Roboto Regular, sans-serif',
        fontWeight: 'bold',
        fontSize: '16px',
        color: '#243b53',
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: '',
        data: [],
        type: 'spline',
      },
    ],
    lang: {
      noData: 'no data available',
    },
    noData: {
      style: {
        fontFamily: 'Roboto Regular, sans-serif',
        fontWeight: 'bold',
        fontSize: '14px',
        color: '#bcccdc',
      },
    },
    xAxis: {
      plotBands: [],
    },
    yAxis: {
      title: {
        text: undefined,
      },
      plotLines: [],
    },
    plotOptions: {
      spline: {
        lineWidth: 2,
        states: {
          hover: {
            lineWidth: 2,
          },
        },
        marker: {
          enabled: false,
        },
      },
      series: {
        cursor: 'pointer',
        point: {
          events: {},
        },
      },
    },
  };
};
