import {
  Box,
  Text,
  Icon,
  VStack,
  HStack,
  Flex,
  Center,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { MdEmail } from "react-icons/md";
import { readNotifications } from "../services/meetupServices";
import { getSingleUser } from "../services/authServices";
import { Link } from "react-router-dom";

export const Notifications = () => {
  const { user } = useAuth();

  const [userData, setUserData] = useState();

  const [info, setInfo] = useState({
    meetupId: "",
    userId: "",
  });

  useEffect(() => {
    const realData = async () => {
      const res = await getSingleUser(user._id);
      setUserData(res);
    };
    realData();
  }, []);

  useEffect(() => {}, [info]);

  return (
    <>
      <Box
        mt="25px"
        h="450px"
        maxH="450px"
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
        {userData && userData.notifications.length > 0 ? (
          userData.notifications?.map((noti) => {
            return (
              <>
                <Link to={`/details/${noti._id}`}>
                  <Flex
                    value={noti._id}
                    rounded="3px"
                    p="7px"
                    alignItems="center"
                    maxH="60px"
                    h="60px"
                    bg="gray.700"
                    border="2px"
                    borderColor="blue.700"
                    mb="10px"
                    cursor="pointer"
                    _hover={{ bg: "gray.600" }}
                    onClick={async (e) => {
                      setInfo({ ...info, meetupId: noti._id });
                      const response = await readNotifications(noti._id, {
                        userId: user._id,
                      });
                      setTimeout(() => {
                        window.location.reload();
                      }, 2000);
                    }}
                  >
                    <HStack>
                      <Icon ml="10px" mr="5px" as={MdEmail} w="30px" h="30px" />
                      <VStack spacing="-2px">
                        <Text isTruncated fontSize="15px" color="white">
                          Te han invitado a "{noti.title}"
                        </Text>
                        <Text fontSize="13px" color="white">
                          Haz click aquí para ver más info.
                        </Text>
                      </VStack>
                    </HStack>
                  </Flex>
                </Link>
              </>
            );
          })
        ) : (
          <Box>
            <Center>
              <Text color="gray.300" fontSize="24px" fontWeight="bold">
                No tenes notificaciones
              </Text>
            </Center>
          </Box>
        )}
      </Box>
    </>
  );
};
