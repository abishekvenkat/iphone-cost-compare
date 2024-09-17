import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Importing CSS for styling

const prices = {
  "iPhone 16 128GB": {
        US: { price: 799, currency: 'USD' },
        Canada: { price: 1129, currency: 'CAD' },
        UAE: { price: 3399, currency: 'AED' },
        UK: { price: 799, currency: 'GBP' },
        Germany: { price: 949, currency: 'EUR' },  
        Singapore: { price: 1299, currency: 'SGD' },
        Australia: { price: 1399, currency: 'AUD' },
        India: { price: 79900, currency: 'INR' },
        Vietnam: { price: 22999000, currency: 'VND' },
        China: { price: 5999, currency: 'CNY' },
        Japan: { price: 124800, currency: 'JPY' },
        HongKong: { price: 6989, currency: 'HKD' },
        Thailand: { price: 29900, currency: 'THB' },
    },
    "iPhone 16 256GB": {
        US: { price: 899, currency: 'USD' },
        Canada: { price: 1279, currency: 'CAD' },
        UAE: { price: 3799, currency: 'AED' },
        UK: { price: 899, currency: 'GBP' },
        Germany: { price: 1079, currency: 'EUR' },
        Singapore: { price: 1449, currency: 'SGD' },
        Australia: { price: 1599, currency: 'AUD' },
        India: { price: 89900, currency: 'INR' },
        Vietnam: { price: 25999000, currency: 'VND' },
        China: { price: 6999, currency: 'CNY' },
        Japan: { price: 139800, currency: 'JPY' },
        HongKong: { price: 7699, currency: 'HKD' },
        Thailand: { price: 33900, currency: 'THB' },
    },
    "iPhone 16 512GB": {
        US: { price: 1099, currency: 'USD' },
        Canada: { price: 1579, currency: 'CAD' },
        UAE: { price: 4649, currency: 'AED' },
        UK: { price: 1099, currency: 'GBP' },
        Germany: { price: 1329, currency: 'EUR' },
        Singapore: { price: 1749, currency: 'SGD' },
        Australia: { price: 1949, currency: 'AUD' },
        India: { price: 109900, currency: 'INR' },
        Vietnam: { price: 31999000, currency: 'VND' },
        China: { price: 8999, currency: 'CNY' },
        Japan: { price: 169800, currency: 'JPY' },
        HongKong: { price: 9399, currency: 'HKD' },
        Thailand: { price: 41900, currency: 'THB' },
    },
    "iPhone 16 Plus 128GB": {
        US: { price: 899, currency: 'USD' },
        Canada: { price: 1279, currency: 'CAD' },
        UAE: { price: 3799, currency: 'AED' },
        UK: { price: 899, currency: 'GBP' },
        Germany: { price: 1099, currency: 'EUR' },  
        Singapore: { price: 1399, currency: 'SGD' },
        Australia: { price: 1599, currency: 'AUD' },
        India: { price: 89900, currency: 'INR' },
        Vietnam: { price: 25999000, currency: 'VND' },
        China: { price: 6999, currency: 'CNY' },
        Japan: { price: 139800, currency: 'JPY' },
        HongKong: { price: 7699, currency: 'HKD' },
        Thailand: { price: 34900, currency: 'THB' },
    },
    "iPhone 16 Plus 256GB": {
        US: { price: 999, currency: 'USD' },
        Canada: { price: 1429, currency: 'CAD' },
        UAE: { price: 4199, currency: 'AED' },
        UK: { price: 999, currency: 'GBP' },
        Germany: { price: 1229, currency: 'EUR' },
        Singapore: { price: 1549, currency: 'SGD' },
        Australia: { price: 1799, currency: 'AUD' },
        India: { price: 99900, currency: 'INR' },
        Vietnam: { price: 28999000, currency: 'VND' },
        China: { price: 7999, currency: 'CNY' },
        Japan: { price: 154800, currency: 'JPY' },
        HongKong: { price: 8499, currency: 'HKD' },
        Thailand: { price: 38900, currency: 'THB' },
    },
    "iPhone 16 Plus 512GB": {
        US: { price: 1199, currency: 'USD' },
        Canada: { price: 1729, currency: 'CAD' },
        UAE: { price: 5049, currency: 'AED' },
        UK: { price: 1199, currency: 'GBP' },
        Germany: { price: 1479, currency: 'EUR' },
        Singapore: { price: 1849, currency: 'SGD' },
        Australia: { price: 2149, currency: 'AUD' },
        India: { price: 119900, currency: 'INR' },
        Vietnam: { price: 34999000, currency: 'VND' },
        China: { price: 9999, currency: 'CNY' },
        Japan: { price: 184800, currency: 'JPY' },
        HongKong: { price: 10199, currency: 'HKD' },
        Thailand: { price: 46900, currency: 'THB' },
    },
  "iPhone 16 Pro 128GB": {
        US: { price: 999, currency: 'USD' },
        Canada: { price: 1449, currency: 'CAD' },
        UAE: { price: 4299, currency: 'AED' },
        UK: { price: 999, currency: 'GBP' },
        Germany: { price: 1199, currency: 'EUR' },  
        Singapore: { price: 1599, currency: 'SGD' },
        Australia: { price: 1799, currency: 'AUD' },
        India: { price: 119900, currency: 'INR' },
        Vietnam: { price: 28999000, currency: 'VND' },
        China: { price: 7999, currency: 'CNY' },
        Japan: { price: 159800, currency: 'JPY' },
        HongKong: { price: 8599, currency: 'HKD' },
        Thailand: { price: 39900, currency: 'THB' },
    },
    "iPhone 16 Pro 256GB": {
        US: { price: 1099, currency: 'USD' },
        Canada: { price: 1599, currency: 'CAD' },
        UAE: { price: 4699, currency: 'AED' },
        UK: { price: 1099, currency: 'GBP' },
        Germany: { price: 1329, currency: 'EUR' },
        Singapore: { price: 1749, currency: 'SGD' },
        Australia: { price: 1999, currency: 'AUD' },
        India: { price: 129900, currency: 'INR' },
        Vietnam: { price: 31999000, currency: 'VND' },
        China: { price: 8999, currency: 'CNY' },
        Japan: { price: 174800, currency: 'JPY' },
        HongKong: { price: 9399, currency: 'HKD' },
        Thailand: { price: 43900, currency: 'THB' },
    },
    "iPhone 16 Pro 512GB": {
        US: { price: 1299, currency: 'USD' },
        Canada: { price: 1899, currency: 'CAD' },
        UAE: { price: 5549, currency: 'AED' },
        UK: { price: 1299, currency: 'GBP' },
        Germany: { price: 1579, currency: 'EUR' },
        Singapore: { price: 2049, currency: 'SGD' },
        Australia: { price: 2349, currency: 'AUD' },
        India: { price: 149900, currency: 'INR' },
        Vietnam: { price: 37999000, currency: 'VND' },
        China: { price: 10999, currency: 'CNY' },
        Japan: { price: 204800, currency: 'JPY' },
        HongKong: { price: 11099, currency: 'HKD' },
        Thailand: { price: 51900, currency: 'THB' },
    },
    "iPhone 16 Pro 1TB": {
        US: { price: 1499, currency: 'USD' },
        Canada: { price: 2199, currency: 'CAD' },
        UAE: { price: 6399, currency: 'AED' },
        UK: { price: 1499, currency: 'GBP' },
        Germany: { price: 1829, currency: 'EUR' },
        Singapore: { price: 2349, currency: 'SGD' },
        Australia: { price: 2649, currency: 'AUD' },
        India: { price: 169900, currency: 'INR' },
        Vietnam: { price: 43999000, currency: 'VND' },
        China: { price: 12999, currency: 'CNY' },
        Japan: { price: 234800, currency: 'JPY' },
        HongKong: { price: 12799, currency: 'HKD' },
        Thailand: { price: 59900, currency: 'THB' },
    },
    "iPhone 16 Pro Max 256GB": {
        US: { price: 1199, currency: 'USD' },
        Canada: { price: 1749, currency: 'CAD' },
        UAE: { price: 5099, currency: 'AED' },
        UK: { price: 1199, currency: 'GBP' },
        Germany: { price: 1449, currency: 'EUR' },
        Singapore: { price: 1899, currency: 'SGD' },
        Australia: { price: 2149, currency: 'AUD' },
        India: { price: 144900, currency: 'INR' },
        Vietnam: { price: 34999000, currency: 'VND' },
        China: { price: 9999, currency: 'CNY' },
        Japan: { price: 189800, currency: 'JPY' },
        HongKong: { price: 10199, currency: 'HKD' },
        Thailand: { price: 48900, currency: 'THB' },
    },
    "iPhone 16 Pro Max 512GB": {
        US: { price: 1399, currency: 'USD' },
        Canada: { price: 2049, currency: 'CAD' },
        UAE: { price: 5949, currency: 'AED' },
        UK: { price: 1399, currency: 'GBP' },
        Germany: { price: 1699, currency: 'EUR' },
        Singapore: { price: 2199, currency: 'SGD' },
        Australia: { price: 2499, currency: 'AUD' },
        India: { price: 164900, currency: 'INR' },
        Vietnam: { price: 40999000, currency: 'VND' },
        China: { price: 11999, currency: 'CNY' },
        Japan: { price: 219800, currency: 'JPY' },
        HongKong: { price: 11899, currency: 'HKD' },
        Thailand: { price: 56900, currency: 'THB' },
    },
    "iPhone 16 Pro Max 1TB": {
        US: { price: 1599, currency: 'USD' },
        Canada: { price: 2349, currency: 'CAD' },
        UAE: { price: 6799, currency: 'AED' },
        UK: { price: 1599, currency: 'GBP' },
        Germany: { price: 1949, currency: 'EUR' },
        Singapore: { price: 2499, currency: 'SGD' },
        Australia: { price: 2849, currency: 'AUD' },
        India: { price: 184900, currency: 'INR' },
        Vietnam: { price:46999000, currency: 'VND' },
        China: { price: 13999, currency: 'CNY' },
        Japan: { price: 249800, currency: 'JPY' },
        HongKong: { price: 13599, currency: 'HKD' },
        Thailand: { price: 64900, currency: 'THB' },
    }
};

