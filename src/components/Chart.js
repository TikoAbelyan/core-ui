import React from "react";
import { CChartLine } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils/src";

const brandInfo = getStyle("info") || "#20a8d8";
const initialState = { xAxis: [], yAxis: [] };
const MainChart = ({ chartData }) => {
  const [{ xAxis, yAxis }, setState] = React.useState(initialState);
  React.useEffect(() => {
    setState(
      chartData.reduce(
        (acc, [first, second]) => {
          acc.xAxis.push(first);
          acc.yAxis.push(second);
          return acc;
        },
        { xAxis: [], yAxis: [] }
      )
    );
  }, [chartData]);

  const defaultDatasets = (() => {
    let elements = 27;
    const data = [];
    for (let i = 0; i <= elements; i++) {
      data.push(...yAxis);
    }

    return [
      {
        label: "My First dataset",
        backgroundColor: hexToRgba(brandInfo, 10),
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        data: data,
      },
    ];
  })();

  const defaultOptions = (() => {
    return {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: Math.ceil(250 / 5),
              max: 2000,
            },
            gridLines: {
              display: true,
            },
          },
        ],
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        },
      },
    };
  })();

  return (
    <CChartLine
      style={{ height: "300px", marginTop: "40px" }}
      datasets={defaultDatasets}
      options={defaultOptions}
      labels={xAxis}
    />
  );
};

export default MainChart;
