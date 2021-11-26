import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Link,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { NavLink as RouterLink } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useLocation } from "react-router-dom";
export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const location = useLocation().pathname;

  return (
    <Box>
      <Flex
        bg={useColorModeValue("blue.500")}
        color={useColorModeValue("white")}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        maxH="60px"
        borderColor={useColorModeValue("gray.200")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          align="center"
          justify={{ base: "center", md: "start" }}
        >
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("white")}
          >
            <Image width={{ base: 150, md: 200 }} src="/images/SDS_LOGO.jpg" />
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav location={location} />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          align="center"
          spacing={6}
          minW={{ base: 150, md: 400 }}
        >
          <Box display={{ base: "none", md: "flex" }} fontWeight="bold">
            Student: Rafael Carvalho
          </Box>
          <Button
            display={{ base: "inline-flex", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"gray.600"}
            href={"#"}
            _hover={{
              bg: "gray.500",
            }}
          >
            Logout
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = ({ location }) => {
  const linkHoverColor = useColorModeValue("white.200");
  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <>
          <Link
            key={navItem.href}
            as={RouterLink}
            to={navItem.href}
            height="100%"
            p={4}
            borderRadius={6}
            color={location === navItem.href ? "white" : "gray.200"}
            fontWeight={location === navItem.href ? "bold" : "normal"}
            style={{ outline: "none" }}
            _hover={{
              textDecoration: "none",
              color: linkHoverColor,
            }}
            _focus={{ outline: "none" }}
            bg={location === navItem.href ? "blue.600" : "blue.500"}
          >
            {navItem.label}
          </Link>
        </>
      ))}
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Checkin",
    href: "/checkin",
  },
  {
    label: "History",
    href: "/history",
  },
];
