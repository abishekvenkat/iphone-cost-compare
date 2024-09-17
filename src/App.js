import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import './App.css'; // Importing CSS for styling

const prices = {
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
    const [darkMode, setDarkMode] = useState(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const [showTable, setShowTable] = useState(false); // State to control table visibility

    const fetchCurrencyRates = async () => {
        try {
            const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
            setCurrencyRates(response.data.rates);
        } catch (error) {
            console.error("Error fetching currency rates:", error);
        }
    };

    useEffect(() => {
        fetchCurrencyRates();
    }, []);

    const handleCurrencyChange = (e) => {
        setCurrency(e.target.value);
        setShowTable(false); // Hide table when currency changes
    };

    const handleModelChange = (e) => {
        setModel(e.target.value);
        setShowTable(false); // Hide table when model changes
    };

    const handleCalculate = () => {
        handleCompare(currency); // Calculate prices when button is clicked
        setShowTable(true); // Show table after calculation
    };

    const handleCompare = (selectedCurrency) => {
        const convertedPrices = {};
        for (const country in prices[model]) {
            const { price, currency: originalCurrency } = prices[model][country];
            
            // Check if the selected currency is the same as the original currency
            const priceInSelectedCurrency = (selectedCurrency === originalCurrency) 
                ? price // No conversion needed
                : price * (currencyRates[selectedCurrency] / currencyRates[originalCurrency]); // Perform conversion

            convertedPrices[country] = {
                original: price,
                originalCurrency,
                converted: Math.round(priceInSelectedCurrency),
            };
        }
        setResults(convertedPrices);
    };

    return (
        <div className={`app-container ${darkMode ? 'dark' : 'light'}`}>
            <h1>iPhone 16 Cost Compare</h1>
            <div className="theme-switch" onClick={() => setDarkMode(!darkMode)}>
                <input type="checkbox" checked={darkMode} readOnly />
                <span className="slider"></span>
            </div>
            <div className="selector-container">
                <FormControl variant="outlined" style={{ marginBottom: '10px', minWidth: '100%' }}>
                    <InputLabel style={{ color: darkMode ? '#fff' : '#000' }}>Select iPhone Model</InputLabel>
                    <Select
                        value={model}
                        onChange={handleModelChange} // Trigger model change
                        style={{ fontSize: '0.9rem', padding: '8px', color: darkMode ? '#fff' : '#000', backgroundColor: darkMode ? '#424242' : '#fff' }} // Adjust for dark mode
                    >
                        {Object.keys(prices).map((modelName) => (
                            <MenuItem key={modelName} value={modelName}>{modelName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl variant="outlined" style={{ marginBottom: '10px', minWidth: '100%' }}>
                    <InputLabel style={{ color: darkMode ? '#fff' : '#000' }}>Select Currency</InputLabel>
                    <Select
                        value={currency}
                        onChange={handleCurrencyChange} // Trigger currency change
                        style={{ fontSize: '0.9rem', padding: '8px', color: darkMode ? '#fff' : '#000', backgroundColor: darkMode ? '#424242' : '#fff' }} // Adjust for dark mode
                    >
                        <MenuItem value="USD">US Dollar</MenuItem>
                        <MenuItem value="CAD">Canadian Dollar</MenuItem>
                        <MenuItem value="AED">UAE Dirham</MenuItem>
                        <MenuItem value="GBP">British Pound</MenuItem>
                        <MenuItem value="EUR">Euro</MenuItem>
                        <MenuItem value="SGD">Singapore Dollar</MenuItem>
                        <MenuItem value="AUD">Australian Dollar</MenuItem>
                        <MenuItem value="INR">Indian Rupee</MenuItem>
                        <MenuItem value="VND">Vietnamese Dong</MenuItem>
                        <MenuItem value="CNY">Chinese Yuan</MenuItem>
                        <MenuItem value="JPY">Japanese Yen</MenuItem>
                        <MenuItem value="HKD">Hong Kong Dollar</MenuItem>
                        <MenuItem value="THB">Thai Baht</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" onClick={handleCalculate} style={{ width: '100%' }}>Compare</Button>
            </div>
            {showTable && Object.entries(results).length > 0 && (
                <TableContainer component={Paper} style={{ backgroundColor: darkMode ? '#424242' : '#fff', maxWidth: '600px', margin: '20px auto' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ color: darkMode ? '#fff' : '#000', textAlign: 'center' }}>Country</TableCell>
                                <TableCell style={{ color: darkMode ? '#fff' : '#000', textAlign: 'center' }}>Original Cost</TableCell>
                                <TableCell style={{ color: darkMode ? '#fff' : '#000', textAlign: 'center' }}>Converted Cost ({currency})</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.entries(results).map(([country, { original, originalCurrency, converted }]) => (
                                <TableRow key={country}>
                                    <TableCell style={{ color: darkMode ? '#fff' : '#000', textAlign: 'center' }}>{country}</TableCell>
                                    <TableCell style={{ color: darkMode ? '#fff' : '#000', textAlign: 'center' }}>{original} {originalCurrency}</TableCell>
                                    <TableCell style={{ color: darkMode ? '#fff' : '#000', textAlign: 'center' }}>{converted} {currency}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
}

export default App;
