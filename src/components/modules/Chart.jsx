import React, { PureComponent, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import styles from "./Chart.module.css";
import { convertData } from "../helpers/convertData";

function Chart({ chart, setChart }) {
  const [type, setType] = useState("prices");
  const typeHandler = (event) => {
    if (event.target.tagName === "BUTTON") {
      const type = event.target.innerText.toLowerCase().replace(" ", "_");
      setType(type);
    }
  };
  return (
    <div className={styles.container}>
      <span onClick={() => setChart(null)} className={styles.cross}>
        X
      </span>
      <div className={styles.chart}>
        <div className={styles.name}>
          <img src={chart.coin.image} />
          <p>{chart.coin.name}</p>
        </div>
        <div className={styles.graph}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width="400px"
              height="400px"
              data={convertData(chart, type)}
            >
              <CartesianGrid stroke="#404042" />
              <Line
                type="monotone"
                dataKey={type}
                stroke="#3874ff"
                strokeWidth="2px"
              />
              <YAxis dataKey={type} domain={["auto", "auto"]} />
              <XAxis dataKey="date" hide domain={["auto", "auto"]} />
              <Legend />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className={styles.types} onClick={typeHandler}>
          <button className={type === "prices" ? styles.selected : "null"}>
            Prices
          </button>
          <button className={type === "market_caps" ? styles.selected : "null"}>
            Market Caps
          </button>
          <button
            className={type === "total_volumes" ? styles.selected : "null"}
          >
            Total Volumes
          </button>
        </div>
        {chart.coin.current_price && (
          <div className={styles.details}>
            <div>
              <p>Price: </p>
              <span>$ {chart.coin.current_price}</span>
            </div>
            <div>
              <p>ATH: </p>
              <span>$ {chart.coin.ath}</span>
            </div>
            <div>
              <p>Market Cap: </p>
              <span>$ {chart.coin.market_cap}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chart;

// .toLocaleString()
