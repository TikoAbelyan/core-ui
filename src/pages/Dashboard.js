import React from "react";
import moment from "moment";
import {
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CProgress,
  CRow,
} from "@coreui/react";

import DatePicker from "../components/DatePicker";
import Chart from "../components/Chart";

const Dashboard = () => {
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

    try {
      const response = await fetch(
        "https://cors-anywhere.herokuapp.com/http://mesurit.com:8086/api/data/search/",
        {
          method: "POST",
          mode: "cors",
          credentials: "same-origin",
          headers: {
            Authorization: `Basic ${btoa(`Guest:WaterFlow`)}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
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
  return (
    <>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">
                Traffic
              </h4>
              <div className="small text-muted">November 2017</div>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
              <CButtonGroup className="float-right mr-3">
                <DatePicker submitFilter={submitFilter} date={date} />
              </CButtonGroup>
            </CCol>
          </CRow>
          <Chart chartData={chartData.data} />
        </CCardBody>
        <CCardFooter>
          <CRow className="text-center">
            <CCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">Well</div>
              <strong>1500</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="info"
                value={90}
              />
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>
    </>
  );
};

export default Dashboard;
