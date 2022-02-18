import {
  Container,
  Box,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  TabPanel,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { LoginView } from "./LoginView";
import { RegisterView } from "./RegisterView";

import UPlogo from "../assets/UP-logo2.png";

const AuthView = () => {
  return (
    <Box bg="gray.800" h="100vh">
      <Container maxW="xl" centerContent>
        <Box
          d="flex"
          justifyContent="center"
          p="12px"
          w="100%"
          mt="40px"
          mb="15px"
          borderRadius="3px"
          bg="gray.900"
          shadow="xl"
        >
          <Image src={UPlogo} w="250px" />
        </Box>
        <Box shadow="2xl" bg="gray.700" w="100%" p="16px" borderRadius="3px">
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
