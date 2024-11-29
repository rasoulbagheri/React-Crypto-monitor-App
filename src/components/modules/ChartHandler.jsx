import { coinChart } from "../../services/CryptoApi";

const chartHandler = async (id, { chart, setChart }) => {
  try {
    const response = await fetch(coinChart(id));
    const json = await response.json();
    setChart({ ...json, coin });
  } catch (error) {
    console.log(error.message);
  }
};

export { chartHandler };
