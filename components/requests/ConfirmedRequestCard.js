import {
  Box,

  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";

const ConfirmedRequestCard = ({
  name,
  created_at,
  updated_at,
  approved_by,
}) => {
  return (
    <Box w='full'>
      <Text fontSize='lg'>{name}</Text>
      <Text color='gray' fontSize='sm'>
        Request date: {dayjs(created_at).format(" MMM D, YYYY h:mm A")}
      </Text>
      <Text color='gray' fontSize='sm'>
        Confirmation date:
        {dayjs(updated_at).format(" MMM D, YYYY h:mm A")}
      </Text>
      <Text color='gray' fontSize='sm'>Confirmed by: {approved_by}</Text>
    </Box>
  );
};

export default ConfirmedRequestCard;
