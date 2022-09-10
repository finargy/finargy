import {useContext} from "react";
import {Box, Flex, Icon, Text, FlexProps, Link} from "@chakra-ui/react";
import NextLink from "next/link";
import {MdSpaceDashboard} from "react-icons/md";
import {FaMoneyBillWave} from "react-icons/fa";
import {GiBackwardTime} from "react-icons/gi";
import {BsFillPiggyBankFill} from "react-icons/bs";
import {BiCalendarCheck} from "react-icons/bi";
import {AiFillCaretLeft, AiFillCaretRight} from "react-icons/ai";
import {IconType} from "react-icons";
import {useRouter} from "next/router";

import {UIContext} from "../../context/ui";

interface LinkItemProps {
  icon: IconType;
  href: string;
  name: String;
}

/**
 * Array of links to be displayed in the sidebar
 */
const LinkItems: LinkItemProps[] = [
  {name: "Dashboard", icon: MdSpaceDashboard, href: "/dashboard"},
  {name: "Billeteras", icon: FaMoneyBillWave, href: "/wallets"},
  {name: "Historial", icon: GiBackwardTime, href: "/history"},
  {name: "Cuentas", icon: BsFillPiggyBankFill, href: "/accounts"},
  {name: "Presupuesto", icon: BiCalendarCheck, href: "/budget"},
];

/**
 * Sidebar component. Shows a sidebar with links to the main pages of the app.
 * @param sidebarIsFullWidth - Whether the sidebar is open or not.
 * @param onClose - Function to close the sidebar.
 * @param onOpen - Function to open the sidebar.
 * @returns {JSX.Element} Sidebar component
 */
export const Sidebar = () => {
  const {isSidebarOpen, toggleSidebar} = useContext(UIContext);

  return (
    <Box
      bg="purple.400"
      borderRight="1px"
      borderRightColor="white"
      h="full"
      pos="fixed"
      transition="all 0.3s"
      w={isSidebarOpen ? 60 : 20}
    >
      <Flex alignItems="center" h={20} justifyContent="space-between" mx={4}>
        <Text color="white" fontFamily="monospace" fontSize="3xl" fontWeight="bold">
          {isSidebarOpen ? "finArgy" : "fA"}
        </Text>
        <Icon
          as={isSidebarOpen ? AiFillCaretLeft : AiFillCaretRight}
          color="white"
          cursor="pointer"
          fontSize="2xl"
          onClick={toggleSidebar}
        />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.href}
          href={link.href}
          icon={link.icon}
          isSidebarFullWidth={isSidebarOpen}
          name={link.name}
        />
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  href: string;
  name: String;
  isSidebarFullWidth: boolean;
}
/**
 * NavItem component. Shows a link to a page in the sidebar.
 * @param icon - Icon to show in the sidebar.
 * @param href - Link to the page.
 * @param name - Name of the page.
 * @param isSidebarFullWidth - Whether the sidebar is open or not.
 * @returns {JSX.Element} Sidebar component
 */
const NavItem = ({icon, href, name, isSidebarFullWidth, ...rest}: NavItemProps) => {
  // * para eliminar el problema de el estado inicial que puede ser otra ruta
  const {asPath} = useRouter();

  //Boolean to check if the item is selected
  const isSelected = asPath === href;

  return (
    <NextLink passHref href={href}>
      <Link>
        <Flex
          _hover={{
            bg: isSelected ? "white" : "purple.300",
          }}
          alignItems="center"
          bg={isSelected ? "white" : "purple.500"}
          borderLeftRadius="30px"
          borderRightRadius={isSelected ? "revert" : "30px"}
          color={isSelected ? "purple.400" : "white"}
          fontWeight="bold"
          h="50px"
          marginBottom={1}
          marginLeft={4}
          marginRight={isSelected ? 0 : 4}
          p={4}
          role="group"
          transition="all 0.35s"
          {...rest}
        >
          <Icon
            _groupHover={{
              color: isSelected ? "purple.400" : "none",
            }}
            as={icon}
            fontSize="md"
          />
          {isSidebarFullWidth && (
            <Text fontSize="sm" fontWeight="bold" ml={4}>
              {name}
            </Text>
          )}
        </Flex>
      </Link>
    </NextLink>
  );
};
