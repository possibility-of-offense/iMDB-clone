import { useEffect, useState } from "react";

const useFetchData = (urlCallback, singleDoc = false) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetching = async () => {
      try {
        const data = await urlCallback();

        if (singleDoc) {
          setData(data.data());
        } else {
          setData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetching();
  }, []);

  return { data };
};

export default useFetchData;
