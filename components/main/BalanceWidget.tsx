import {FC, useMemo} from "react";
import {
  Box,
  Center,
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
  VStack,
} from "@chakra-ui/react";
import {Doughnut} from "react-chartjs-2";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
import {BsThreeDotsVertical} from "react-icons/bs";
import {FaMinus} from "react-icons/fa";

import {abbreviateNumber} from "../../utils";

//TODO: ? Para que se usa?
ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  title: string;
  expense: number;
  incoming: number;
  date: string;
  symbol: string;
};

export const BalanceWidget: FC<Props> = ({title, expense, incoming, date, symbol}) => {
  const data = useMemo(
    () => ({
      labels: ["Ingresos", "Gastos"],
      datasets: [
        {
          data: [incoming, expense],
          backgroundColor: ["rgba(255, 194, 51, 0.2)", "rgba(54, 162, 235, 0.2)"],
          borderColor: ["rgba(255, 179, 0, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
          radius: 75,
          hoverOffset: 4,
        },
      ],
    }),
    [expense, incoming],
  );

  return (
    <Box backgroundColor="white" borderRadius="15px" boxShadow="lg" maxH="250px" maxW="300px" p={2}>
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
        <GridItem colSpan={2} position="relative" rowSpan={3}>
          <Center>
            <Doughnut
              data={data}
              height="200px"
              options={{
                cutout: 80,
                plugins: {legend: {display: false}},
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
            <VStack color="blackAlpha.500" fontSize="sm" position="absolute">
              <Text color="blackAlpha.500" fontSize="sm">
                Total
              </Text>
              <Text color="blackAlpha.600" fontSize="md" fontWeight="bold">
                {symbol} {incoming - expense}
              </Text>
            </VStack>
          </Center>
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
          <Text
            alignItems="center"
            color="blackAlpha.600"
            display="flex"
            fontSize="sm"
            fontWeight="bold"
          >
            <Icon as={FaMinus} color="blue.500" mr={1} />
            Gastos
          </Text>
          <HStack>
            <Text fontSize="sm" fontWeight="bold">
              {symbol}
            </Text>
            <Text fontSize="sm" fontWeight="bold">
              {expense < 1000000 ? expense : abbreviateNumber(expense, 2)}
            </Text>
          </HStack>

          <Text
            alignItems="center"
            color="blackAlpha.600"
            display="flex"
            fontSize="sm"
            fontWeight="bold"
            mt={1}
          >
            <Icon as={FaMinus} color="orange.300" mr={1} />
            Ingresos
          </Text>
          <HStack>
            <Text fontSize="sm" fontWeight="bold">
              {symbol}
            </Text>
            <Text fontSize="sm" fontWeight="bold">
              {incoming < 1000000 ? incoming : abbreviateNumber(incoming, 2)}
            </Text>
          </HStack>

          <Text color="blackAlpha.600" fontSize="sm" fontWeight="bold" mt={2}>
            {date}
          </Text>
        </GridItem>
      </Grid>
    </Box>
  );
};
