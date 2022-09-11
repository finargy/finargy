import {FC} from "react";
import {Stat, StatLabel, StatNumber, StatHelpText, Box, Text, Grid} from "@chakra-ui/react";

type Props = {
  walletName: string;
  walletBalance: number;
  walletCurrency: string;
  walletColor: string;
  //TODO: Logo de la billetera
  walletLogo?: any;
};

export const WalletWidget: FC<Props> = ({
  walletName,
  walletBalance,
  walletCurrency,
  walletColor,
  //TODO: Logo de la billetera
  walletLogo,
}) => {
  let argCurrencyFormat = Intl.NumberFormat("es-AR");

  return (
    <Box
      backgroundColor={walletColor}
      borderRadius="15px"
      boxShadow="lg"
      color="white"
      maxH="250px"
      p={2}
      paddingStart={6}
      w="350px"
    >
      <Grid alignItems="center" templateColumns="repeat(2, 1fr)">
        <Text fontSize="lg" fontWeight="bold">
          {walletName}
        </Text>
        <Stat>
          <StatLabel>Balance</StatLabel>
          <StatNumber>{`$ ${argCurrencyFormat.format(walletBalance)}`}</StatNumber>
          <StatHelpText>{walletCurrency}</StatHelpText>
        </Stat>
      </Grid>
    </Box>
  );
};
