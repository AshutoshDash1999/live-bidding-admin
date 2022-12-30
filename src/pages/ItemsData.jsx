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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from 'firebase/firestore';
import { Link as RouterLink } from 'react-router-dom';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import BaseLayout from '../components/baselayout/BaseLayout';
import { db } from '../utils/firebaseConfig';

function ItemsData() {
  const [loading, setLoading] = useState(true);
  const [itemDataArray, setItemDataArray] = useState([]);

  useEffect(() => {
    const querySnap = query(collection(db, 'itemData'));
    const getData = onSnapshot(querySnap, (querySnapshot) => {
      const itemArray = [];
      querySnapshot.forEach((doc) => {
        itemArray.push(doc.data());
      });
      setItemDataArray(itemArray);
      setLoading(false);
    });
    return () => getData();
  }, []);

  // delete item
  const deleteItem = (itemId) => {
    const docRef = doc(db, 'itemData', itemId);
    try {
      // setIsLoading(true);
      deleteDoc(docRef)
        .then(() => {
          console.log('Entire Document has been deleted successfully.');
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
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
              <TableCaption placement='top'>All Item&apos;s Data</TableCaption>
              <Thead>
                <Tr>
                  <Th>Sl. No.</Th>
                  <Th>Item Name</Th>
                  <Th>Item Price</Th>
                  <Th>Item Image</Th>
                  <Th>Remaining Time</Th>
                  <Th>Item ID</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {itemDataArray.map((dataItem, index) => (
                  <Tr key={index}>
                    <Td>{index + 1}</Td>
                    <Td>{dataItem.itemName}</Td>
                    <Td>₹{dataItem.itemPrice}</Td>
                    <Td>
                      <Image
                        rounded='lg'
                        boxSize='100px'
                        objectFit='cover'
                        alt={dataItem.itemName}
                        src={dataItem.itemPhotoURL}
                      />
                    </Td>
                    <Td>{dataItem.auctionTimeLeft}</Td>
                    <Td>
                      <Link
                        as={RouterLink}
                        to={`/product/${dataItem.itemId}`}
                        isExternal
                      >
                        <Text>
                          {dataItem.itemId} <ExternalLinkIcon />{' '}
                        </Text>
                      </Link>
                    </Td>
                    <Td>
                      <Button
                        colorScheme='red'
                        onClick={() => deleteItem(dataItem.itemId)}
                      >
                        Delete
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
