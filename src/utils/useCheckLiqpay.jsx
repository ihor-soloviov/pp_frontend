import { useEffect } from 'react';
import { checkTransactionStatus } from '../Pages/Order/OrderFunctions/OrderTools';

// Припускаючи, що checkTransactionStatus є асинхронною функцією
export const useCheckTransactionStatus = (search, setTransactionStatus, setError) => {
  useEffect(() => {
    const checkStatus = async () => {
      const searchParams = new URLSearchParams(search);
      const paramValue = searchParams.get("status");

      if (paramValue === "checkout") {
        console.log('Checkout process started');
        try {
          await checkTransactionStatus(setTransactionStatus);
        } catch (error) {
          setError(error);
        }
      }
    };

    checkStatus();
  }, [search, setTransactionStatus, setError]);
};
