import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { BsWhatsapp } from "react-icons/bs";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdCall } from "react-icons/md";
import { RiMailSendFill } from "react-icons/ri";

const MenuDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const supabase = useSupabaseClient();

  return (
    <Box>
      <IconButton
        onClick={onOpen}
        size='lg'
        isRound
        bg='gray.700'
        color='white'
        icon={<HiMenuAlt3 size={32} />}
      />

      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>CoopLoan Admin</DrawerHeader>

          <DrawerBody pt='8' pb='16'>

          </DrawerBody>

          <DrawerFooter justifyContent='start'>
            <Button w='full' mb='4' onClick={() => supabase.auth.signOut()}>
              Sign Out
            </Button>
            {/* <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default MenuDrawer;
