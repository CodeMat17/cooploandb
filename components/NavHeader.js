import {Box, HStack, Text, VStack} from '@chakra-ui/react'
import MenuDrawer from './MenuDrawer';

const NavHeader = ({session}) => {
  return (
    <Box as='nav' bg='gray.800' color='white'>
      <HStack align='center' justify='space-between' p='4' maxW='5xl' mx='auto'>
        <VStack align='flex-start' spacing='0'>
          <HStack align='baseline'>
            <Text fontSize='2xl'>CoopLoan</Text> 
            <Text color='gray'>Admin</Text>
          </HStack>
         
          <Text color='gray'>Welcome { session.user.email}</Text>
        </VStack>       
      <MenuDrawer />
      </HStack>
    </Box>
  );
}

export default NavHeader