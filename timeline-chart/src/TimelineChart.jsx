import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import "./TimelineChart.css";

const TimelineChart = () => {
  const [year, setYear] = useState(2024);
  const chartRef = useRef();

  const handlePrevYear = () => setYear(year - 1);
  const handleNextYear = () => setYear(year + 1);

  const chartData = [
    { label: "Jan", value: 80, color: "#6A95FF" },
    { label: "Feb", value: 40, color: "#6A95FF" },
    { label: "Mar", value: 60, color: "#6A95FF" },
    { label: "Apr", value: 70, color: "#6A95FF" },
    { label: "May", value: 50, color: "#6A95FF" },
    { label: "Jun", value: 90, color: "#6A95FF" },
    { label: "Jul", value: 120, color: "#6A95FF" },
    { label: "Aug", value: 50, color: "#6A95FF" },
    { label: "Sep", value: 80, color: "#6A95FF" },
    { label: "Oct", value: 85, color: "#6A95FF" },
    { label: "Nov", value: 75, color: "#6A95FF" },
    { label: "Dec", value: 65, color: "#003087" },
  ];

  const monthlyData = {
    2025: [
      { month: "January", transactions: "08 transactions", percentage: "12%", amount: "₹27,800" },
    ],
    2024: [
      { month: "December", transactions: "08 transactions", percentage: "12%", amount: "₹27,800" },
      { month: "November", transactions: "08 transactions", percentage: "12%", amount: "₹27,800" },
      { month: "October", transactions: "08 transactions", percentage: "12%", amount: "₹27,800" },
      { month: "August", transactions: "08 transactions", percentage: "12%", amount: "₹27,800" },
      { month: "June", transactions: "08 transactions", percentage: "12%", amount: "₹27,800" },
    ],
    2023: [
      { month: "December", transactions: "08 transactions", percentage: "12%", amount: "₹27,800" },
      { month: "November", transactions: "08 transactions", percentage: "12%", amount: "₹27,800" },
      { month: "October", transactions: "08 transactions", percentage: "12%", amount: "₹27,800" },
    ],
  };

  useEffect(() => {
    drawChart();
  }, [year]);

  const drawChart = () => {
    const width = 350;
    const height = 200;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    d3.select(chartRef.current).select("svg").remove();

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const xScale = d3
      .scaleBand()
      .domain(chartData.map((d) => d.label))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(chartData, (d) => d.value) + 20])
      .range([height - margin.bottom, margin.top]);

    svg
      .selectAll(".bar")
      .data(chartData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.label))
      .attr("y", (d) => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - margin.bottom - yScale(d.value))
      .attr("fill", (d) => d.color);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickSize(0))
      .selectAll("text")
      .style("font-size", "12px")
      .style("fill", "#333");

    svg.selectAll(".domain, .tick line").remove();
  };

  return (
    <div className="timeline-container">
      <h2 className="timeline-title">Timeline</h2>

      <div className="content-wrapper">
        <div className="chart-section">
          <div className="year-selector">
            <button onClick={handlePrevYear}>❮</button>
            <span>{year}</span>
            <button onClick={handleNextYear}>❯</button>
          </div>

          <div ref={chartRef} className="chart-container"></div>

          <div className="legend">
            <div>
              <span className="legend-color spent"></span> Spent months
            </div>
            <div>
              <span className="legend-color current"></span> Current month
            </div>
          </div>
        </div>

        <div className="details-section">
          <div className="highlight-section">
            <span className="highlight-icon">💡</span>
            <span>You spent most of your budget in January</span>
          </div>

          <div className="monthly-details">
            {Object.keys(monthlyData)
              .sort((a, b) => b - a)
              .map((dataYear) => (
                <div key={dataYear} className="year-section">
                  <h3 className="year-title">{dataYear}</h3>
                  {monthlyData[dataYear].map((monthData, index) => (
                    <div key={index} className="month-item">
                      <div className="month-content">
                        <span className="month-name">{monthData.month}</span>
                        <span className="month-transactions">{monthData.transactions}</span>
                        <span className="month-percentage">{monthData.percentage}</span>
                        <span className="month-amount">{monthData.amount}</span>
                      </div>
                      <button className="month-button">❯</button>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineChart;