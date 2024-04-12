import { useEffect } from "react";
import axiosClient from "../../axios";

export const Transactions = () => {
  useEffect(() => {
    const TotalTransactions = async () => {
      try {
        const response = await axiosClient.post("/fetch/user");
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    TotalTransactions();
  }, []);

  return <div>Transactions</div>;
};
