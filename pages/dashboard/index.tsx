import React, {useContext} from "react";
import {Box, Grid, GridItem, HStack, Text} from "@chakra-ui/react";

import {MainLayout} from "../../components/layouts";
import {BalanceWidget, TotalBalance} from "../../components/dashboard";
import {AuthContext} from "../../context/auth";

const DashboardPage = () => {
  const {user} = useContext(AuthContext);

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
            <BalanceWidget
              date="12/06/2022"
              expense={2123122}
              incoming={2203130}
              symbol="$"
              title="February Expenses"
            />
            <BalanceWidget
              date="12/06/2022"
              expense={1502}
              incoming={1003}
              symbol="$"
              title="Berlin Congress"
            />
          </HStack>
        </GridItem>
      </Grid>
    </MainLayout>
  );
};

export default DashboardPage;
