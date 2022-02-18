import { Flex, HStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CardDetails } from "../components/CardDetails";
import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";
import { getSingleUser } from "../services/authServices";
import { getSingleMeetup } from "../services/meetupServices";

export const DetailsView = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [meetup, setMeetup] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const realData = async () => {
      const res = await getSingleUser(user._id);
      setUserData(res);
    };

    realData();
  }, []);

  useEffect(() => {
    const meetupData = async () => {
      const res = await getSingleMeetup(id);
      setMeetup(res);
    };
    meetupData();
  }, []);

  return (
    <>
      <>
        <HStack h="100vh" bg="gray.800" spacing={0}>
          <Flex
            zIndex="999"
            h="full"
            bg="gray.900"
            w="full"
            maxW="130px"
            shadow="2xl"
          >
            <Navbar user={user} userApi={userData} />
          </Flex>
          <Flex
            overflowY="scroll"
            css={{
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-track": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#3182CE",
                borderRadius: "24px",
              },
            }}
            w="full"
            h="full"
            flex={1}
            borderRightColor="gray.700"
            borderRightWidth={1}
            justifyContent="center"
          >
            <Flex justifyContent="space-between">
              <CardDetails meetup={meetup} />
            </Flex>
          </Flex>
        </HStack>
      </>
    </>
  );
};
