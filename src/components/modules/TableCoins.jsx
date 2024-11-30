import React, { useState } from "react";
import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";
import { RotatingLines } from "react-loader-spinner";
import styles from "./TableCoins.module.css";
import { coinChart } from "../../services/CryptoApi.js";

function TableCoins({ coins, isLoading, currency, setChart }) {
  const [sortConfig, setSortConfig] = useState(null); // Set initial sortConfig to null

  const sortedCoins = React.useMemo(() => {
    if (!sortConfig) {
      return coins; // Return original coins if no sorting is applied
    }

    let sortableCoins = [...coins];
    sortableCoins.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    return sortableCoins;
  }, [coins, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className={styles.container}>
      {isLoading ? (
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="green"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Coin</th>
              <th
                onClick={() => requestSort("name")}
                className={styles.sortable}
              >
                Name
                <button
                  className={styles.sortButton}
                  onClick={() => requestSort("name")}
                >
                  {sortConfig?.key === "name"
                    ? sortConfig.direction === "ascending"
                      ? "↑"
                      : "↓"
                    : "↕️"}
                </button>
              </th>
              <th
                onClick={() => requestSort("current_price")}
                className={styles.sortable}
              >
                Price
                <button
                  className={styles.sortButton}
                  onClick={() => requestSort("current_price")}
                >
                  {sortConfig?.key === "current_price"
                    ? sortConfig.direction === "ascending"
                      ? "↑"
                      : "↓"
                    : "↕️"}
                </button>
              </th>
              <th>24h</th>
              <th
                onClick={() => requestSort("total_volume")}
                className={styles.sortable}
              >
                Total Volume
                <button
                  className={styles.sortButton}
                  onClick={() => requestSort("total_volume")}
                >
                  {sortConfig?.key === "total_volume"
                    ? sortConfig.direction === "ascending"
                      ? "↑"
                      : "↓"
                    : "↕️"}
                </button>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedCoins.map((coin) => (
              <TableRow
                setChart={setChart}
                coin={coin}
                key={coin.id}
                currency={currency}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TableCoins;

const TableRow = ({ coin, currency, setChart }) => {
  const {
    id,
    image,
    name,
    current_price,
    symbol,
    total_volume,
    price_change_percentage_24h: price24h,
  } = coin;

  const chartHandler = async () => {
    try {
      const response = await fetch(coinChart(id));
      const json = await response.json();
      setChart({ ...json, coin });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <tr>
      <td>
        <div className={styles.symbol} onClick={chartHandler}>
          <img src={image} alt={name} />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>
        <span>
          {currency === "usd" && "$ "} {currency === "jpy" && "¥ "}
          {currency === "eur" && "€ "}
        </span>

        {current_price.toLocaleString()}
      </td>
      <td className={price24h > 0 ? styles.success : styles.error}>
        {price24h.toFixed(2)} %
      </td>
      <td>{total_volume.toLocaleString()}</td>
      <td>
        <img src={price24h > 0 ? chartUp : chartDown} alt={name} />
      </td>
    </tr>
  );
};
