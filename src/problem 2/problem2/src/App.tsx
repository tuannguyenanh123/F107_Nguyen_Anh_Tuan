import "./App.css";
import CurrencyInput from "./components/CurrentInput";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState<string>("USD");
  const [currency2, setCurrency2] = useState<string>("");
  const [rates, setRates] = useState<any>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await import("./prices.json");
      const cloneData = data?.default;
      const outputObject = cloneData.reduce(
        (result: any, { currency, price }) => {
          result[currency] = price;
          return result;
        },
        {}
      );
      setRates(outputObject);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!!rates) {
      const init = () => {
        handleAmount1Change(1);
      };
      init();
    }
  }, [rates]);

  function format(number: number) {
    return Number(number.toFixed(4));
  }

  function handleAmount1Change(amount1: number) {
    setAmount1(amount1);
    if (!currency2) return;
    setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
  }

  function handleCurrency1Change(currency1: string) {
    setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
    setCurrency1(currency1);
  }

  function handleAmount2Change(amount2: number) {
    setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
    setAmount2(amount2);
  }

  function handleCurrency2Change(currency2: string) {
    setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
    setCurrency2(currency2);
  }
  return (
    <div>
      <h1>Currency Converter</h1>
      <div className="wrapper">
        <div className="title">Swap</div>
        <CurrencyInput
          onAmountChange={handleAmount1Change}
          onCurrencyChange={handleCurrency1Change}
          currencies={Object.keys(rates)}
          amount={amount1}
          currency={currency1}
        />
        <CurrencyInput
          onAmountChange={handleAmount2Change}
          onCurrencyChange={handleCurrency2Change}
          currencies={Object.keys(rates)}
          amount={amount2}
          currency={currency2}
        />
      </div>
    </div>
  );
}

export default App;
