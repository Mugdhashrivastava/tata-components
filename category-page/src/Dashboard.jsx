import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./Dashboard.css";
import articleImage from "./assets/images/img.jpg";


const categoryData = [
  { label: "Interiors", value: 24, amount: "₹7,900", color: "#2A72FF" },
  { label: "Foundation", value: 12, amount: "₹11,17,800", color: "#FFC107" },
  { label: "Flooring", value: 20, amount: "₹8,17,214", color: "#E91E63" },
  { label: "Structure", value: 32, amount: "₹27,800", color: "#607D8B" },
  { label: "Brick work", value: 20, amount: "₹8,17,214", color: "#FF5722" },
  { label: "Labour", value: 12, amount: "₹17,800", color: "#FFC107" },
];

const transactions = [
  { category: "Interiors", transactions: "08 transactions", percentage: "32%", amount: "₹27,800", icon: "🛋️" },
  { category: "Foundation", transactions: "02 transactions", percentage: "12%", amount: "₹11,17,800", icon: "🏗️" },
  { category: "Flooring", transactions: "02 transactions", percentage: "20%", amount: "₹8,17,214", icon: "🧱" },
  { category: "Structure", transactions: "08 transactions", percentage: "32%", amount: "₹27,800", icon: "🏠" },
  { category: "Brick work", transactions: "02 transactions", percentage: "20%", amount: "₹8,17,214", icon: "🚧" },
  { category: "Labour", transactions: "02 transactions", percentage: "12%", amount: "₹17,800", icon: "👷" },
  { category: "Others", transactions: "02 transactions", percentage: "12%", amount: "₹7,230", icon: "🔧" },
];

const articles = [
  {
    title: "From blueprint to budget: understanding the true costs of building...",
    date: "20 Dec 2024",
    time: "5 min",
    image: articleImage,
  },
  {
    title: "From blueprint to budget: understanding actual costs of building a home",
    date: "20 Dec 2024",
    time: "5 min",
    image: articleImage,
  },
  {
    title: "Understanding actual costs of building a home",
    date: "20 Dec 2024",
    time: "5 min",
    image: articleImage,
  },
];

const Dashboard = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const width = 250, height = 250, radius = Math.min(width, height) / 2;
    const svg = d3
      .select(chartRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const pie = d3.pie().value((d) => d.value);
    const data_ready = pie(categoryData);

    const arc = d3.arc().innerRadius(60).outerRadius(radius);

    svg
      .selectAll("path")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => d.data.color)
      .style("stroke", "#fff")
      .style("stroke-width", "2px");

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.3em")
      .attr("font-size", "24px")
      .attr("font-weight", "bold")
      .text("24%");

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "1.7em")
      .attr("font-size", "14px")
      .text("₹7,900");


    
      svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "2.5em")
      .attr("font-size", "1rem")
      .attr("font-weight", "bold")
      .attr("font-color", "#666666")
      .text("Interiors");


    return () => d3.select(chartRef.current).selectAll("*").remove();
  }, []);

  return (
    <div className="dashboard">
      <div className="left-section">
        <h2>Categories</h2>
        <svg ref={chartRef}></svg>

        <h3>Recommended for you</h3>
        {articles.map((article, index) => (
          <div className="article-card" key={index}>
           <img src={article.image} alt="article" />

            <div>
              <p className="article-title">{article.title}</p>
              <p className="article-meta">{article.date} | {article.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="right-section">
        {transactions.map((item, index) => (
          <div className="transaction-card" key={index}>
            <div className="icon">{item.icon}</div>
            <div className="details">
              <h3>{item.category}</h3>
            </div>
            <p className="transactions">{item.transactions}</p>
            <p className="percentage">{item.percentage}</p>
            <p className="amount">{item.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
