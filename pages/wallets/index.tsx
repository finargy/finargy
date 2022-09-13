import React from "react";
import {StatGroup} from "@chakra-ui/react";

import {MainLayout} from "../../components/layouts";
import {WalletWidget} from "../../components/wallets";

const DashboardPage = () => {
  return (
    <MainLayout
      pageDescription="Página de bileteras. Aqui puedes ver todas tus billeteras y sus salos"
      title="Wallets"
    >
      <StatGroup flexDirection="column" gap={3}>
        <WalletWidget
          walletBalance={8500}
          walletColor="#9794ff"
          walletCurrency="USD"
          walletName="PayPal"
        />
        <WalletWidget
          walletBalance={7300.2}
          walletColor="#ef772e"
          walletCurrency="ARS"
          walletName="Mastercard"
        />
        <WalletWidget
          walletBalance={43200.98}
          walletColor="#4287c2"
          walletCurrency="ARS"
          walletName="BBVA"
        />
        <WalletWidget
          walletBalance={1320000}
          walletColor="#e0b015"
          walletCurrency="USDT"
          walletName="Binance"
        />
      </StatGroup>
    </MainLayout>
  );
};

export default DashboardPage;
