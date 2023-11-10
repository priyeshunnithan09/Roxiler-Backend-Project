const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Database Initialization
let database = [];

// API to initialize the database
app.get('/initialize-database', async (req, res) => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    database = response.data;
    res.json({ message: 'Database initialized successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API to list all transactions with search and pagination
app.get('/transactions', (req, res) => {
  const { month, search = '', page = 1, perPage = 10 } = req.query;

  // Implement search and pagination logic based on the provided instructions
  // ...

  // Example response
  const result = /* Your result based on search and pagination */
  res.json(result);
});

// API for statistics
app.get('/statistics', (req, res) => {
  const { month } = req.query;

  // Implement statistics logic based on the provided instructions
  // ...

  // Example response
  const statistics = /* Your statistics based on the selected month */
  res.json(statistics);
});

// API for bar chart
app.get('/bar-chart', (req, res) => {
  const { month } = req.query;

  // Implement bar chart logic based on the provided instructions
  // ...

  // Example response
  const barChart = /* Your bar chart data based on the selected month */
  res.json(barChart);
});

// API for pie chart
app.get('/pie-chart', (req, res) => {
  const { month } = req.query;

  // Implement pie chart logic based on the provided instructions
  // ...

  // Example response
  const pieChart = /* Your pie chart data based on the selected month */
  res.json(pieChart);
});

// API for combined response
app.get('/combined-response', async (req, res) => {
  try {
    const initializeResponse = await axios.get('http://localhost:3000/initialize-database');
    const transactionsResponse = await axios.get('http://localhost:3000/transactions');
    const statisticsResponse = await axios.get('http://localhost:3000/statistics');
    const barChartResponse = await axios.get('http://localhost:3000/bar-chart');
    const pieChartResponse = await axios.get('http://localhost:3000/pie-chart');

    // Combine responses
    const combinedResponse = {
      initialize: initializeResponse.data,
      transactions: transactionsResponse.data,
      statistics: statisticsResponse.data,
      barChart: barChartResponse.data,
      pieChart: pieChartResponse.data,
    };

    res.json(combinedResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
