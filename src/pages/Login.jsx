import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const toast = useToast();
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    loginid: '',
    password: '',
  });

  const handleLoginInput = (event) => {
    setLoginInfo({
      ...loginInfo,
      [event.target.name]: event.target.value,
    });
  };

  localStorage.setItem('loginid', loginInfo.loginid);
  localStorage.setItem('password', loginInfo.password);
  window.localStorage.setItem('isAuthenticated', 'false');

  // console.log(loginInfo);
  const handleLogin = () => {
    if (localStorage.getItem('loginid') === 'admin' && localStorage.getItem('password') === 'admin') {
      window.localStorage.setItem('isAuthenticated', 'true');
      toast({
        title: 'Login Successfull.',
        status: 'success',
        duration: 2000,
        isClosable: false,
      });
      navigate('/usersData');
    }
    // console.log(localStorage.getItem('isAuthenticated'));
  };
  // console.log(localStorage.getItem('isAuthenticated'));

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl" textAlign="center">Sign in to Live Bidding Admin Panel</Heading>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Login ID</FormLabel>
              <Input type="text" name="loginid" onChange={handleLoginInput} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" onChange={handleLoginInput} />
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg="purple.400"
                color="white"
                _hover={{
                  bg: 'purple.500',
                }}
                onClick={handleLogin}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
