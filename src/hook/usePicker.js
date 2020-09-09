import React from "react";
import moment from "moment";

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
    //https://cors-anywhere.herokuapp.com/
    //for the cors origin
    //put https://cors-anywhere.herokuapp.com/http://mesurit.com:8086/api/data/search/
    try {
      const response = await fetch("http://mesurit.com:8086/api/data/search/", {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          Authorization: `Basic ${btoa(`Guest:WaterFlow`)}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const [result] = await response.json();
      //if you want to show result please uncomment  setChartData(result); and comment down hardcode
      // setChartData(result);
      console.log("result", result);
    } catch (error) {
      console.trace(error);
    }
    //HARDCODE
    setChartData({
      chartConfig: {
        input: 1,
        chartType: "column",
        textToShow: "Well",
        inputType: "Well",
        dateFormat: "%s/%s/%s %s:%s",
      },
      data: [
        ["01/08/20 00:00", 595],
        ["02/08/20 00:00", 975],
        ["03/08/20 00:00", 1032],
        ["04/08/20 00:00", 1708],
        ["05/08/20 00:00", 1875],
        ["06/08/20 00:00", 338],
        ["07/08/20 00:00", 799],
        ["08/08/20 00:00", 1293],
        ["09/08/20 00:00", 899],
        ["10/08/20 00:00", 845],
        ["11/08/20 00:00", 15],
        ["12/08/20 00:00", 1579],
        ["13/08/20 00:00", 1095],
        ["14/08/20 00:00", 1221],
        ["15/08/20 00:00", 775],
      ],
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
