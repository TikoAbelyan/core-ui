import React from "react";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import { CCard, CCardHeader, CCardBody, CBadge } from "@coreui/react";

const DatePicker = ({ submitFilter, date }) => {
  const [focused, setFocused] = React.useState();

  return (
    <DateRangePicker
      startDate={date.startDate}
      startDateId="startDate"
      endDate={date.endDate}
      endDateId="endDate"
      onDatesChange={(value) => submitFilter(value)}
      focusedInput={focused}
      onFocusChange={(focusedInput) => setFocused(focusedInput)}
      orientation="horizontal"
      openDirection="down"
    />
  );
};

export default DatePicker;
