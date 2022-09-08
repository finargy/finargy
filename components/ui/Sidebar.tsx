import React, {ReactNode, createContext, useContext} from "react";
import {
  IconButton,
  Box,
  CloseButton,
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

export const Sidebar = ({children}: {children: ReactNode}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [selectedOption, setSelectedOption] = React.useState("Dashboard");

  return (
    <SidebarContext.Provider value={{selectedOption, setSelectedOption}}>
      <Box bg={useColorModeValue("gray.100", "gray.900")} minH="100vh">
        <SidebarContent display={{base: "none", md: "block"}} onClose={() => onClose} />
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          returnFocusOnClose={false}
          size="full"
          onClose={onClose}
          onOverlayClick={onClose}
        >
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
        {/* mobilenav */}
        <MobileNav display={{base: "flex", md: "none"}} onOpen={onOpen} />
        <Box ml={{base: 0, md: 60}} p="4">
          {children}
        </Box>
      </Box>
    </SidebarContext.Provider>
  );
};

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({onClose, ...rest}: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue("purple.400", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("#edf2f7", "#edf2f7")}
      h="full"
      pos="fixed"
      w={{base: "full", md: 60}}
      {...rest}
    >
      <Flex alignItems="center" h="20" justifyContent="space-between" mx="8">
        <Text color="white" fontFamily="monospace" fontSize="3xl" fontWeight="bold">
          finArgy
        </Text>
        <CloseButton display={{base: "flex", md: "none"}} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} href={link.href} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
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

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({onOpen, ...rest}: MobileProps) => {
  return (
    <Flex
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      borderBottomWidth="1px"
      height="20"
      justifyContent="flex-start"
      ml={{base: 0, md: 60}}
      px={{base: 4, md: 24}}
      {...rest}
    >
      <IconButton
        aria-label="open menu"
        icon={<MdSpaceDashboard />}
        variant="outline"
        onClick={onOpen}
      />

      <Text fontFamily="monospace" fontSize="2xl" fontWeight="bold" ml="8">
        Logo
      </Text>
    </Flex>
  );
};
