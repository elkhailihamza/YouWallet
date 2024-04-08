import { useEffect, useState } from "react";
import axiosClient from "../../axios";

export const Transactions = () => {
  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = () => {
    try {
      const response = axiosClient.get("/fetch");
      console.log(process.env.REACT_APP_API_URL);

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return <div>Transactions</div>;
};
