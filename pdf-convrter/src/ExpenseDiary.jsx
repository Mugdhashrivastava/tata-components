import React, { useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import './ExpenseDiary.css';

const ExpenseDiary = () => {
  const contentRef = useRef(null);

  // JSON data with stub values
  const jsonData = {
    report: {
      title: 'Expense Diary - Report',
      generated_for: 'John Doe',
      generated_date: '17-03-2025',
    },
    expense_overview: {
      total_budget: '₹50,000',
      metrics: {
        spent: { amount: '₹35,000', percentage: '70%' },
        balance: { amount: '₹15,000', percentage: '30%' },
      },
    },
    type_overview: [
      { type: 'Material', amount: '₹20,000', percentage: '57%', number_of_transactions: '8' },
      { type: 'Labour', amount: '₹12,000', percentage: '34%', number_of_transactions: '5' },
      { type: 'Others', amount: '₹3,000', percentage: '9%', number_of_transactions: '3' },
    ],
    category_overview: [
      { category: 'Office Supplies', amount: '₹8,000', percentage: '23%', number_of_transactions: '4' },
      { category: 'Travel', amount: '₹10,000', percentage: '29%', number_of_transactions: '3' },
      { category: 'Equipment', amount: '₹12,000', percentage: '34%', number_of_transactions: '2' },
      { category: 'Utilities', amount: '₹3,000', percentage: '8%', number_of_transactions: '5' },
      { category: 'Food', amount: '₹1,500', percentage: '4%', number_of_transactions: '2' },
      { category: 'Miscellaneous', amount: '₹500', percentage: '2%', number_of_transactions: '1' },
    ],
    expense_history: {
      2025: [
        { date: '05-01-2025', expense_name: 'Printer Ink', category: 'Office Supplies', type: 'Material', amount: '₹2,000' },
        { date: '10-01-2025', expense_name: 'Team Lunch', category: 'Food', type: 'Others', amount: null },
        { date: '15-02-2025', expense_name: 'Flight Tickets', category: 'Travel', type: 'Labour', amount: '₹6,000' },
        { date: '20-02-2025', expense_name: 'Office Chair', category: 'Equipment', type: 'Material', amount: '₹7,000' },
        { date: '05-03-2025', expense_name: 'Electricity Bill', category: 'Utilities', type: 'Others', amount: '₹1,200' },
        { date: '15-03-2025', expense_name: 'Paper Supplies', category: 'Office Supplies', type: 'Material', amount: '₹3,000' },
      ],
      2024: [
        { date: '10-12-2024', expense_name: 'Coffee Machine', category: 'Equipment', type: 'Material', amount: '₹5,000' },
        { date: '15-11-2024', expense_name: 'Taxi Fare', category: 'Travel', type: 'Labour', amount: '₹2,000' },
        { date: '20-10-2024', expense_name: 'Stationery', category: 'Office Supplies', type: 'Material', amount: '₹1,500' },
        { date: '25-09-2024', expense_name: 'Water Bill', category: 'Utilities', type: 'Others', amount: '₹800' },
        { date: '30-08-2024', expense_name: 'Train Tickets', category: 'Travel', type: 'Labour', amount: '₹2,000' },
        { date: '05-07-2024', expense_name: 'Snacks', category: 'Food', type: 'Others', amount: '₹1,500' },
      ],
    },
  };

  const generatePDF = () => {
    const element = contentRef.current;
    if (!element) {
      alert('Content not found!');
      return;
    }

    html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: true,
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });

        const imgProps = doc.getImageProperties(imgData);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        if (pdfHeight > doc.internal.pageSize.getHeight()) {
          let heightLeft = pdfHeight;
          let position = 0;

          while (heightLeft >= 0) {
            position = heightLeft - pdfHeight;
            doc.addImage(imgData, 'PNG', 10, position + 10, pdfWidth - 20, pdfHeight);
            heightLeft -= doc.internal.pageSize.getHeight();
            if (heightLeft > 0) {
              doc.addPage();
            }
          }
        } else {
          doc.addImage(imgData, 'PNG', 10, 10, pdfWidth - 20, 0);
        }

        doc.save('expense_diary.pdf');
      })
      .catch((error) => {
        console.error('Error generating PDF:', error);
        alert('Failed to generate PDF. Check console for details.');
      });
  };

  return (
    <div>
      <div ref={contentRef}>
        <h2>{jsonData.report.title}</h2>
        <p>
          Generated for: {jsonData.report.generated_for} on {jsonData.report.generated_date}
        </p>

        <h3>Expense Overview</h3>
        <table>
          <thead>
            <tr>
              <th>Metric</th>
              <th>Amount</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total Budget</td>
              <td>{jsonData.expense_overview.total_budget}</td>
              <td>-</td>
            </tr>
            <tr>
              <td>Spent</td>
              <td>{jsonData.expense_overview.metrics.spent.amount}</td>
              <td>{jsonData.expense_overview.metrics.spent.percentage}</td>
            </tr>
            <tr>
              <td>Balance</td>
              <td>{jsonData.expense_overview.metrics.balance.amount}</td>
              <td>{jsonData.expense_overview.metrics.balance.percentage}</td>
            </tr>
          </tbody>
        </table>

        <h3>Type Overview</h3>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Amount</th>
              <th>Percentage</th>
              <th>Number of Transactions</th>
            </tr>
          </thead>
          <tbody>
            {jsonData.type_overview.map((item, index) => (
              <tr key={index}>
                <td>{item.type}</td>
                <td>{item.amount}</td>
                <td>{item.percentage}</td>
                <td>{item.number_of_transactions}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Category Overview</h3>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
              <th>Percentage</th>
              <th>Number of Transactions</th>
            </tr>
          </thead>
          <tbody>
            {jsonData.category_overview.map((item, index) => (
              <tr key={index}>
                <td>{item.category}</td>
                <td>{item.amount}</td>
                <td>{item.percentage}</td>
                <td>{item.number_of_transactions}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Expense History</h3>
        {Object.entries(jsonData.expense_history).map(([year, expenses]) => (
          <div key={year}>
            <h4>{year}</h4>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Expense Name</th>
                  <th>Category</th>
                  <th>Type</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense, index) => (
                  <tr key={index}>
                    <td>{expense.date}</td>
                    <td>{expense.expense_name}</td>
                    <td>{expense.category}</td>
                    <td>{expense.type}</td>
                    <td>{expense.amount || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      <button onClick={generatePDF}>Download PDF</button>
    </div>
  );
};

export default ExpenseDiary;