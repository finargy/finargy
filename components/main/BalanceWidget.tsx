import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Grid,
  GridItem,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";
import {FC} from "react";
import {BsThreeDotsVertical} from "react-icons/bs";
import {FaMinus} from "react-icons/fa";

type Props = {
  title: string;
  expense: number;
  incoming: number;
  date: Date | string;
  symbol: string;
};

export const BalanceWidget: FC<Props> = ({title, expense, incoming, date, symbol}) => {
  return (
    <Box backgroundColor="white" borderRadius="15px" boxShadow="lg" p={2} w="300px">
      <Stack
        alignItems="center"
        backgroundColor="blackAlpha.100"
        borderRadius="25px"
        direction="row"
      >
        <Text flex={1} ml={4}>
          {title}
        </Text>
        <Menu>
          <MenuButton
            alignContent="center"
            aria-label="Opciones"
            as={IconButton}
            color="blue.500"
            display="flex"
            fontSize="larger"
            icon={<BsThreeDotsVertical />}
            justifyContent="center"
            variant="unstyled"
          />
          <MenuList>
            <MenuItem>Opcion 1</MenuItem>
            <MenuItem>Opcion 2</MenuItem>
            <MenuItem>Opcion 3</MenuItem>
            <MenuItem>Opcion 4</MenuItem>
          </MenuList>
        </Menu>
      </Stack>
      <Grid templateColumns="repeat(3, 1fr)" templateRows="repeat(3, 1fr)">
        <GridItem colSpan={2} pl={2} rowSpan={3}>
          <CircularProgress
            color="orange.300"
            p={2}
            size="130px"
            thickness="4px"
            trackColor="blue.500"
            value={(incoming * 100) / (incoming + expense)}
          >
            <CircularProgressLabel>
              <Text color="blackAlpha.500" fontSize="sm">
                Total
              </Text>
              <Text color="blackAlpha.600" fontSize="md" fontWeight="bold">
                {symbol} {incoming - expense}
              </Text>
            </CircularProgressLabel>
          </CircularProgress>
        </GridItem>
        <GridItem
          alignItems="end"
          colSpan={1}
          display="flex"
          flexDir="column"
          justifyContent="center"
          pr={4}
          rowSpan={3}
        >
          <Text color="blackAlpha.600" fontSize="sm" fontWeight="bold">
            Gastos
          </Text>
          <HStack>
            <Icon as={FaMinus} color="blue.500" />
            <Text fontSize="sm" fontWeight="bold">
              {symbol}
            </Text>
            <Text fontSize="sm" fontWeight="bold">
              {expense}
            </Text>
          </HStack>

          <Text color="blackAlpha.600" fontSize="sm" fontWeight="bold" mt={1}>
            Ingresos
          </Text>
          <HStack>
            <Icon as={FaMinus} color="orange.300" />
            <Text fontSize="sm" fontWeight="bold">
              {symbol}
            </Text>
            <Text fontSize="sm" fontWeight="bold">
              {incoming}
            </Text>
          </HStack>

          <Text color="blackAlpha.600" fontSize="sm" fontWeight="bold" mt={2}>
            {new Date(date).toLocaleDateString()}
          </Text>
        </GridItem>
      </Grid>
    </Box>
  );
};
