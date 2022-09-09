import React, {createContext, useContext} from "react";
import {Box, Flex, Icon, useColorModeValue, Link, Text, FlexProps} from "@chakra-ui/react";
import {MdSpaceDashboard} from "react-icons/md";
import {FaMoneyBillWave} from "react-icons/fa";
import {GiBackwardTime} from "react-icons/gi";
import {BsFillPiggyBankFill} from "react-icons/bs";
import {BiCalendarCheck} from "react-icons/bi";
import {IconType} from "react-icons";
import {AiFillCaretLeft, AiFillCaretRight} from "react-icons/ai";

interface LinkItemProps {
  icon: IconType;
  href: string;
  name: String;
}

const LinkItems: Array<LinkItemProps> = [
  {name: "Dashboard", icon: MdSpaceDashboard, href: "/dashboard"},
  {name: "Billeteras", icon: FaMoneyBillWave, href: "/wallets"},
  {name: "Historial", icon: GiBackwardTime, href: "/history"},
  {name: "Cuentas", icon: BsFillPiggyBankFill, href: "/accounts"},
  {name: "Presupuesto", icon: BiCalendarCheck, href: "/budget"},
];

const SidebarContext = createContext({});

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const Sidebar = ({isOpen, onClose, onOpen}: SidebarProps) => {
  const [selectedOption, setSelectedOption] = React.useState("Dashboard");

  return (
    <SidebarContext.Provider value={{selectedOption, setSelectedOption}}>
      <Box
        bg={useColorModeValue("purple.400", "gray.900")}
        borderRight="1px"
        borderRightColor={useColorModeValue("white", "white")}
        h="full"
        pos="fixed"
        transition="all 0.3s"
        w={{md: isOpen ? 60 : 20}}
      >
        <Flex alignItems="center" h="20" justifyContent="space-between" mx="4">
          <Text color="white" fontFamily="monospace" fontSize="3xl" fontWeight="bold">
            {isOpen ? "finArgy" : "fA"}
          </Text>
          <Icon
            as={isOpen ? AiFillCaretLeft : AiFillCaretRight}
            color="white"
            cursor="pointer"
            fontSize="2xl"
            onClick={isOpen ? onClose : onOpen}
          />
        </Flex>
        {LinkItems.map((link, index) => (
          <FullWidthItem
            key={index}
            href={link.href}
            icon={link.icon}
            isOpen={isOpen}
            name={link.name}
          />
        ))}
      </Box>
    </SidebarContext.Provider>
  );
};

interface FullWidthItemProps extends FlexProps {
  icon: IconType;
  href: string;
  name: String;
  isOpen: boolean;
}
const FullWidthItem = ({icon, href, name, isOpen, ...rest}: FullWidthItemProps) => {
  const {selectedOption, setSelectedOption} = useContext(SidebarContext);

  const isSelected = selectedOption === name;

  return (
    <Link
      _focus={{boxShadow: "none"}}
      href="#"
      style={{textDecoration: "none"}}
      onClick={() => {
        setSelectedOption(name);
        console.log("reditecting to " + href);
      }}
    >
      {/* <Link _focus={{boxShadow: "none"}} href={href} style={{textDecoration: "none"}}> */}
      <Flex
        _hover={{
          bg: isSelected ? "white" : "purple.300",
          // color: "purple.400",
        }}
        align="center"
        bg={isSelected ? "white" : "purple.500"}
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
            h={6}
            mr="4"
          />
        )}
        {isOpen && <Text>{name}</Text>}
      </Flex>
    </Link>
  );
};
