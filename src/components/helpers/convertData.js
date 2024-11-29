const convertData = (data, type) => {
  const convertedData = data[type].map((item) => {
    return {
      date: item[0],
      [type]: item[1].toFixed(3),
    };
  });

  return convertedData;
};

export { convertData };
