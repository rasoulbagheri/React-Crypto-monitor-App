const BASE_URL = "https://api.coingecko.com/api/v3";
const API_KEY = "x_cg_demo_api_key=CG-bUum2Rb6uRapdZjVp34fTTPn";

const getCoinList = (page, currency) => {
  return `${BASE_URL}/coins/markets?vs_currency=${currency}&per_page=25&page=${page}&sparkline=true&price_change_percentage=24h&${API_KEY}
  `;
};

const searchCoin = (text) => `${BASE_URL}/search?query=${text}&${API_KEY}`;
// `${BASE_URL}/coins/markets?vs_currency=usd&per_page=424&sparkline=true&price_change_percentage=24h&${API_KEY}`;

const coinChart = (coin) =>
  `${BASE_URL}/coins/${coin}/market_chart?vs_currency=usd&days=14${API_KEY}`;
const coinChartByID = (id) =>
  // `${BASE_URL}/coins/markets?vs_currency=usd&ids=bitcoin${API_KEY}`;
  // `${BASE_URL}/coins/markets?vs_currency=usd&ids=${id}&price_change_percentage=24h&${API_KEY}`;
  `${BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=14&${API_KEY}`;

export { getCoinList, searchCoin, coinChart, coinChartByID };

//  https://api.coingecko.com/api/v3/
