import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./Calendar.css";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(2);
  const [year, setYear] = useState(2025);
  const [expenseDates] = useState([1, 4, 5, 11, 12, 19, 20, 27, 31]);
  const svgRef = useRef();

  const month = 0;
  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startingDay = firstDayOfMonth.getDay();

  const days = Array(startingDay)
    .fill(null)
    .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    
    // Dynamic sizing based on container width
    const containerWidth = Math.min(window.innerWidth * 0.85, 280); // Slightly smaller for better fit
    const cellSize = containerWidth / 7; // 7 columns, slightly larger cells
    const width = containerWidth;
    const height = cellSize * 7; // Adjust height based on rows

    svg.attr("width", width).attr("height", height);
    svg.selectAll("*").remove();

    // Day Labels
    const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];
    svg
      .selectAll(".day-label")
      .data(dayLabels)
      .enter()
      .append("text")
      .attr("x", (d, i) => i * cellSize + cellSize / 2)
      .attr("y", cellSize / 2)
      .attr("text-anchor", "middle")
      .attr("class", "day-label")
      .text((d) => d);

    // Calendar Grid
    const cells = svg
      .selectAll(".day")
      .data(days)
      .enter()
      .append("g")
      .attr("class", "day")
      .attr("transform", (d, i) => {
        const row = Math.floor(i / 7);
        const col = i % 7;
        return `translate(${col * cellSize}, ${row * cellSize + cellSize})`;
      });

    // Circles for Days
    cells
      .filter((d) => d !== null)
      .append("circle")
      .attr("cx", cellSize / 2)
      .attr("cy", cellSize / 2)
      .attr("r", cellSize / 2 - 3) // Slightly larger circles
      .attr("class", (d) =>
        d === selectedDate
          ? "selected"
          : expenseDates.includes(d)
          ? "expense"
          : ""
      )
      .on("click", (_, d) => setSelectedDate(d));

    // Day Numbers
    cells
      .filter((d) => d !== null)
      .append("text")
      .attr("x", cellSize / 2)
      .attr("y", cellSize / 2 + 5)
      .attr("text-anchor", "middle")
      .attr("class", "day-text")
      .text((d) => (d < 10 ? `0${d}` : d));
  }, [selectedDate, expenseDates, days]);

  const handlePrevYear = () => setYear(year - 1);
  const handleNextYear = () => setYear(year + 1);

  return (
    <div className="calendar-container">
      <div className="year-selector">
        <button onClick={handlePrevYear}>❮</button>
        <span>{year}</span>
        <button onClick={handleNextYear}>❯</button>
      </div>
      <svg ref={svgRef}></svg>
      <div className="legend">
        <span className="expense-legend">Expense added</span>
        <span className="selected-legend">Selected</span>
      </div>
    </div>
  );
};

export default Calendar;