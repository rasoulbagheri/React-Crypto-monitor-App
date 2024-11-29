import { useState } from "react";
import { useEffect } from "react";
import TableCoins from "../modules/TableCoins";
import { getCoinList } from "../../services/CryptoApi.js";
import Pagination from "../modules/Pagination.jsx";
import Search from "../modules/Search.jsx";
import Chart from "../modules/Chart.jsx";

function HomePage() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [chart, setChart] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      try {
        const response = await fetch(getCoinList(page, currency));
        const json = await response.json();
        setCoins(json);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    getData();
    return () => {};
  }, [page, currency]);

  return (
    <div>
      <Search
        currency={currency}
        setCurrency={setCurrency}
        setChart={setChart}
        chart={chart}
        tokens={coins}
      />
      <Pagination page={page} setPage={setPage} />
      <TableCoins
        coins={coins}
        setChart={setChart}
        isLoading={isLoading}
        currency={currency}
      />
      <Pagination page={page} setPage={setPage} />
      {!!chart && <Chart chart={chart} setChart={setChart} />}
    </div>
  );
}

export default HomePage;
