import {useContext} from "react";
import {Box, Flex, Icon, Text, FlexProps, Link, Grid} from "@chakra-ui/react";
import NextLink from "next/link";
import {MdSpaceDashboard} from "react-icons/md";
import {FaMoneyBillWave} from "react-icons/fa";
import {GiBackwardTime} from "react-icons/gi";
import {BsFillPiggyBankFill} from "react-icons/bs";
import {BiCalendarCheck} from "react-icons/bi";
import {AiFillCaretLeft, AiFillCaretRight} from "react-icons/ai";
import {IconType} from "react-icons";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import Avatar from "boring-avatars";

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
 * Creates a user avatar based on the user's name.
 * @returns {JSX.Element} - User avatar.
 * If the sidebar is open, the user's name is displayed.
 */
const UserAvatar = () => {
  const {data: session} = useSession();
  const {isSidebarOpen} = useContext(UIContext);

  const userIcon = (
    <Avatar
      colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
      name={`avatar-${session?.user?.name}`}
      size={48}
      // las variantes pueden ser: "marble", "beam", "pixel", "sunset", "ring", "bauhaus"
      variant="marble"
    />
  );

  return (
    <Flex alignItems="center" h="50px" marginBottom={1} p={4} transition="all 0.35s">
      <Grid>{userIcon}</Grid>
      {isSidebarOpen && (
        <Text color="white" fontSize="sm" fontWeight="bold" marginLeft={2} whiteSpace="nowrap">
          {session?.user?.name}
        </Text>
      )}
    </Flex>
  );
};

/**
 * Sidebar component. Shows a sidebar with links to the main pages of the app.
 * @returns {JSX.Element} Sidebar component
 */
export const Sidebar = () => {
  const {isSidebarOpen, toggleSidebar} = useContext(UIContext);

  //Generate gradent background color for the sidebar
  const backgroundLinearGradient = `linear-gradient(135deg, #9F7AEB 0%, #668BD2 50%, #6132A4 100%)`;

  return (
    <Box
      bg={backgroundLinearGradient}
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
      <UserAvatar />
      {LinkItems.map((link) => (
        <NavItem key={link.href} href={link.href} icon={link.icon} name={link.name} />
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  href: string;
  name: String;
}
/**
 * NavItem component. Shows a link to a page in the sidebar.
 * @param icon - Icon to show in the sidebar.
 * @param href - Link to the page.
 * @param name - Name of the page.
 * @returns {JSX.Element} Sidebar component
 */
const NavItem = ({icon, href, name, ...rest}: NavItemProps) => {
  // * para eliminar el problema de el estado inicial que puede ser otra ruta
  const {asPath} = useRouter();
  const {isSidebarOpen} = useContext(UIContext);

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
          {isSidebarOpen && (
            <Text fontSize="sm" fontWeight="bold" ml={4}>
              {name}
            </Text>
          )}
        </Flex>
      </Link>
    </NextLink>
  );
};
