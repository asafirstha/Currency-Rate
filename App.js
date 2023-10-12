import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [exchangeRates, setExchangeRates] = useState({});
  const [loading, setLoading] = useState(true);
  const baseCurrency = 'USD';
  const targetCurrencies = ['CAD', 'IDR', 'JPY', 'CHF', 'EUR', 'GBP'];
  const API_KEY = '5b268a68c45d4cf48fbcf004735d3c87';

  useEffect(() => {
    const url = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${API_KEY}`;

    axios
      .get(url)
      .then((response) => {
        setExchangeRates(response.data.rates);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching exchange rates:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h2>Currency Exchange Rates (1 USD)</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Currency</th>
                  <th>Exchange Rate</th>
                  <th>We Buy</th>
                  <th>We Sell</th>
                </tr>
              </thead>
              <tbody>
                {targetCurrencies.map((currency) => (
                  <tr key={currency}>
                    <td>{currency}</td>
                    <td>{exchangeRates[currency]}</td>
                    <td>{(exchangeRates[currency] * 1.05).toFixed(2)}</td>
                    <td>{(exchangeRates[currency] * 0.95).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>Rates are based on 1 USD</p>
            <p>This application uses the API from https://currencyfreaks.com</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;