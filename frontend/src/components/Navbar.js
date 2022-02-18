import {
  VStack,
  Tooltip,
  IconButton,
  Image,
  Box,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import React from "react";
import { FaBeer } from "react-icons/fa";
import { MdMail, MdLogout } from "react-icons/md";
import { HiBell } from "react-icons/hi";
import { CreateMeetup } from "../views/CreateMeetup";
import { Notifications } from "./Notifications";
import { logOut } from "../services/authServices";
import upLogo from "../assets/UP-logo2.png";
import { Link } from "react-router-dom";

const Navbar = ({ user, userApi }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenReportModal,
    onOpen: onOpenReportModal,
    onClose: onCloseReportModal,
  } = useDisclosure();

  return (
    <>
      <VStack p={4} justifyContent="space-between" alignItems="center" w="full">
        <VStack>
          <Link to="/">
            <Image src={upLogo} />
          </Link>
          <Text
            fontSize="14px"
            textTransform="capitalize"
            color="blue.200"
            fontWeight="600"
          >
            {`hola ${user.name}!`}
          </Text>
          <Text> 👋 </Text>
        </VStack>
        <VStack position="relative" spacing={3}>
          <Image src={MdMail} mb={6} />

          <IconButton
            onClick={onOpenReportModal}
            w="45px"
            h="45px"
            color="blue.500"
            bg="gray.800"
            icon={<HiBell size="22px" />}
            aria-label="Notificaciones"
            _hover={{ color: "gray.500" }}
          />
          <Modal isOpen={isOpenReportModal} onClose={onCloseReportModal}>
            <ModalOverlay />
            <ModalContent h="500" py="20px" bg="gray.800" rounded="4px">
              <ModalCloseButton color="white" backgroundColor="gray.700" />
              <ModalBody>
                <Notifications />
              </ModalBody>
            </ModalContent>
          </Modal>
          {userApi && userApi.notifications?.length === 0 ? null : (
            <Box
              position="absolute"
              top="5"
              right="-2"
              w="20px"
              h="20px"
              backgroundColor="red"
              color="white"
              rounded="full"
            >
              <Text fontSize="13" fontWeight="800" textAlign="center">
                {userApi.notifications?.length}
              </Text>
            </Box>
          )}
          <Tooltip
            label="Mis Meetups"
            placement="right"
            rounded="md"
            backgroundColor="blue.500"
            color="white"
            fontWeight="600"
          >
            <IconButton
              w="45px"
              h="45px"
              color="blue.400"
              bg="gray.800"
              // onClick={handleClickMyMeetups}
              icon={<FaBeer size="22px" />}
              aria-label="Meetups"
              _hover={{ color: "gray.500" }}
            />
          </Tooltip>
        </VStack>
        <VStack>
          {userApi?.role === "ADMIN" ? (
            <>
              <Button
                w="100px"
                mb="15px"
                color="gray.700"
                fontSize="14px"
                fontWeight="700"
                colorScheme="yellow"
                onClick={onOpen}
                rounded="3px"
              >
                Crear Meetup
              </Button>
              <Modal
                motionPreset="slideInBottom"
                isOpen={isOpen}
                onClose={onClose}
              >
                <ModalOverlay />
                <ModalContent h="680" py="20px" bg="gray.800" rounded="4px">
                  <ModalCloseButton color="white" backgroundColor="gray.700" />
                  <ModalBody>
                    <CreateMeetup />
                  </ModalBody>
                </ModalContent>
              </Modal>
            </>
          ) : null}

          <Tooltip
            label="Cerrar sesión"
            placement="right"
            rounded="md"
            backgroundColor="blue.500"
            color="white"
            fontWeight="600"
          >
            <IconButton
              onClick={logOut}
              w="45px"
              h="45px"
              color="blue.400"
              bg="gray.800"
              icon={<MdLogout size="22px" />}
              aria-label="Cerrar sesión"
              _hover={{ color: "gray.500" }}
            />
          </Tooltip>
        </VStack>
      </VStack>
    </>
  );
};

export default Navbar;
