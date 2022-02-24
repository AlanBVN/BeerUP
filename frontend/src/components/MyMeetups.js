import { Box, Center, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { getSingleUser } from "../services/authServices";
import { Card } from "./Card";

export const MyMeetups = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState();

  useEffect(() => {
    const realData = async () => {
      const res = await getSingleUser(user._id);
      setUserData(res);
    };
    realData();
    console.log("ASDA", userData);
  }, []);

  return (
    <>
      <Box
        mt="25px"
        h="600px"
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
      >
        <Text
          textTransform="uppercase"
          fontSize="22px"
          fontWeight="bold"
          textAlign="center"
          color="blue.400"
          mb="15px"
        >
          Mis Meetups
        </Text>
        <Stack>
          <SimpleGrid columns={2} gap="20px">
            {userData ? (
              userData.meetups?.map((meetups) => {
                return (
                  <Center>
                    <Box
                      onClick={() => window.location.reload()}
                      maxW="300px"
                      my="20px"
                      position="relative"
                    >
                      <Card meetup={meetups} />
                    </Box>
                  </Center>
                );
              })
            ) : (
              <Text
                textTransform="uppercase"
                fontSize="26px"
                fontWeight="bold"
                textAlign="center"
                color="blue.500"
                mb="15px"
              >
                No asististe a ninguna meetup
              </Text>
            )}
          </SimpleGrid>
        </Stack>
      </Box>
    </>
  );
};
