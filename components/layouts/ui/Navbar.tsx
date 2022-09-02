import React from "react";
import {Box, Container, Icon, Stack, Text, useBreakpointValue, VStack} from "@chakra-ui/react";
import {MdSpaceDashboard} from "react-icons/md";
import {FaMoneyBillWave} from "react-icons/fa";
import {GiBackwardTime} from "react-icons/gi";
import {BsFillPiggyBankFill} from "react-icons/bs";
import {BiCalendarCheck} from "react-icons/bi";

export const Navbar = () => {
  const largeScreen = useBreakpointValue({base: false, sm: true});

  return (
    <>
      {largeScreen ? (
        <Box p={1} position="fixed" top={0}>
          <Text>Large screen</Text>
        </Box>
      ) : (
        <Container bottom={0} color="blackAlpha.800" p={3} position="fixed">
          <Stack direction="row" fontSize="xs" gap={4} justifyContent="center">
            <VStack>
              <Icon as={FaMoneyBillWave} fontSize="3xl" />
              <Text mt="0 !important">Billeteras</Text>
            </VStack>
            <VStack>
              <Icon as={MdSpaceDashboard} fontSize="3xl" />
              <Text mt="0 !important">Dashboard</Text>
            </VStack>
            <VStack>
              <Icon as={GiBackwardTime} fontSize="3xl" />
              <Text mt="0 !important">Historial</Text>
            </VStack>
            <VStack>
              <Icon as={BiCalendarCheck} fontSize="3xl" />
              <Text mt="0 !important">Plan</Text>
            </VStack>
            <VStack>
              <Icon as={BsFillPiggyBankFill} fontSize="3xl" />
              <Text mt="0 !important">Presupuesto</Text>
            </VStack>
          </Stack>
        </Container>
      )}
    </>
  );
};
