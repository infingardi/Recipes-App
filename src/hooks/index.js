import { useEffect, useState } from 'react';

export default function useIngretientes(data) {
  const [ingredientes, setIngredientes] = useState([]);
  const [quantities, setQuantities] = useState([]);

  function teste(array) {
    setIngredientes(Object.entries(array)
      .filter((e) => e[0].includes('strIngredient') && e[1]));
    setQuantities(Object.entries(array).filter((e) => e[0].includes('strMeasure')));
  }

  useEffect(() => {
    if (data) { teste(data); }
  }, [data]);

  return [ingredientes, quantities];
}
