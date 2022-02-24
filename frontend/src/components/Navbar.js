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
import { MdLogout } from "react-icons/md";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { HiBell } from "react-icons/hi";
import { AiFillPlusCircle } from "react-icons/ai";
import { CreateMeetup } from "../views/CreateMeetup";
import { Notifications } from "./Notifications";
import { logOut } from "../services/authServices";
import upLogo from "../assets/UP-logo2.png";
import { Link } from "react-router-dom";
import { MyMeetups } from "./MyMeetups";
import { FinishedMeetups } from "./FinishedMeetups";

const Navbar = ({ user, userApi }) => {
  // Crear meetup
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Notifaciones
  const {
    isOpen: isOpenReportModal,
    onOpen: onOpenReportModal,
    onClose: onCloseReportModal,
  } = useDisclosure();

  // Mis Meetups
  const {
    isOpen: isOpenMyMeetupsModal,
    onOpen: onOpenMyMeetupsModal,
    onClose: onCloseMyMeetupsModal,
  } = useDisclosure();

  // Meetups finalizados

  const {
    isOpen: isOpenFinishedMeetupsModal,
    onOpen: onOpenFinishedMeetupsModal,
    onClose: onCloseFinishedMeetupsModal,
  } = useDisclosure();

  return (
    <>
      <VStack p={4} justifyContent="space-between" alignItems="center" w="full">
        <VStack>
          <Link to="/">
            <Image _hover={{ opacity: 0.8 }} src={upLogo} />
          </Link>
          <Image
            rounded="full"
            w="60px"
            border="2px"
            borderColor="blue.400"
            src={
              user.image ||
              "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
            }
          />
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

          <IconButton
            onClick={onOpenMyMeetupsModal}
            w="45px"
            h="45px"
            color="blue.400"
            bg="gray.800"
            icon={<FaBeer size="22px" />}
            aria-label="Meetups"
            _hover={{ color: "gray.500" }}
          />
          <Modal isOpen={isOpenMyMeetupsModal} onClose={onCloseMyMeetupsModal}>
            <ModalOverlay />
            <ModalContent
              h="650"
              py="20px"
              bg="gray.800"
              rounded="4px"
              minW="750px"
            >
              <ModalCloseButton color="white" backgroundColor="gray.700" />
              <ModalBody>
                <MyMeetups />
              </ModalBody>
            </ModalContent>
          </Modal>
          <IconButton
            onClick={onOpenFinishedMeetupsModal}
            w="45px"
            h="45px"
            color="blue.400"
            bg="gray.800"
            icon={<BsFillCalendarCheckFill size="22px" />}
            aria-label="Meetups finalizados"
            _hover={{ color: "gray.500" }}
          />
          <Modal
            isOpen={isOpenFinishedMeetupsModal}
            onClose={onCloseFinishedMeetupsModal}
          >
            <ModalOverlay />
            <ModalContent
              h="650"
              py="20px"
              bg="gray.800"
              rounded="4px"
              minW="750px"
            >
              <ModalCloseButton color="white" backgroundColor="gray.700" />
              <ModalBody>
                <FinishedMeetups />
              </ModalBody>
            </ModalContent>
          </Modal>
        </VStack>
        <VStack>
          {userApi?.role === "ADMIN" ? (
            <>
              <Button
                leftIcon={<AiFillPlusCircle />}
                w="100px"
                mb="15px"
                color="gray.700"
                fontSize="15px"
                fontWeight="800"
                colorScheme="yellow"
                onClick={onOpen}
                rounded="3px"
              >
                Meetup
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
