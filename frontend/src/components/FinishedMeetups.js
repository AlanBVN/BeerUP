import { Box, Center, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { getSingleUser } from "../services/authServices";
import { getMeetups } from "../services/meetupServices";
import { Card } from "./Card";

export const FinishedMeetups = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState();
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
      const resFiltered = data.filter((e) => e.status === "FINISHED");
      setMeetups(resFiltered);
    };
    getAllMetups();
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
          color="blue.600"
          mb="15px"
        >
          Meetups finalizados
        </Text>
        <Stack>
          <SimpleGrid columns={2} gap="20px">
            {meetups ? (
              meetups?.map((m) => {
                return (
                  <Center>
                    <Box
                      onClick={() => window.location.reload()}
                      maxW="300px"
                      my="20px"
                      position="relative"
                    >
                      <Card meetup={m} />
                    </Box>
                  </Center>
                );
              })
            ) : (
              <Text> No hay meetups finalizados. </Text>
            )}
          </SimpleGrid>
        </Stack>
      </Box>
    </>
  );
};
