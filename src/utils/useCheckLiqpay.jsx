import { useEffect } from 'react';
import { checkTransactionStatus } from '../Pages/Order/OrderFunctions/OrderTools';

// Припускаючи, що checkTransactionStatus є асинхронною функцією
export const useCheckTransactionStatus = (search, setTransactionStatus) => {
  useEffect(() => {
    const checkStatus = async () => {
      const searchParams = new URLSearchParams(search);
      const paramValue = searchParams.get("status");
      console.log('custom hook')

      if (paramValue === "checkout") {
        console.log('Checkout process started');
        checkTransactionStatus(setTransactionStatus);

      }
    };

    checkStatus();
  }, [search, setTransactionStatus]);
};
