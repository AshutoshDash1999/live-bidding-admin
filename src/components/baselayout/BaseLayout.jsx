import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';

function BaseLayout({ children }) {
  return (
    <Flex gap="4">
      <Box>
        <Sidebar />
      </Box>
      <Box width="100%" p="2" bg="purple.50" rounded="md">{children}</Box>
    </Flex>
  );
}

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BaseLayout;
