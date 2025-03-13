import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import "./TimelineChart.css";

const TimelineChart = () => {
  const [year, setYear] = useState(2024);
  const chartRef = useRef();

  const handlePrevYear = () => setYear(year - 1);
  const handleNextYear = () => setYear(year + 1);

  const data = [
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
      .domain(data.map((d) => d.label))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) + 20])
      .range([height - margin.bottom, margin.top]);

    svg
      .selectAll(".bar")
      .data(data)
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

      {/* Year Navigation */}
      <div className="year-selector">
        <button onClick={handlePrevYear}>❮</button>
        <span>{year}</span>
        <button onClick={handleNextYear}>❯</button>
      </div>

      {/* Chart */}
      <div ref={chartRef} className="chart-container"></div>

      {/* Legend */}
      <div className="legend">
        <div>
          <span className="legend-color spent"></span> Spent months
        </div>
        <div>
          <span className="legend-color current"></span> Current month
        </div>
      </div>
    </div>
  );
};

export default TimelineChart;




