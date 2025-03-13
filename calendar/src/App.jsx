import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./Calendar.css";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(2); // Default selected date
  const [expenseDates] = useState([1, 4, 5, 11, 12, 19, 20]); // Example dates with expenses
  const [year, setYear] = useState(2025); // Default year
  const svgRef = useRef();

  // Generate month and days dynamically
  const month = 0; // January (0-based index)
  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startingDay = firstDayOfMonth.getDay();

  // Generate an array of days, including empty slots for days before the 1st
  const days = Array(startingDay).fill(null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 300;
    const height = 300;
    const cellSize = 40;

    svg.attr("width", width).attr("height", height);
    svg.selectAll("*").remove(); // Clear previous render

    // Day labels
    const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];
    svg
      .selectAll(".day-label")
      .data(dayLabels)
      .enter()
      .append("text")
      .attr("x", (d, i) => i * cellSize + cellSize / 2)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .text((d) => d);

    // Grid of days
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

    // Add circles for each day
    cells
      .filter((d) => d !== null)
      .append("circle")
      .attr("cx", cellSize / 2)
      .attr("cy", cellSize / 2)
      .attr("r", cellSize / 2 - 2)
      .attr("class", (d) => {
        if (d === selectedDate) return "selected";
        if (expenseDates.includes(d)) return "expense";
        return "";
      })
      .on("click", (_, d) => setSelectedDate(d));

    // Add day numbers
    cells
      .filter((d) => d !== null)
      .append("text")
      .attr("x", cellSize / 2)
      .attr("y", cellSize / 2 + 5)
      .attr("text-anchor", "middle")
      .text((d) => (d < 10 ? `0${d}` : d));
  }, [selectedDate, expenseDates, days, year]);

  return (
    <div className="calendar-container">
      <h2>January {year}</h2>

      {/* Year Slider */}
      <div className="year-slider">
        <input
          type="range"
          min="2000"
          max="2050"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        />
        <span>{year}</span>
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
