import {
  Badge,
  Box,
  Button,
  Flex,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from 'firebase/firestore';
import { DeleteIcon } from '@chakra-ui/icons';
import BaseLayout from '../components/baselayout/BaseLayout';
import { db } from '../utils/firebaseConfig';

export default function UsersData() {
  const [loading, setLoading] = useState(true);
  const [userDataArray, setUserDataArray] = useState();
  const toast = useToast();

  useEffect(() => {
    const querySnap = query(collection(db, 'userData'));
    const getData = onSnapshot(querySnap, (querySnapshot) => {
      const itemDataArray = [];
      querySnapshot.forEach((document) => {
        itemDataArray.push(document.data());
      });
      setUserDataArray(itemDataArray);
      setLoading(false);
      // console.log(userDataArray);
    });
    return () => getData();
  }, []);

  const deleteItemHandler = (id) => {
    deleteDoc(doc(db, 'userData', id))
      .then(() =>
        toast({
          title: 'Delete Item Successfull.',
          status: 'success',
          duration: 2000,
          isClosable: false,
        })
      )
      .catch((error) =>
        toast({
          title: 'Delete Item Unsuccessfull.',
          description: error,
          status: 'success',
          duration: 2000,
          isClosable: false,
        })
      );
  };

  return (
    <Box p='2'>
      <BaseLayout>
        {loading ? (
          <Flex alignItems='center' justifyContent='center' h='100%'>
            <Spinner color='purple.500' size='xl' />
          </Flex>
        ) : (
          <TableContainer>
            <Table variant='simple'>
              <TableCaption placement='top'>All User&apos;s Data</TableCaption>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Phone Number</Th>
                  <Th>Role</Th>
                  <Th>Bank Account No.</Th>
                  <Th>Address</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {userDataArray.map((dataItem) => (
                  <Tr key={dataItem.mailID}>
                    <Td>{dataItem.firstName}</Td>
                    <Td>{dataItem.mailID}</Td>
                    <Td>{dataItem.mobileNumber}</Td>
                    <Td>
                      <Badge
                        colorScheme={
                          dataItem.role === 'seller' ? 'green' : 'purple'
                        }
                      >
                        {dataItem.role}
                      </Badge>
                    </Td>
                    <Td>{dataItem.bankAccountNo}</Td>
                    <Td>{dataItem.address}</Td>
                    <Td>
                      <Button
                        colorScheme='red'
                        onClick={() => deleteItemHandler(dataItem.userId)}
                      >
                        <DeleteIcon />
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </BaseLayout>
    </Box>
  );
}
