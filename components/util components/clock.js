import React, { Component } from "react";

export default class Clock extends Component {
  constructor() {
    super();
    this.monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    this.dayList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    this.state = {
      is12HourFormat: true,
      currentTime: new Date(),
    };
  }

  componentDidMount() {
    this.updateTimeInterval = setInterval(() => {
      this.setState({ currentTime: new Date() });
    }, 10 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.updateTimeInterval);
  }

  formatTime(hour, minute, is12HourFormat) {
    const meridiem = hour < 12 ? "AM" : "PM";
    if (is12HourFormat && hour > 12) hour -= 12;
    if (minute.toString().length === 1) minute = "0" + minute;
    return `${hour}:${minute} ${is12HourFormat ? meridiem : ""}`;
  }

  render() {
    const { currentTime } = this.state;
    const day = this.dayList[currentTime.getDay()];
    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();
    const month = this.monthList[currentTime.getMonth()];
    const date = currentTime.getDate();
    const time = this.formatTime(hour, minute, this.state.is12HourFormat);

    return <span>{`${day} ${month} ${date} ${time}`}</span>;
  }
}
