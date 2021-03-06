import { Flex, HStack, SimpleGrid, Stack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { getSingleUser } from "../services/authServices";
import useAuth from "../hooks/useAuth";
import { Card } from "../components/Card";
import { getMeetups } from "../services/meetupServices";

export const HomeView = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState([]);
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    const realData = async () => {
      const res = await getSingleUser(user._id);
      setUserData(res);
    };

    realData();
  }, []);

  useEffect(() => {
    const getAllMetups = async () => {
      const { data } = await getMeetups();
      const resFiltered = data.filter((e) => e.status === "INCOMING");
      setMeetups(resFiltered);
    };
    getAllMetups();
  }, []);

  return (
    <>
      <HStack h="100vh" bg="gray.800" spacing={0}>
        <Flex h="full" bg="gray.900" w="full" maxW="130px" shadow="2xl">
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
          p="50px"
          h="full"
          flex={1}
          borderRightColor="gray.700"
          borderRightWidth={1}
          justifyContent="center"
        >
          <Stack>
            <SimpleGrid columns={4} gap="40px">
              {meetups?.map((meetup) => (
                <Card meetup={meetup} />
              ))}
            </SimpleGrid>
          </Stack>
        </Flex>
      </HStack>
    </>
  );
};
