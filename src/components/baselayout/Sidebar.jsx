import { Button, Stack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const SidebarMenu = [
  {
    name: 'User Data',
    href: '/usersData',
  },
  {
    name: 'Item Data',
    href: '/itemsData',
  },
];

function Sidebar() {
  return (
    <Stack
      direction="column"
      gap="4"
      bg="purple.50"
      p="2"
      rounded="md"
      w={{ base: 'full', md: 60 }}
      h="95vh"
    >
      {SidebarMenu.map((item) => (
        <Link to={item.href} key={item.href}>
          <Button colorScheme="purple" w="100%">{item.name}</Button>
        </Link>
      ))}
    </Stack>
  );
}
export default Sidebar;
