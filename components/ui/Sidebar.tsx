import React, {createContext, useContext} from "react";
import {
  Box,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
} from "@chakra-ui/react";
import {MdSpaceDashboard} from "react-icons/md";
import {FaMoneyBillWave} from "react-icons/fa";
import {GiBackwardTime} from "react-icons/gi";
import {BsFillPiggyBankFill} from "react-icons/bs";
import {BiCalendarCheck} from "react-icons/bi";
import {IconType} from "react-icons";

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}

const LinkItems: Array<LinkItemProps> = [
  {name: "Dashboard", icon: MdSpaceDashboard, href: "/dashboard"},
  {name: "Billeteras", icon: FaMoneyBillWave, href: "/wallets"},
  {name: "Historial", icon: GiBackwardTime, href: "/history"},
  {name: "Cuentas", icon: BsFillPiggyBankFill, href: "/accounts"},
  {name: "Presupuesto", icon: BiCalendarCheck, href: "/budget"},
];

const SidebarContext = createContext({});

export const Sidebar = () => {
  const [selectedOption, setSelectedOption] = React.useState("Dashboard");

  return (
    <SidebarContext.Provider value={{selectedOption, setSelectedOption}}>
      <Box
        bg={useColorModeValue("purple.400", "gray.900")}
        borderRight="1px"
        borderRightColor={useColorModeValue("#edf2f7", "#edf2f7")}
        h="full"
        pos="fixed"
        w={{base: "full", md: 60}}
      >
        <Flex alignItems="center" h="20" justifyContent="space-between" mx="8">
          <Text color="white" fontFamily="monospace" fontSize="3xl" fontWeight="bold">
            finArgy
          </Text>
        </Flex>
        {LinkItems.map((link) => (
          <NavItem key={link.name} href={link.href} icon={link.icon}>
            {link.name}
          </NavItem>
        ))}
      </Box>
    </SidebarContext.Provider>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  href: string;
  children: String;
}
const NavItem = ({icon, href, children, ...rest}: NavItemProps) => {
  const {selectedOption, setSelectedOption} = useContext(SidebarContext);

  const isSelected = selectedOption === children;

  return (
    <Link
      _focus={{boxShadow: "none"}}
      href="#"
      style={{textDecoration: "none"}}
      onClick={() => {
        setSelectedOption(children);
        console.log("reditecting to " + href);
      }}
    >
      {/* <Link _focus={{boxShadow: "none"}} href={href} style={{textDecoration: "none"}}> */}
      <Flex
        _hover={{
          bg: isSelected ? "#edf2f7" : "purple.300",
          // color: "purple.400",
        }}
        align="center"
        bg={isSelected ? "#edf2f7" : "purple.500"}
        borderLeftRadius="30px"
        borderRightRadius={isSelected ? "revert" : "30px"}
        color={isSelected ? "purple.400" : "white"}
        cursor="pointer"
        fontWeight={isSelected ? "bold" : "semibold"}
        marginBottom="1"
        marginLeft="4"
        marginRight={isSelected ? "0" : "4"}
        p="4"
        role="group"
        transition="all 0.35s"
        {...rest}
      >
        {icon && (
          <Icon
            _groupHover={{
              color: isSelected ? "purple.400" : "white",
            }}
            as={icon}
            fontSize="16"
            mr="4"
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};
