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
import { useState } from "react";

const ApprovedRequestCard = ({
  name,
  amount,
  file_no,
  phone_no,
  created_at,
  updated_at,
  user_id,
  approved_by,
}) => {
  const supabase = useSupabaseClient();
  const toast = useToast();
  const [repaidLoading, setRepaidLoading] = useState(false);

 

  const repayment = async () => {
    setRepaidLoading(true);
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
        await supabase
          .from("loans")
          .update([{ status: "repaid", updated_at: new Date().toISOString() }])
          .eq("user_id", user_id);

        toast({
          title: "Repaid.",
          description: "You have successfully confirmed loan repayment.",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.log("error -", error);
      alert("Error updating the data!");
    } finally {
      setRepaidLoading(false);
    }
  };

  return (
    <Box
      p='4'
      border='1px'
      borderColor='green.500'
      bg='green.100' color='black'
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
          Approved date:
          {dayjs(updated_at).format(" MMM D, YYYY h:mm A")}
        </Text>
        <Text>Approved by: {approved_by}</Text>
        <Divider pt='4' />
      </VStack>
      <HStack pt='4' justify='end' align='center' spacing='20px'>
      
        <Button
          onClick={repayment}
          isLoading={repaidLoading}
          variant='outline'
          color='red.500'
          borderColor='red.500'>
          Confirm Repayment
        </Button>
      </HStack>
    </Box>
  );
};

export default ApprovedRequestCard;
