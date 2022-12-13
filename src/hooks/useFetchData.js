import { useEffect, useState } from "react";

const useFetchData = (urlCallback) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetching = async () => {
      try {
        const data = await urlCallback();

        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetching();
  }, []);

  return { data };
};

export default useFetchData;
