import {FC, useMemo} from "react";
import {Box, Center, Flex, HStack, Icon, Text, VStack} from "@chakra-ui/react";
import {Doughnut} from "react-chartjs-2";
import {FaMinus} from "react-icons/fa";

import {abbreviateNumber} from "../../utils";

type Props = {
  expense: number;
  incoming: number;
  symbol: string;
};

export const TotalBalance: FC<Props> = ({expense, incoming, symbol}) => {
  const data = useMemo(
    () => ({
      labels: ["Ingresos", "Gastos"],
      datasets: [
        {
          data: [incoming, expense],
          backgroundColor: ["rgba(255, 226, 0, 0.5)", "rgba(0, 116, 255, 0.5)"],
          borderColor: ["rgba(255, 174, 0, 1)", "rgba(0, 116, 255, 1)"],
          borderWidth: 1,
          radius: 100,
          hoverOffset: 4,
        },
      ],
    }),
    [expense, incoming],
  );

  return (
    <Flex alignItems="center" h="250px" justifyContent="center" position="relative">
      <Box left={0} position="absolute" top={0}>
        <Text
          alignItems="center"
          color="blackAlpha.600"
          display="flex"
          fontSize="xs"
          fontWeight="bold"
        >
          Gastos
        </Text>
        <HStack>
          <Icon as={FaMinus} color="blue.500" h={6} mr={1} />
          <Text fontSize="sm" fontWeight="bold">
            {symbol}
          </Text>
          <Text fontSize="sm" fontWeight="bold">
            {expense < 1000000 ? expense : abbreviateNumber(expense, 2)}
          </Text>
        </HStack>
      </Box>

      <Center h="300px">
        <Doughnut
          data={data}
          options={{
            cutout: 100,
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

      <Box bottom={0} position="absolute" right={0}>
        <Text
          alignItems="center"
          color="blackAlpha.600"
          display="flex"
          fontSize="xs"
          fontWeight="bold"
          justifyContent="end"
        >
          Ingresos
        </Text>
        <HStack>
          <Icon as={FaMinus} color="orange.300" h={6} mr={1} />
          <Text fontSize="sm" fontWeight="bold">
            {symbol}
          </Text>
          <Text fontSize="sm" fontWeight="bold">
            {incoming < 1000000 ? incoming : abbreviateNumber(incoming, 2)}
          </Text>
        </HStack>
      </Box>
    </Flex>
  );
};
