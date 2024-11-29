import React, { useEffect, useState } from "react";
import {
  coinChart,
  coinChartByID,
  searchCoin,
} from "../../services/CryptoApi.js";
import { RotatingLines } from "react-loader-spinner";

import styles from "./Search.module.css";
function Search({ currency, setCurrency, chart, setChart, tokens }) {
  const [text, setText] = useState("");
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setCoins([]);
    if (!text) {
      setIsLoading(false);
      return;
    }
    const search = async () => {
      try {
        const response = await fetch(searchCoin(text), {
          signal: controller.signal,
        });
        const json = await response.json();
        if (json.coins) {
          setCoins(json.coins);
          setIsLoading(false);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.log(error);
        }
      }
    };
    setIsLoading(true);
    search();
    return () => controller.abort();
  }, [text]);

  const chartHandler = async (event) => {
    const coinName = event.target.innerText;
    const coin = coins.find((item) => item.name === coinName);
    const id = coin.id;
    try {
      const response = await fetch(coinChart(id));
      const json = await response.json();
      setChart({ ...json, coin });
      console.log(coin);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="jpy">JPY</option>
        </select>
        {(coins.length || isLoading) && (
          <div className={styles.searchResult}>
            <ul>
              {isLoading && (
                <RotatingLines
                  visible={true}
                  height="35"
                  width="35"
                  color="green"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              )}
              {coins.map((coin) => (
                <li key={coin.id} onClick={chartHandler}>
                  <img src={coin.thumb} alt={coin.name} />
                  <p>{coin.name}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
