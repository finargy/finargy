import {FC, useMemo} from "react";
import {Stat, StatLabel, StatNumber, StatHelpText, Box, Text, Grid} from "@chakra-ui/react";

import {changeHexLuminosity} from "./utils";

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

  //Get lighter and darker colors for the background
  const [lighterColor, darkerColor] = useMemo(
    () => [changeHexLuminosity(walletColor, 10), changeHexLuminosity(walletColor, -15)],
    [walletColor],
  );
  const backgroundLinearGradient = `linear-gradient(135deg, ${lighterColor} 0%, ${darkerColor} 75%)`;

  return (
    <Box
      background={backgroundLinearGradient}
      borderRadius="15px"
      boxShadow="lg"
      color="white"
      maxH="250px"
      p={2}
      paddingStart={6}
      w="350px"
    >
      <Grid alignItems="center" templateColumns="repeat(2, 1fr)">
        <Text fontSize="2xl" fontWeight="bold" marginBottom="5">
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
