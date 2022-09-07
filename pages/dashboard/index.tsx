import {HStack} from "@chakra-ui/react";
import React from "react";

import {MainLayout} from "../../components/layouts";
import {BalanceWidget} from "../../components/main";

const DashboardPage = () => {
  return (
    <MainLayout
      pageDescription="Página de resumen de cuentas con gráficos de balance"
      title="Dashboard"
    >
      <HStack backgroundColor="blackAlpha.100" gap={2} p={10}>
        <BalanceWidget
          date={new Date()}
          expense={1231.21}
          incoming={234.23}
          symbol="$"
          title="Februery Expenses"
        />
        <BalanceWidget
          date={new Date()}
          expense={150}
          incoming={100}
          symbol="$"
          title="Berlin Congress"
        />
      </HStack>
    </MainLayout>
  );
};

export default DashboardPage;
