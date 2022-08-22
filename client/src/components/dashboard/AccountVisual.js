import { Chart } from 'react-google-charts';

function AccountVisual({ stocks }) {
  const data = [
    ["Stock", "Number of Share"],
  ];

  for (const stock of stocks) {
    data.push([stock.stock_symbol, stock.amount_own]);
  };

  const options = {
    width: '100%',
    height: '370px',
    backgroundColor: 'transparent',
    legend: {
      textStyle: {
        color: 'white'
      }
    },
    chartArea: {
      left: 0,
      top: 0,
      width: '100%',
      height: '100%'
    }
  };

  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      style={{ margin: "auto 0" }}
    />
  );
};

export default AccountVisual;