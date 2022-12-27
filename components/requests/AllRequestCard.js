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

const AllRequestCard = ({
  session,
  name,
  amount,
  file_no,
  phone_no,
  created_at,
  user_id,
}) => {
  const supabase = useSupabaseClient();
  const toast = useToast();
  const [declineLoading, setDeclineLoading] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);
  const router = useRouter();

  const decline = async () => {
    setDeclineLoading(true);
    try {
      let { error } = await supabase
        .from("profiles")
        .update([{ status: "declined", updated_at: new Date().toISOString() }])
        .eq("id", user_id);
      if (error) throw error;
      if (!error) {
        await supabase
          .from("loans")
          .update([
            { status: "declined", updated_at: new Date().toISOString() },
          ])
          .eq("user_id", user_id);

        toast({
          title: "Declined.",
          description: "You have successfully declined the loan request.",
          status: "warning",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.log("error -", error);
      alert("Error updating the data!");
    } finally {
      setDeclineLoading(false);
      router.reload();
    }
  };

  const approve = async () => {
    setApproveLoading(true);
    try {
      let { error } = await supabase
        .from("profiles")
        .update([
          { status: "active", amount, updated_at: new Date().toISOString() },
        ])
        .eq("id", user_id);
      if (error) throw error;
      if (!error) {
        await supabase
          .from("loans")
          .update([
            {
              status: "active",
              updated_at: new Date().toISOString(),
              approved_by: session.user.email,
            },
          ])
          .eq("user_id", user_id);

        toast({
          title: "Approved.",
          description: "You have successfully approved the loan request.",
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
      setApproveLoading(false);
      router.reload();
    }
  };

  return (
    <Box p='4' border='1px' borderColor='gray' rounded='md' shadow='md'>
      <VStack spacing='0' align='flex-start'>
        <Text>From: {name}</Text>
        <Text>Amount: ₦{amount}</Text>
        <Text>File No: {file_no}</Text>
        <Text>Phone No: {phone_no}</Text>
        <Text>
          Request date:
          {dayjs(created_at).format(" MMM D, YYYY h:mm A")}
        </Text>
        <Divider pt='4' />
      </VStack>
      <HStack pt='4' justify='end' align='center' spacing='20px'>
        <Button
          onClick={decline}
          isLoading={declineLoading}
          colorScheme='yellow'>
          Decline
        </Button>
        <Button
          onClick={approve}
          isLoading={approveLoading}
          variant='outline'
          color='green'
          borderColor='green'>
          Approve
        </Button>
      </HStack>
    </Box>
  );
};

export default AllRequestCard;
