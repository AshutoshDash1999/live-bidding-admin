import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';

function BaseLayout({ children }) {
  return (
    <Flex gap="4">
      <Box>
        <Sidebar />
      </Box>
      <Box width="100%" p="2" bg={useColorModeValue('purple.50', 'whiteAlpha.100')} rounded="md">{children}</Box>
    </Flex>
  );
}

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BaseLayout;
