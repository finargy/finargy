import React, {useEffect} from "react";
import {StatGroup, Flex, Text} from "@chakra-ui/react";
import {AiOutlineMinus} from "react-icons/ai";
import axios from "axios";

import {MainLayout} from "../../components/layouts";
import {WalletWidget} from "../../components/wallets";

const hardcodedCurrencies = [
  {
    name: "Bitcoin",
    code: "BTC",
    color: "#F7931A",
  },
  {
    name: "Ethereum",
    code: "ETH",
    color: "#3C3C3D",
  },
  {
    name: "Argentine Peso",
    code: "ARS",
    color: "#0071BC",
  },
  {
    name: "Dolar",
    code: "USD",
    color: "#007F5F",
  },
];

const userAccounts = axios
  .get("http://localhost:3000/api/accounts/useraccounts")
  .then((response) => {
    return response.data;
  });

//TODO: no hay endpoints para currency todavia
// const avaliableCurrencies = axios.get("http://localhost:3000/api/currencies").then((response) => {
//   return response.data;
// });

const DashboardPage = () => {
  const [wallets, setWallets] = React.useState<any[]>([]);
  const [currencies, setCurrencies] = React.useState<any[]>(hardcodedCurrencies);

  useEffect(() => {
    const getWallets = async () => {
      const accounts = await userAccounts;
      const wallets = accounts.data.map((account: object) => {
        return account;
      });

      setWallets(wallets);
    };

    // const getCurrencies = async () => {
    //   const currencies = await avaliableCurrencies;
    //   const currenciesList = currencies.data.map((currency: object) => {
    //     return currency;
    //   });

    //   setCurrencies(currenciesList);
    // };

    getWallets();
    // getCurrencies();
  }, []);

  // const currencyCode = (currencyId: number) => {
  //   const currency = currencies.find((currency) => currency.id === currencyId);

  //   return currency.code;
  // };

  const randomCurrency = () => {
    const randomIndex = Math.floor(Math.random() * currencies.length);

    return currencies[randomIndex];
  };

  return (
    wallets.length > 0 && (
      <MainLayout
        pageDescription="Página de bileteras. Aqui puedes ver todas tus billeteras y sus salos"
        title="Wallets"
      >
        <StatGroup flexDirection="column">
          <WalletWidget
            isTotalBalance
            walletBalance={7300.2}
            walletColor="#50C5DE"
            walletCurrency="ARS"
            walletName="TOTAL"
          />
        </StatGroup>
        <Flex alignItems="center" color="#282B40" gap={2} justifyContent="center" p={3} w="350px">
          <AiOutlineMinus />
          <Text fontSize="xl" fontWeight="bold">
            Cuentas
          </Text>
          <AiOutlineMinus />
        </Flex>
        <StatGroup flexDirection="column" gap={3}>
          {wallets.map((account) => {
            const pickedCurrency = randomCurrency();

            return (
              <WalletWidget
                key={account.id}
                walletBalance={account.totalBalance}
                walletColor={account.color || pickedCurrency.color}
                walletCurrency={pickedCurrency.code}
                walletLogo={account.icon}
                walletName={account.name}
              />
            );
          })}
        </StatGroup>
      </MainLayout>
    )
  );
};

export default DashboardPage;
