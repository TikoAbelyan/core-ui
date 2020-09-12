import React from "react";
import moment from "moment";
import axios from "axios";

export const usePicker = () => {
  const [date, setDate] = React.useState({ startDate: null, endDate: null });
  const [chartData, setChartData] = React.useState({ data: [] });

  const submitFunction = async (startDate, endDate) => {
    const startArr = moment(startDate).format("YYYY/M/DD").split("/");
    const endArr = moment(endDate).format("YYYY/M/DD").split("/");

    const requestBody = {
      searchDateEnd: {
        day: endArr[2],
        month: endArr[1],
        year: endArr[0],
      },
      searchDateStart: {
        day: startArr[2],
        month: startArr[1],
        year: startArr[0],
      },
      deviceType: "WELL",
      measurementType: "NORMAL",
    };

    axios
      .post(
        "api/data/search/",
        {
          ...requestBody,
        },
        {
          headers: {
            Authorization: `Basic ${btoa(`Guest:WaterFlow`)}`,
          },
        }
      )
      .then((response) => {
        setChartData(response.data[0]);
      })
      .catch((error) => {
        console.trace(error);
      });
  };

  function submitFilter({ startDate, endDate }) {
    if (endDate !== date.endDate) {
      submitFunction(startDate, endDate);
    }

    setDate({ startDate, endDate });
  }
  return {
    date,
    chartData,
    submitFilter,
  };
};

const initialState = { xAxis: [], yAxis: [] };

export const useGraph = (chartData) => {
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

  return {
    xAxis,
    yAxis,
  };
};
