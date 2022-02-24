import {
  Container,
  Box,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  TabPanel,
  Image,
  Text,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import { LoginView } from "./LoginView";
import { RegisterView } from "./RegisterView";

import UPlogo from "../assets/UP-logo2.png";

const AuthView = () => {
  return (
    <Box bg="gray.900" h="100vh">
      <Container maxW="xl" centerContent>
        <Image mt="20px" src={UPlogo} w="270px" />
        <Box mb="32px">
          <HStack justifyContent="center" align-items="center">
            <Text fontSize="32px" color="blue.500" fontWeight="bold">
              "
            </Text>
            <Text
              color="white"
              fontSize="23px"
              fontWeight="400"
              textTransform="full-width"
            >
              Donde nacen tus encuentros.
            </Text>
            <Text fontSize="32px" color="blue.500" fontWeight="bold">
              "
            </Text>
          </HStack>
        </Box>
        <Box shadow="2xl" bg="gray.800" w="100%" p="16px" rounded="6px">
          <Tabs variant="soft-rounded" colorScheme="gray">
            <TabList>
              <Tab
                fontSize="15px"
                fontWeight="700"
                color="gray.300"
                borderRadius="4px"
                w="50%"
              >
                Iniciar sesión
              </Tab>
              <Tab
                fontSize="15px"
                fontWeight="700"
                color="gray.300"
                borderRadius="4px"
                w="50%"
              >
                Regístrate
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <LoginView />
              </TabPanel>
              <TabPanel>
                <RegisterView />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </Box>
  );
};

export default AuthView;
