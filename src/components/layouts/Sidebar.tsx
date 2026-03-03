import { Center, Flex, Image, Text, IconButton } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { Icon } from "@iconify/react";
import CustomModal from "../ui/CustomModal";
import { useState } from "react";
import logo from "../../assets/images/logo.png"

const SIDEBAR_ELEMENTS = [
  { label: "Dashboard", path: "/" },
  { label: "Stations", path: "/stations" },
  { label: "Logs", path: "/logs" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const [openLogOutModal, setOpenLogOutModal] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }

    return pathname === path || pathname.startsWith(path);
  };

  return (
    <Flex direction="column" h="100vh" bg="dark.400" py={10} px={4}>
      <Center mb={8}>
        <Image src={logo} h={16} />
      </Center>

      <Flex direction="column" gap={1} flex={1}>
        {SIDEBAR_ELEMENTS.map((item) => (
          <Flex
            key={item.path}
            py={2}
            px={3}
            fontWeight={600}
            rounded={6}
            color="#fff"
            transition="0.3s ease-in-out"
            cursor="pointer"
            lineHeight="24px"
            bg={isActive(item.path) ? "secondary" : "transparent"}
            _hover={{ bg: isActive(item.path) ? "secondary" : "secondary.700" }}
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </Flex>
        ))}
      </Flex>

      <Flex
        align="center"
        justify="space-between"
        p={3}
        bg="secondary"
        rounded={6}
        cursor="pointer"
      >
        <Text color="#fff" fontWeight={600}>
          {user?.name || "Admin"}
        </Text>
        <IconButton
          aria-label="logout"
          icon={<Icon icon="material-symbols:logout-rounded" color="#fff" />}
          onClick={() => setOpenLogOutModal(true)}
        />
      </Flex>
      <CustomModal
        open={openLogOutModal}
        onClose={() => setOpenLogOutModal(false)}
        mode="confirm"
        onConfirm={() => {
          setOpenLogOutModal(false);
          logout();
        }}
        title="Are you sure you want to log out?"
      />
    </Flex>
  );
}
