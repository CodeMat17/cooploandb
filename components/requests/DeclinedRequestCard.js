import {
  Box,
  Button,
  Divider,
  HStack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useState } from "react";

const DeclinedRequestCard = ({
  name,
  amount,
  file_no,
  phone_no,
  created_at,
  updated_at,
  user_id,
}) => {
  const supabase = useSupabaseClient();
  const toast = useToast();
  const router = useRouter();
  const [clearLoading, setClearLoading] = useState(false);

  const clearCard = async () => {
    setClearLoading(true);
    try {
      let { error } = await supabase
        .from("profiles")
        .update([
          {
            status: "inactive",
            amount: "",
            updated_at: new Date().toISOString(),
          },
        ])
        .eq("id", user_id);
      if (error) throw error;
      if (!error) {
        let { error } = await supabase
          .from("loans")
          .delete()
          .eq("user_id", user_id);

        if (error) throw error;
        if (!error) {
          toast({
            title: "Cleared.",
            description: "You have successfully cleared a declined request.",
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
        }
      }
    } catch (error) {
      console.log("error -", error);
      alert("Error clearing the data!");
    } finally {
      setClearLoading(false);
      router.reload();
    }
  };

  return (
    <Box
      p='4'
      border='1px'
      borderColor='green.500'
      bg='yellow.200'
      color='black'
      rounded='md'
      shadow='lg'>
      <VStack spacing='0' align='flex-start'>
        <Text>From: {name}</Text>
        <Text>Amount: ₦{amount}</Text>
        <Text>File No: {file_no}</Text>
        <Text>Phone No: {phone_no}</Text>
        <Text>
          Request date:
          {dayjs(created_at).format(" MMM D, YYYY h:mm A")}
        </Text>
        <Text>
          Declined date:
          {dayjs(updated_at).format(" MMM D, YYYY h:mm A")}
        </Text>
        <Divider pt='4' />
      </VStack>
      <HStack pt='4' justify='end' align='center' spacing='20px'>
        <Button
          onClick={clearCard}
          isLoading={clearLoading}
          variant='outline'
          color='red.500'
          borderColor='red.500'>
          Clear
        </Button>
      </HStack>
    </Box>
  );
};

export default DeclinedRequestCard;
