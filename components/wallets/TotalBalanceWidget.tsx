import {FC} from "react";
import {
  Stat,
  StatLabel,
  StatHelpText,
  Box,
  Text,
  Grid,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import {BsThreeDotsVertical} from "react-icons/bs";

type Props = {
  walletBalance: number;
  walletCurrency: string;
};

export const TotalBalanceWidget: FC<Props> = ({walletBalance, walletCurrency}) => {
  let argCurrencyFormat = Intl.NumberFormat("es-AR");

  return (
    <Box
      background="#FEFEFE"
      borderRadius="15px"
      boxShadow="lg"
      color="#282B40"
      h="100px"
      p={4}
      paddingStart={6}
      w="350px"
    >
      <Grid alignItems="center" templateColumns="repeat(2, 1fr)">
        <Grid>
          <Stat>
            <StatLabel fontSize="2xl">Balance Total</StatLabel>
            <StatHelpText fontWeight="bold">{walletCurrency}</StatHelpText>
          </Stat>
          <Text fontSize="2xl" fontWeight="bold" marginLeft="10" marginTop="-8">
            {`${argCurrencyFormat.format(walletBalance)}`}
          </Text>
        </Grid>
        <Menu>
          <MenuButton
            alignContent="center"
            aria-label="Opciones"
            as={IconButton}
            color="#282B40"
            display="flex"
            fontSize="larger"
            icon={<BsThreeDotsVertical />}
            justifyContent="flex-end"
            variant="unstyled"
          />
          <MenuList>
            <MenuItem>USD</MenuItem>
            <MenuItem>ARS</MenuItem>
            <MenuItem>EUR</MenuItem>
            <MenuItem>GBP</MenuItem>
          </MenuList>
        </Menu>
      </Grid>
    </Box>
  );
};
