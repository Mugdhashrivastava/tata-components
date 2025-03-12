import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./TypesChart.css";

const TypesChart = () => {
  const chartRef = useRef();

  useEffect(() => {
    const data = [
      { label: "Labour", value: 35, color: "#FBC02D" },
      { label: "Materials", value: 30, color: "#5C88DA" },
      { label: "Others", value: 35, color: "#9E9E9E" },
    ];

    const width = 350, height = 350, radius = Math.min(width, height) / 2;

    const svg = d3.select(chartRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie().value(d => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);
    
    const arcs = svg.selectAll("arc")
      .data(pie(data))
      .enter()
      .append("g");

    arcs.append("path")
      .attr("d", arc)
      .attr("fill", d => d.data.color);

    arcs.append("text")
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .attr("font-size", "14px")
      .text(d => `${d.data.value}%`);

  }, []);

  return (
    <div className="chart-container">
      <svg ref={chartRef}></svg>
      <div className="legend">
        <div className="legend-item">
          <span className="color-box" style={{ backgroundColor: "#FBC02D" }}></span>
          <span>Labour</span>
        </div>
        <div className="legend-item">
          <span className="color-box" style={{ backgroundColor: "#5C88DA" }}></span>
          <span>Materials</span>
        </div>
        <div className="legend-item">
          <span className="color-box" style={{ backgroundColor: "#9E9E9E" }}></span>
          <span>Others</span>
        </div>
      </div>
    </div>
  );
};

export default TypesChart;
