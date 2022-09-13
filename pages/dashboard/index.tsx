import React, {useContext} from "react";
import {Box, Grid, GridItem, HStack, Text} from "@chakra-ui/react";
import useSWR from "swr";

import {MainLayout} from "../../components/layouts";
import {BalanceWidget, TotalBalance} from "../../components/dashboard";
import {AuthContext} from "../../context/auth";
import {IUserAccount} from "../../interfaces";

const DashboardPage = () => {
  const {user} = useContext(AuthContext);
  const {data, error} = useSWR<{data: IUserAccount[]}>(
    `/api/accounts/useraccounts/?user=${user?._id}`,
  );
  const isLoading = !error && !data;

  return (
    <MainLayout
      pageDescription="Página de resumen de cuentas con gráficos de balance"
      title="Dashboard"
    >
      <Grid templateColumns="repeat(4,1fr)" templateRows="repeat(2,1fr)">
        <GridItem colSpan={1} rowSpan={2}>
          <Text fontSize="4xl" fontWeight="bold">
            Hola {user?.name}!
          </Text>
          <Text>Este es tu balance general 👀</Text>
          <Box mt={10}>
            <TotalBalance expense={6000} incoming={1200} symbol="$" />
          </Box>
        </GridItem>
        <GridItem colSpan={3} display="flex" justifyContent="center" rowSpan={1}>
          <HStack gap={2}>
            {isLoading ? (
              <Text>Cargando...</Text>
            ) : (
              data?.data.map((account) => (
                <BalanceWidget
                  key={account.name}
                  expense={account.totalExpense}
                  incoming={account.totalIncome}
                  symbol="$"
                  title={account.name}
                />
              ))
            )}
          </HStack>
        </GridItem>
      </Grid>
    </MainLayout>
  );
};

export default DashboardPage;
