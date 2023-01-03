import {
  Box,
  Button,
  Flex,
  Image,
  Link,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  query,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { Link as RouterLink } from 'react-router-dom';
import { DeleteIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import dayjs from 'dayjs';
import BaseLayout from '../components/baselayout/BaseLayout';
import { db } from '../utils/firebaseConfig';

function ItemsData() {
  const [loading, setLoading] = useState(true);
  const [itemDataArray, setItemDataArray] = useState();
  const toast = useToast();
  useEffect(() => {
    const querySnap = query(collection(db, 'itemData'));
    const getData = onSnapshot(querySnap, (querySnapshot) => {
      const itemArray = [];
      querySnapshot.forEach((document) => {
        itemArray.push(document.data());
      });
      setItemDataArray(itemArray);
      setLoading(false);
    });
    return () => getData();
  }, []);

  const deleteItemHandler = (e) => {
    deleteDoc(doc(db, 'itemData', e))
      .then(() => toast({
        title: 'Delete Item Successfull.',
        status: 'success',
        duration: 2000,
        isClosable: false,
      }))
      .catch((error) => toast({
        title: 'Delete Item Unsuccessfull.',
        description: error,
        status: 'success',
        duration: 2000,
        isClosable: false,
      }));
  };

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
              <TableCaption placement="top">All Item&apos;s Data</TableCaption>
              <Thead>
                <Tr>
                  <Th>Sl. No.</Th>
                  <Th>Item Name</Th>
                  <Th>Item Price</Th>
                  <Th>Item Image</Th>
                  <Th>Item Publisher</Th>
                  <Th>Ending Time</Th>
                  <Th>Item ID</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {itemDataArray.map((dataItem, index) => (
                  <Tr key={dataItem.email}>
                    <Td>{index + 1}</Td>
                    <Td>{dataItem.itemName}</Td>
                    <Td>
                      ₹
                      {dataItem.itemPrice}
                    </Td>
                    <Td>
                      <Image
                        rounded="lg"
                        boxSize="100px"
                        objectFit="cover"
                        alt={dataItem.itemName}
                        src={dataItem.itemPhotoURL}
                      />
                    </Td>
                    <Td>{dataItem.itemPublisher}</Td>
                    <Td>
                      {dayjs(dataItem.auctionTimeLeft).format(
                        'DD/MM/YYYY hh:mm A',
                      )}
                    </Td>
                    <Td>
                      <Link
                        as={RouterLink}
                        to={`/product/${dataItem.itemId}`}
                        isExternal
                      >
                        <Text>
                          {dataItem.itemId}
                          {' '}
                          <ExternalLinkIcon />
                          {' '}
                        </Text>
                      </Link>
                    </Td>
                    <Td>
                      <Button colorScheme="red" onClick={() => deleteItemHandler(dataItem.itemId)}>
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
export default ItemsData;
