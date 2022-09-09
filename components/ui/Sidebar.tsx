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

/**
 * Array of links to be displayed in the sidebar
 */
const LinkItems: Array<LinkItemProps> = [
  {name: "Dashboard", icon: MdSpaceDashboard, href: "/dashboard"},
  {name: "Billeteras", icon: FaMoneyBillWave, href: "/wallets"},
  {name: "Historial", icon: GiBackwardTime, href: "/history"},
  {name: "Cuentas", icon: BsFillPiggyBankFill, href: "/accounts"},
  {name: "Presupuesto", icon: BiCalendarCheck, href: "/budget"},
];

const SidebarContext = createContext({});

interface SidebarProps {
  sidebarIsFullWidth: boolean;
  onClose: () => void;
  onOpen: () => void;
}

/**
 * Sidebar component. Shows a sidebar with links to the main pages of the app.
 * @param sidebarIsFullWidth - Whether the sidebar is open or not.
 * @param onClose - Function to close the sidebar.
 * @param onOpen - Function to open the sidebar.
 * @returns {JSX.Element} Sidebar component
 */
export const Sidebar = ({sidebarIsFullWidth, onClose, onOpen}: SidebarProps) => {
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
        w={{md: sidebarIsFullWidth ? 60 : 20}}
      >
        <Flex alignItems="center" h="20" justifyContent="space-between" mx="4">
          <Text color="white" fontFamily="monospace" fontSize="3xl" fontWeight="bold">
            {sidebarIsFullWidth ? "finArgy" : "fA"}
          </Text>
          <Icon
            as={sidebarIsFullWidth ? AiFillCaretLeft : AiFillCaretRight}
            color="white"
            cursor="pointer"
            fontSize="2xl"
            onClick={sidebarIsFullWidth ? onClose : onOpen}
          />
        </Flex>
        {LinkItems.map((link, index) => (
          <FullWidthItem
            key={index}
            href={link.href}
            icon={link.icon}
            name={link.name}
            sidebarIsFullWidth={sidebarIsFullWidth}
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
  sidebarIsFullWidth: boolean;
}
/**
 * FullWidthItem component. Shows a link to a page in the sidebar.
 * @param icon - Icon to show in the sidebar.
 * @param href - Link to the page.
 * @param name - Name of the page.
 * @param sidebarIsFullWidth - Whether the sidebar is open or not.
 * @returns {JSX.Element} Sidebar component
 */
const FullWidthItem = ({icon, href, name, sidebarIsFullWidth, ...rest}: FullWidthItemProps) => {
  //Handle selected option state
  const {selectedOption, setSelectedOption} = useContext(SidebarContext);

  //Boolean to check if the item is selected
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
        fontWeight="bold"
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
            fontWeight="bold"
            h={6}
            mr="4"
          />
        )}
        {sidebarIsFullWidth && <Text>{name}</Text>}
      </Flex>
    </Link>
  );
};