function App() {
  const [model, setModel] = useState("iPhone 16 Pro 128GB");
  const [currency, setCurrency] = useState("USD");
  const [results, setResults] = useState({});
  const [currencyRates, setCurrencyRates] = useState({});
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
      fetchCurrencyRates();
  }, []);

  const fetchCurrencyRates = async () => {
      try {
          const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
          setCurrencyRates(response.data.rates);
      } catch (error) {
          console.error("Error fetching currency rates:", error);
      }
  };

  const handleCurrencyChange = (e) => {
      setCurrency(e.target.value);
      setShowTable(false);
  };

  const handleModelChange = (e) => {
      setModel(e.target.value);
      setShowTable(false);
  };

  const handleCalculate = () => {
      handleCompare(currency);
      setShowTable(true);
  };

  const handleCompare = (selectedCurrency) => {
      const convertedPrices = {};
      for (const country in prices[model]) {
          const { price, currency: originalCurrency } = prices[model][country];
          const priceInSelectedCurrency = (selectedCurrency === originalCurrency) 
              ? price 
              : price * (currencyRates[selectedCurrency] / currencyRates[originalCurrency]);

          convertedPrices[country] = {
              original: price,
              originalCurrency,
              converted: Math.round(priceInSelectedCurrency),
          };
      }
      setResults(convertedPrices);
  };

  return (
      <div className="dot-matrix-container">
          <h1 className="dot-matrix-title">iPhone 16 Cost Compare</h1>
          <div className="selector-container">
              <div className="select-wrapper">
                  <label htmlFor="model-select">Select iPhone Model:</label>
                  <select id="model-select" value={model} onChange={handleModelChange}>
                      {Object.keys(prices).map((modelName) => (
                          <option key={modelName} value={modelName}>{modelName}</option>
                      ))}
                  </select>
              </div>
              <div className="select-wrapper">
                  <label htmlFor="currency-select">Select Currency:</label>
                  <select id="currency-select" value={currency} onChange={handleCurrencyChange}>
                      <option value="USD">US Dollar</option>
                      <option value="CAD">Canadian Dollar</option>
                      <option value="AED">UAE Dirham</option>
                      <option value="GBP">British Pound</option>
                      <option value="EUR">Euro</option>
                      <option value="SGD">Singapore Dollar</option>
                      <option value="AUD">Australian Dollar</option>
                      <option value="INR">Indian Rupee</option>
                      <option value="VND">Vietnamese Dong</option>
                      <option value="CNY">Chinese Yuan</option>
                      <option value="JPY">Japanese Yen</option>
                      <option value="HKD">Hong Kong Dollar</option>
                      <option value="THB">Thai Baht</option>
                  </select>
              </div>
              <button onClick={handleCalculate} className="dot-matrix-button">
                  Compare
              </button>
          </div>
          {showTable && Object.entries(results).length > 0 && (
              <div className="dot-matrix-table-container">
                  <table className="dot-matrix-table">
                      <thead>
                          <tr>
                              <th>Country</th>
                              <th>Original Cost</th>
                              <th>Converted Cost ({currency})</th>
                          </tr>
                      </thead>
                      <tbody>
                          {Object.entries(results).map(([country, { original, originalCurrency, converted }]) => (
                              <tr key={country}>
                                  <td>{country}</td>
                                  <td>{original} {originalCurrency}</td>
                                  <td>{converted} {currency}</td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          )}
      </div>
  );
}

export default App;