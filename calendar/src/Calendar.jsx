import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './Calendar.css';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(2); // Default selected date (January 2nd)
  const [timelineData] = useState({
    '2025-01-02': {
      total: 1747000,
      items: [
        { name: 'Lights from Dubai', category: 'Interiors', date: '20th Dec 2024', cost: 27800 },
        { name: 'Kitchen furnishing...', category: 'Interiors', date: '20th Dec 2024', cost: 11800 },
        { name: 'Bedroom painting...', category: 'Interiors', date: '20th Dec 2024', cost: 171214 },
        { name: 'Structure', category: 'Interiors', date: '20th Dec 2024', cost: 27800 },
        { name: 'Lights from Dubai', category: 'Interiors', date: '20th Dec 2024', cost: 27800 },
      ],
    },
    '2025-01-03': {
      total: 1747000,
      items: [
        { name: 'Lights from Dubai', category: 'Interiors', date: '20th Dec 2024', cost: 27800 },
        { name: 'Kitchen furnishing...', category: 'Interiors', date: '20th Dec 2024', cost: 11800 },
      ],
    },
  });
  const svgRef = useRef();

  // Calendar data setup
  const year = 2025;
  const month = 0; // January (0-based in JavaScript Date)
  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startingDay = firstDayOfMonth.getDay(); // 0 (Sunday) to 6 (Saturday)

  // Generate an array of days, including empty slots for days before the 1st
  const days = Array(startingDay)
    .fill(null)
    .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  // Expense dates based on timeline data
  const expenseDates = Object.keys(timelineData).map(date => parseInt(date.split('-')[2]));

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 300;
    const height = 300;
    const cellSize = 40;

    svg.attr('width', width).attr('height', height);

    // Clear previous render
    svg.selectAll('*').remove();

    // Add day labels (M, T, W, T, F, S, S)
    const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    svg
      .selectAll('.day-label')
      .data(dayLabels)
      .enter()
      .append('text')
      .attr('x', (d, i) => i * cellSize + cellSize / 2)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .text(d => d);

    // Create the grid of days
    const cells = svg
      .selectAll('.day')
      .data(days)
      .enter()
      .append('g')
      .attr('class', 'day')
      .attr('transform', (d, i) => {
        const row = Math.floor(i / 7);
        const col = i % 7;
        return `translate(${col * cellSize}, ${row * cellSize + 40})`;
      });

    // Add circles for each day
    cells
      .filter(d => d !== null) // Only render circles for actual days
      .append('circle')
      .attr('cx', cellSize / 2)
      .attr('cy', cellSize / 2)
      .attr('r', cellSize / 2 - 2)
      .attr('class', d => {
        if (d === selectedDate) return 'selected';
        if (expenseDates.includes(d)) return 'expense';
        return '';
      })
      .on('click', (event, d) => setSelectedDate(d));

    // Add day numbers
    cells
      .filter(d => d !== null)
      .append('text')
      .attr('x', cellSize / 2)
      .attr('y', cellSize / 2 + 5)
      .attr('text-anchor', 'middle')
      .text(d => (d < 10 ? `0${d}` : d));
  }, [selectedDate, expenseDates, days]);

  // Get current date's data
  const currentDate = `2025-01-${selectedDate < 10 ? '0' + selectedDate : selectedDate}`;
  const dateData = timelineData[currentDate] || { total: 0, items: [] };

  return (
    <div className="calendar-container">
      <div className="timeline">
        <h2>Timeline</h2>
        <div className="month-selector">
          <button>👈</button>
          <h3>January</h3>
          <button>👉</button>
        </div>
        {Object.entries(timelineData).map(([date, data]) => {
          const day = parseInt(date.split('-')[2]);
          return (
            <div key={date} className={`timeline-entry ${selectedDate === day ? 'selected' : ''}`}>
              <h3>
                {day}th January <span>€{data.total.toLocaleString()}</span>
              </h3>
              {data.items.map((item, index) => (
                <div key={index} className="timeline-item">
                  <span className="item-icon">💡</span>
                  <div>
                    <p>{item.name}</p>
                    <small>
                      {item.category} | {item.date} | €{item.cost.toLocaleString()}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
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