import { useEffect, useState } from "react";
import axiosClient from "../../axios";
import moment from "moment";
import { SpinnerCircular } from "spinners-react";

export const Wallet = () => {
  const [wallets, setWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const response = await axiosClient.post("/wallet");
        setWallets(response.data.Wallet);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getInfo();
  }, []);

  const handleWalletClick = (wallet) => {
    setSelectedWallet(wallet);
  };

  return (
    <div className="h-screen md:px-28 pt-10 select-none">
      <div className="px-10 pt-5">
        {loading ? (
          <div className="w-full bg-gray-200 py-[18px] w-28 animate-pulse rounded-lg"></div>
        ) : (
          <h1 className="text-3xl medium">Wallets:</h1>
        )}
      </div>
      <div className="flex px-20 py-10 divide-x-2 rounded-lg">
        {loading ? (
          <div className="w-full bg-gray-200 px-20 py-7 animate-pulse rounded-lg"></div>
        ) : (
          wallets.map((wallet, index) => (
            <div
              key={index}
              className="flex transition-all justify-center hover:bg-gray-100 px-5 py-5 cursor-pointer w-full"
              onClick={() => handleWalletClick(wallet)}
            >
              <h1 className="truncate">{wallet.wallet_name}</h1>
            </div>
          ))
        )}
      </div>

      {selectedWallet ? (
        <div className="px-5">
          <h2>
            <span className="font-medium cursor-default">Wallet UUID:</span>{" "}
            {selectedWallet.id}
          </h2>
          <h2>
            <span className="font-medium">Wallet Name:</span>{" "}
            {selectedWallet.wallet_name}
          </h2>
          <h2>
            <span className="font-medium">Balance:</span>{" "}
            {selectedWallet.balance}$
          </h2>
          <h2>
            <span className="font-medium">Created:</span>{" "}
            {moment(selectedWallet.created_at).fromNow()}
          </h2>
        </div>
      ) : loading ? (
        <div className="flex justify-center mt-10">
          <div className="flex justify-center">
            <SpinnerCircular color="#000000" />
          </div>
        </div>
      ) : (
        <div className="text-center mt-10">
          <h2 className="text-2xl">Select a wallet first!</h2>
        </div>
      )}
    </div>
  );
};
