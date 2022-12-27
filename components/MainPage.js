import {Box} from '@chakra-ui/react'
import NavHeader from './NavHeader'
import Requests from '../components/requests/Requests'


const MainPage = ({ session }) => {
   
  return (
    <Box>
      <NavHeader session={session} />
      <Requests session={session} />
    </Box>
  );
}

export default MainPage