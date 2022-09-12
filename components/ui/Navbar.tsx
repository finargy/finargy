import React from "react";
import {Box, Container, Icon, Link, Stack, Text, VStack} from "@chakra-ui/react";
import NextLink from "next/link";
import {MdSpaceDashboard} from "react-icons/md";
import {FaMoneyBillWave} from "react-icons/fa";
import {GiBackwardTime} from "react-icons/gi";
import {BsFillPiggyBankFill} from "react-icons/bs";
import {BiCalendarCheck} from "react-icons/bi";

import {Sidebar} from "./Sidebar";

export const Navbar = () => {
  return (
    <>
      <Box display={{base: "none", md: "flex"}}>
        <Sidebar />
      </Box>
      {/* TODO: MobileNav component */}
      <Container
        bottom={0}
        color="blackAlpha.800"
        display={{base: "flex", md: "none"}}
        p={3}
        position="fixed"
      >
        <Stack direction="row" fontSize="xs" gap={4} justifyContent="center">
          <NextLink passHref href="/wallets">
            <Link>
              <VStack>
                <Icon as={FaMoneyBillWave} fontSize="3xl" />
                <Text mt="0 !important">Billeteras</Text>
              </VStack>
            </Link>
          </NextLink>
          <NextLink passHref href="/dashboard">
            <Link>
              <VStack>
                <Icon as={MdSpaceDashboard} fontSize="3xl" />
                <Text mt="0 !important">Dashboard</Text>
              </VStack>
            </Link>
          </NextLink>
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
    </>
  );
};
