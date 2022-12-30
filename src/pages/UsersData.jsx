import {
  Box, Flex, Spinner, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import BaseLayout from '../components/baselayout/BaseLayout';
import { db } from '../utils/firebaseConfig';

export default function UsersData() {
  const [loading, setLoading] = useState(true);
  const [userDataArray, setUserDataArray] = useState();
  useEffect(() => {
    const querySnap = query(collection(db, 'userData'));
    const getData = onSnapshot(querySnap, (querySnapshot) => {
      const itemDataArray = [];
      querySnapshot.forEach((doc) => {
        itemDataArray.push(doc.data());
      });
      setUserDataArray(itemDataArray);
      setLoading(false);
    });
    return () => getData();
  }, []);

  return (
    <Box p="2">
      <BaseLayout>
        {loading ? (
          <Flex alignItems="center" justifyContent="center" h="100%">
            <Spinner color="purple.500" size="xl" />
          </Flex>
        ) : (
          <TableContainer>
            <Table variant="simple">
              <TableCaption placement="top">All User&apos;s Data</TableCaption>
              <Thead>
                <Tr>
                  <Th>First Name</Th>
                  <Th>Last Name</Th>
                  <Th>Email</Th>
                  <Th>Phone Number</Th>
                  <Th>Role</Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                    userDataArray.map((dataItem) => (
                      <Tr key={dataItem.email}>
                        <Td>{dataItem.firstName}</Td>
                        <Td>{dataItem.lastName}</Td>
                        <Td>{dataItem.mailID}</Td>
                        <Td>{dataItem.mobileNumber}</Td>
                        <Td>{dataItem.role}</Td>
                      </Tr>
                    ))
                  }
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </BaseLayout>
    </Box>
  );
}
