import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
  CheckboxIcon,
  Flex,
  Heading,
  HStack,
  Image,
  List,
  ListIcon,
  ListItem,
  Spacer,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { child, get, ref } from 'firebase/database';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import BaseLayout from '../components/baselayout/BaseLayout';
import { db, rtdb } from '../utils/firebaseConfig';

dayjs.extend(relativeTime);

function ProductPage() {
  const toast = useToast();
  const { productID } = useParams();
  const [productData, setProductData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [highestBidderName, setHighestBidderName] = useState('');
  const [highestBiddedPrice, setHighestBiddedPrice] = useState('0');
  const [highestBidderEmail, setHighestBidderEmail] = useState('');

  useEffect(() => {
    get(child(ref(rtdb), `product/product_id_${productData.itemId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setHighestBidderName(snapshot.val().accountHolderName);
          setHighestBiddedPrice(snapshot.val().highestBiddedPrice);
          setHighestBidderEmail(snapshot.val().accountHolderEmail);
          //   console.log(snapshot.val());
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        // console.error(error);
        toast({
          // title: "Bidding successfull.",
          description: error,
          status: 'error',
          duration: 2000,
          isClosable: false,
        });
      });
  }, [productData]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const docRef = doc(db, 'itemData', `${productID?.toString()}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // console.log(docSnap.data());
          setProductData(docSnap.data());
        } else {
          // doc.data() will be undefined in this case
          toast({
            title: 'Product not found',
            status: 'error',
            duration: 2000,
            isClosable: false,
          });
        }
      } catch (error) {
        toast({
          title: 'Something went wrong.',
          description: `${error}`,
          status: 'error',
          duration: 2000,
          isClosable: false,
        });
      }
      setIsLoading(false);
    };

    fetchProductData().catch((err) =>
      toast({
        title: "Couldn't fetch the data.",
        description: `${err}`,
        status: 'error',
        duration: 2000,
        isClosable: false,
      })
    );
  }, [productID]);

  return (
    <Box p='2'>
      <BaseLayout>
        {isLoading ? (
          <Center h='50vh'>
            <Spinner color='teal' size='xl' />
          </Center>
        ) : (
          <Flex
            alignItems='center'
            justifyContent='center'
            gap={{ base: '8', md: '10' }}
            direction={{ base: 'column', md: 'row' }}
          >
            <Spacer />
            <Box boxSize='lg' rounded='lg' p='4'>
              <Image
                rounded='lg'
                boxSize={{ base: 'xs', md: 'md' }}
                src={productData.itemPhotoURL}
                objectFit='cover'
                height='100%'
                fallbackSrc='https://via.placeholder.com/450?text=Loading+Image...'
              />
            </Box>
            <Spacer />

            <Box p='4'>
              <Text color='gray.600'>
                Product ID: {productData.itemId.toUpperCase()}
              </Text>

              <Heading mb={2} as='h2' size='2xl'>
                {productData.itemName}
              </Heading>
              {dayjs(productData.auctionTimeLeft).fromNow().includes('ago') ? (
                <Alert status='error' borderRadius='md' variant='left-accent'>
                  <AlertIcon />
                  <AlertTitle>Timer expired!</AlertTitle>
                  <AlertDescription>
                    Please check other auctions in our platform.
                  </AlertDescription>
                </Alert>
              ) : (
                <HStack spacing='24px'>
                  <Box background='gray.200' p={4} borderRadius='md'>
                    <Text fontSize='lg'>Auction ending in</Text>
                    <Text fontSize='2xl' fontWeight='bold'>
                      {dayjs(productData.auctionTimeLeft).fromNow()}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize='lg'>
                      Auction Price: ₹
                      <span>{productData.itemPrice.toLocaleString()}</span>
                    </Text>
                  </Box>
                </HStack>
              )}

              <Alert
                my='2'
                status='success'
                borderRadius='md'
                variant='left-accent'
              >
                <AlertDescription>
                  <Flex wrap='wrap'>
                    <Text fontSize='lg'>
                      Last highest bidded price is &nbsp;
                    </Text>
                    <Text fontWeight='bold' color='green.800'>
                      ₹ {highestBiddedPrice}
                    </Text>
                    <span>&nbsp;by&nbsp;</span>
                    <Text fontWeight='bold' color='green.800'>
                      {highestBidderName}
                    </Text>
                    &nbsp;
                    <Text fontWeight='bold' color='green.800'>
                      ({highestBidderEmail})
                    </Text>
                  </Flex>
                </AlertDescription>
              </Alert>

              <Box>
                <Heading fontSize='md'>Product Features</Heading>
                <List spacing={3}>
                  <ListItem>
                    <ListIcon as={CheckboxIcon} color='green.500' />
                    {productData.itemDesc}
                  </ListItem>

                  {/* You can also use custom icons from react-icons */}
                </List>
              </Box>
            </Box>
            <Spacer />
          </Flex>
        )}
      </BaseLayout>
    </Box>
  );
}
export default ProductPage;
