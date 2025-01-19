import React, { Component } from "react";

export default class Clock extends Component {
  constructor() {
    super();
    this.month_list = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    this.day_list = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    this.state = {
      hour_12: true,
      current_time: new Date(),
    };
  }

  componentDidMount() {
    this.update_time = setInterval(() => {
      this.setState({ current_time: new Date() });
    }, 10 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.update_time);
  }

  render() {
    const { current_time } = this.state;
    const day = this.day_list[current_time.getDay()];
    const hour = current_time.getHours();
    const minute = current_time.getMinutes();
    const month = this.month_list[current_time.getMonth()];
    const date = current_time.getDate();
    const meridiem = hour < 12 ? "AM" : "PM";

    return (
      <span>{`${day} ${month} ${date} ${hour}:${minute} ${meridiem}`}</span>
    );
  }
}
