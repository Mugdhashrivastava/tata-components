import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./Calendar.css";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(2); // Default selected date
  const [year, setYear] = useState(2025); // Dynamic year
  const [expenseDates] = useState([1, 4, 5, 11, 12, 19, 20, 27, 31]); // Expense dates
  const svgRef = useRef();

  const month = 0; // January (0-based)
  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startingDay = firstDayOfMonth.getDay();

  const days = Array(startingDay)
    .fill(null)
    .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 280;
    const height = 280;
    const cellSize = 35;

    svg.attr("width", width).attr("height", height);
    svg.selectAll("*").remove(); // Clear previous render

    // Day Labels (Mon-Sun)
    const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];
    svg
      .selectAll(".day-label")
      .data(dayLabels)
      .enter()
      .append("text")
      .attr("x", (d, i) => i * cellSize + cellSize / 2)
      .attr("y", 20)
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
        return `translate(${col * cellSize}, ${row * cellSize + 40})`;
      });

    // Circles for Days
    cells
      .filter((d) => d !== null)
      .append("circle")
      .attr("cx", cellSize / 2)
      .attr("cy", cellSize / 2)
      .attr("r", cellSize / 2 - 4)
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
      {/* Replaced year-slider with year-selector using arrows */}
      <div className="year-selector">
        <button onClick={handlePrevYear}>❮</button>
        <span>{year}</span>
        <button onClick={handleNextYear}>❯</button>
      </div>

      <svg ref={svgRef}></svg>

      {/* Legend */}
      <div className="legend">
        <span className="expense-legend">Expense added</span>
        <span className="selected-legend">Selected</span>
      </div>
    </div>
  );
};

export default Calendar;