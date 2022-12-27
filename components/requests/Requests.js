import {
  Box,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import AllRequestCard from "../requests/AllRequestCard";
import ApprovedRequestCard from "./ApprovedRequestCard";
import DeclinedRequestCard from "./DeclinedRequestCard";

const Requests = ({ session }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [role, setRole] = useState(null);
  const [allRequests, setAllRequests] = useState("");
  const [approvedRequests, setApprovedRequests] = useState("");
  const [declinedRequests, setDeclinedRequests] = useState("");

  useEffect(() => {
    getProfile();
  }, [session]);

  useEffect(() => {
    getAllRequest();
  }, []);

  useEffect(() => {
    getApprovedRequest();
  }, []);

  useEffect(() => {
    getDeclinedRequest();
  }, []);

  async function getProfile() {
    try {
      let { data, error, status } = await supabase
        .from("profiles")
        .select(`role`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setRole(data.role);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
    }
  }

  const getAllRequest = async () => {
    let { data, error } = await supabase
      .from("loans")
      .select("*")
      .eq("status", "processing")
      .order("id", { ascending: false });

    if (data) {
      setAllRequests(data);
    }
  };

  const getApprovedRequest = async () => {
    let { data, error } = await supabase
      .from("loans")
      .select("*")
      .eq("status", "active");

    if (data) {
      setApprovedRequests(data);
    }
  };

  const getDeclinedRequest = async () => {
    let { data, error } = await supabase
      .from("loans")
      .select("*")
      .eq("status", "declined");

    if (data) {
      setDeclinedRequests(data);
    }
  };

  return (
    <Box px='6' py='8' maxW='6xl' mx='auto'>
      {role === "coopAdmin" ? (
        <Box>
          <Text
            textAlign='center'
            fontSize={["xl", "xl", "2xl"]}
            fontWeight='semibold'>
            LOAN REQUESTS
          </Text>
          <Box py='6'>
            <Tabs variant='enclosed'>
              <TabList>
                <Tab fontSize='lg'>Requests</Tab>
                <Tab fontSize='lg'>Approved</Tab>
                <Tab fontSize='lg'>Declined</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <SimpleGrid
                    py='6'
                    columns={["1", "1", "2", "3"]}
                    spacing='30px'>
                    {allRequests && allRequests.length <= 0 && (
                      <Text textAlign='center'>No request at the moment.</Text>
                    )}
                    {allRequests &&
                      allRequests.length >= 1 &&
                      allRequests.map((request) => (
                        <AllRequestCard session={session} key={request.id} {...request} />
                      ))}
                  </SimpleGrid>
                </TabPanel>
                <TabPanel>
                  <SimpleGrid
                    py='6'
                    columns={["1", "1", "2", "3"]}
                    spacing='30px'>
                    {approvedRequests && approvedRequests.length <= 0 && (
                      <Text textAlign='center'>
                        No approved loan at the moment.
                      </Text>
                    )}
                    {approvedRequests &&
                      approvedRequests.length >= 1 &&
                      approvedRequests.map((request) => (
                        <ApprovedRequestCard
                          session={session}
                          key={request.id}
                          {...request}
                        />
                      ))}
                  </SimpleGrid>
                </TabPanel>
                <TabPanel>
                  <SimpleGrid
                    py='6'
                    columns={["1", "1", "2", "3"]}
                    spacing='30px'>
                    {declinedRequests && declinedRequests.length <= 0 && (
                      <Text textAlign='center'>
                        No declined loan at the moment.
                      </Text>
                    )}
                    {declinedRequests &&
                      declinedRequests.length >= 1 &&
                      declinedRequests.map((request) => (
                        <DeclinedRequestCard key={request.id} {...request} />
                      ))}
                  </SimpleGrid>
                </TabPanel>
                
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      ) : (
        <Box py='20'>
          <Text fontSize='2xl' textAlign='center'>
            You are not an Admin. Make sure you signed in with your
            administrative email. Bye!
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default Requests;
