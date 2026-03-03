import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { loginSimulation } from "../../simulation/login";
import logo from "../../assets/images/logo.png"
import iesImg from "../../assets/images/IES.png"
import { useAuthStore } from "../../store/auth.store";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const toast = useToast();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    loginSimulation(username, password)
      .then((res) => {
        login(res.name);
        toast({
          title: "Успешный вход",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: "Неверный логин или пароль",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Center
      bg={`
        linear-gradient(rgba(15,23,41,0.8), rgba(15,23,41,0.8)),
        url(${iesImg})
      `}
      bgSize="cover"
      bgPosition="center"
      h="100vh"
      w="100vw"
      flexDir="column"
      gap={6}
    >
      <Flex
        direction="column"
        as="form"
        onSubmit={onSubmit}
        bg="#fff"
        color="blackAlpha.800"
        p={6}
        rounded={16}
        gap={4}
        maxW="435px"
      >
        <Image src={logo} mx="auto" />
        <Text
          fontWeight={600}
          fontSize={20}
          lineHeight="28px"
          letterSpacing="-2%"
          textAlign="center"
        >
          Enter username and password to login
        </Text>

        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </FormControl>

        <Button type="submit" variant="secondary" isLoading={isLoading}>
          Login
        </Button>
      </Flex>
    </Center>
  );
}
