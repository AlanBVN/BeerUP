import {
  Badge,
  Box,
  Button,
  Image,
  Text,
  VStack,
  HStack,
  Icon,
  useToast,
  Center,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardImage from "../assets/bgcard2.jpg";
import { MdLocationPin } from "react-icons/md";
import { IoMdBeer } from "react-icons/io";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { BiTime } from "react-icons/bi";
import useAuth from "../hooks/useAuth";
import { confirmAttendance } from "../services/meetupServices";

export const Card = ({ meetup }) => {
  const toast = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [state, setState] = useState("pending");

  useEffect(() => {}, []);

  const handleConfirm = async (e) => {
    e.preventDefault();
    toast({
      title: "Asistencia confirmada!",
      description: "Me alegra que vengas a la reunión, nos vemos allá! 🥳 ",
      status: "success",
      duration: 6000,
      isClosable: true,
    });
    setState("confirm");
    await confirmAttendance(meetup._id, { userId: user._id });
    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 2000);
  };

  return (
    <>
      <Link to={`/details/${meetup._id}`}>
        <Box h="500px" w="100%" position="relative">
          <Center>
            <Image
              src={CardImage}
              backgroundPosition="center"
              objectFit="cover"
              boxShadow="xl"
              w="315px"
              h="130px"
              rounded="4px"
            />
          </Center>
          <VStack h="280px">
            <Box
              rounded="3px"
              mt="-35px"
              w="305px"
              bg="gray.900"
              p="10px"
              shadow="xl"
            >
              <HStack>
                {meetup.status === "INCOMING" ? (
                  <Badge
                    w="full"
                    py="4px"
                    px="6px"
                    bg="green.700"
                    border="2px"
                    borderColor="green.600"
                    variant="solid"
                  >
                    PROXIMAMENTE
                  </Badge>
                ) : meetup.status === "FINISHED" ? (
                  <Badge
                    w="full"
                    py="4px"
                    px="6px"
                    bg="gray.600"
                    border="2px"
                    borderColor="green.700"
                    variant="solid"
                  >
                    FINALIZADO
                  </Badge>
                ) : (
                  <Badge
                    w="full"
                    py="4px"
                    px="6px"
                    bg="red.700"
                    border="2px"
                    borderColor="green.700"
                    variant="solid"
                  >
                    CANCELLED
                  </Badge>
                )}
                <Badge
                  position="absolute"
                  top="7px"
                  right="2"
                  py="2px"
                  px="4px"
                  bg="yellow.600"
                  fontSize="14px"
                  fontWeight="600"
                  variant="solid"
                ></Badge>
              </HStack>
              <Text color="gray.400" mt="6px" fontSize="24px" fontWeight="500">
                {meetup.title}
              </Text>
              <VStack h="330px">
                <Text
                  mt="5px"
                  color="gray.300"
                  minHeight="110px"
                  fontSize="14px"
                  fontWeight="500"
                >
                  {meetup.description}
                </Text>
                {user.role === "ADMIN" ? (
                  <Box
                    mb="10px"
                    bg="blue.900"
                    border="2px"
                    borderColor="blue.400"
                    py="4px"
                    px="10px"
                    rounded="5px"
                    w="280px"
                  >
                    <HStack>
                      <Icon as={IoMdBeer} boxSize="20px" color="orange.500" />
                      <Text fontSize="13px" fontWeight="500" color="gray.200">
                        Tendrias que comprar{" "}
                        {meetup.beers * meetup.confirmed?.length} birras
                      </Text>
                    </HStack>
                  </Box>
                ) : null}
                <Box
                  mb="10px"
                  border="2px"
                  bg="gray.800"
                  borderColor="blue.900"
                  py="4px"
                  px="10px"
                  rounded="5px"
                  w="280px"
                >
                  <HStack>
                    <Icon
                      as={TiWeatherPartlySunny}
                      boxSize="20px"
                      color="orange.300"
                    />
                    <Text fontSize="13px" fontWeight="500" color="gray.200">
                      {meetup.temp}°C
                    </Text>
                  </HStack>
                </Box>
                <Box
                  mb="10px"
                  border="2px"
                  bg="gray.800"
                  borderColor="blue.900"
                  py="4px"
                  px="10px"
                  rounded="5px"
                  w="280px"
                >
                  <HStack>
                    <Icon as={BiTime} boxSize="20px" color="gray.200" />
                    <Text fontSize="13px" fontWeight="500" color="gray.200">
                      {meetup.hour}
                    </Text>
                  </HStack>
                </Box>
                <Box
                  mb="10px"
                  border="2px"
                  bg="gray.800"
                  borderColor="blue.900"
                  py="4px"
                  px="10px"
                  rounded="5px"
                  w="280px"
                >
                  <HStack>
                    <Icon as={MdLocationPin} boxSize="20px" color="gray.200" />
                    <Text fontSize="13px" fontWeight="500" color="gray.200">
                      {meetup.address}
                    </Text>
                  </HStack>
                </Box>

                {state === "pending" ? (
                  <HStack
                    py="10px"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Button
                      border="2px"
                      bg="gray.800"
                      borderColor="blue.900"
                      py="4px"
                      px="10px"
                      rounded="5px"
                      colorScheme="blue"
                      onClick={handleConfirm}
                      size="sm"
                    >
                      Confirmar asistencia
                    </Button>
                  </HStack>
                ) : (
                  <Box pt="10px" pb="10px">
                    <Text
                      fontWeight="700"
                      textTransform="uppercase"
                      fontSize="14px"
                      letterSpacing="0.3px"
                      color="gray.300"
                    >
                      Ya
                      {state === "confirm"
                        ? " confirmaste "
                        : state === "reject"
                        ? " rechazaste "
                        : null}
                      tu asistencia!
                    </Text>
                  </Box>
                )}
              </VStack>
            </Box>
          </VStack>
        </Box>
      </Link>
    </>
  );
};
