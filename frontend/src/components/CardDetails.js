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
  Avatar,
  Stack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import React, { useState } from "react";
import CardImage from "../assets/bgcard2.jpg";
import { MdLocationPin } from "react-icons/md";
import { IoMdBeer } from "react-icons/io";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { BiTime } from "react-icons/bi";
import useAuth from "../hooks/useAuth";
import { confirmAttendance, deleteMeetup } from "../services/meetupServices";

export const CardDetails = ({ meetup }) => {
  const toast = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [state, setState] = useState("pending");

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
      window.location.reload();
    }, 2000);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    toast({
      title: "Meetup Eliminada!",
      description: "La meetup ya ha sido eliminada de la página web.",
      status: "Error",
      duration: 6000,
      isClosable: true,
    });
    await deleteMeetup(meetup._id);
    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 2000);
  };

  return (
    <>
      <HStack spacing="30px">
        <Box mr="35px" h="500px" w="100%" position="relative">
          <Center>
            <Image
              src={CardImage}
              backgroundPosition="center"
              objectFit="cover"
              boxShadow="xl"
              w="415px"
              h="230px"
              rounded="4px"
            />
          </Center>
          <VStack h="280px">
            <Box
              rounded="3px"
              mt="-35px"
              w="415px"
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
              <VStack>
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
                    w="full"
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
                  w="full"
                >
                  <HStack>
                    <Icon
                      as={TiWeatherPartlySunny}
                      boxSize="20px"
                      color="orange.300"
                    />
                    <Text fontSize="13px" fontWeight="500" color="gray.200">
                      {meetup.temp}
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
                  w="full"
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
                  w="full"
                >
                  <HStack>
                    <Icon as={MdLocationPin} boxSize="20px" color="gray.200" />
                    <Text fontSize="13px" fontWeight="500" color="gray.200">
                      {meetup.address}
                    </Text>
                  </HStack>
                </Box>

                {user.role === "USER" ? (
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
                ) : null}
                {user.role === "ADMIN" ? (
                  <Box>
                    <Button
                      mt="15px"
                      border="2px"
                      bg="red.800"
                      borderColor="blue.900"
                      py="4px"
                      px="10px"
                      rounded="5px"
                      colorScheme="blue"
                      onClick={handleDelete}
                      size="sm"
                    >
                      Eliminar Meetup
                    </Button>
                  </Box>
                ) : null}
              </VStack>
            </Box>
          </VStack>
        </Box>
        <VStack>
          <VStack
            pr="30px"
            h="500px"
            maxH="500px"
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
            <Badge
              align="center"
              mb="15px"
              w="full"
              py="4px"
              px="6px"
              bg="gray.900"
              border="2px"
              borderColor="green.800"
              variant="solid"
            >
              Confirmados
            </Badge>
            {meetup.confirmed?.length >= 1 ? (
              meetup.confirmed?.map((confirmed) => {
                return (
                  <>
                    <Box
                      rounded="5px"
                      border="2px"
                      borderColor="blue.500"
                      py="8px"
                      px="15px"
                      minW="280px"
                      minH="70px"
                      bg="gray.800"
                    >
                      <Stack direction="row" alignItems="center">
                        <Avatar
                          src={
                            confirmed.name.image
                              ? confirmed.name.image
                              : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                          }
                        />
                        <Text fontSize="15px" fontWeight="700" color="gray.300">
                          {confirmed.name}
                        </Text>
                      </Stack>
                    </Box>
                  </>
                );
              })
            ) : (
              <Box
                rounded="5px"
                border="2px"
                borderColor="blue.500"
                py="8px"
                px="15px"
                minW="280px"
                minH="70px"
                bg="gray.800"
              >
                <Text
                  align="center"
                  fontSize="15px"
                  fontWeight="700"
                  color="gray.300"
                >
                  No hay confirmados aun.
                </Text>
              </Box>
            )}
          </VStack>
        </VStack>

        <VStack>
          <VStack
            pr="10px"
            h="500px"
            maxH="500px"
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
            <Badge
              align="center"
              mb="15px"
              w="full"
              py="4px"
              px="6px"
              bg="gray.900"
              border="2px"
              borderColor="orange.800"
              variant="solid"
            >
              Invitados
            </Badge>
            {meetup.invited?.length >= 1 ? (
              meetup.invited?.map((invited) => {
                return (
                  <>
                    <Box
                      rounded="5px"
                      border="2px"
                      borderColor="blue.500"
                      py="8px"
                      px="15px"
                      minW="280px"
                      minH="70px"
                      bg="gray.800"
                    >
                      <Stack direction="row" alignItems="center">
                        <Avatar
                          src={
                            invited.name.image
                              ? invited.name.image
                              : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                          }
                        />
                        <Text fontSize="15px" fontWeight="700" color="gray.300">
                          {invited.name}
                        </Text>
                      </Stack>
                    </Box>
                  </>
                );
              })
            ) : (
              <Box
                rounded="5px"
                border="2px"
                borderColor="blue.500"
                py="8px"
                px="15px"
                minW="280px"
                minH="70px"
                bg="gray.800"
              >
                <Text
                  align="center"
                  fontSize="15px"
                  fontWeight="700"
                  color="gray.300"
                >
                  No hay invitados
                </Text>
              </Box>
            )}
          </VStack>
        </VStack>
      </HStack>
    </>
  );
};
