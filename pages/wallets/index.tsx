import {HStack} from "@chakra-ui/react";
import React from "react";

import {MainLayout} from "../../components/layouts";
import {WalletWidget} from "../../components/wallets";

const DashboardPage = () => {
  return (
    <MainLayout
      pageDescription="Página de resumen de cuentas con gráficos de balance"
      title="Dashboard"
    >
      <HStack backgroundColor="blackAlpha.100" gap={2} p={10}>
        <WalletWidget
          date="12/06/2022"
          expense={2123122}
          incoming={2203130}
          symbol="$"
          title="Februery Expenses"
        />
        <WalletWidget
          date="12/06/2022"
          expense={1502}
          incoming={1003}
          symbol="$"
          title="Berlin Congress"
        />
      </HStack>
    </MainLayout>
  );
};

export default DashboardPage;
