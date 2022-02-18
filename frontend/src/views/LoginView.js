import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Center,
  InputGroup,
  InputRightElement,
  useToast,
  FormErrorMessage,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { loginUser } from "../services/authServices";
import { useNavigate } from "react-router";

export const LoginView = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const toast = useToast();

  const handleChange = (e) => {
    setFormErrors(validate(user));

    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = "Se requiere un Email";
    } else if (!regex.test(values.email)) {
      errors.email = "Ese no es un Email válido";
    }
    if (!values.password) {
      errors.password = "Se requiere una contraseña";
    } else if (values.password.length < 4) {
      errors.password = "La contraseña debe que tener mas de 4 caracteres";
    } else if (values.password.length > 10) {
      errors.password = "La contraseña debe tener menos de 10 caracteres";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser(user);

    if (typeof response === "string") {
      toast({
        title: "Error al iniciar sesión.",
        description: `${response} 😒 `,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Bienvenido!",
        description: `Te esperamos en las meetups! 🥳 `,
        status: "success",
        duration: 6000,
        isClosable: true,
      });

      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 2000);
    }
  };

  return (
    <VStack spacing={4} justifyContent="center" alignItems="center">
      <Box rounded="5px" w="450px" h="100%" py="20px" px="20px">
        <FormControl mb="20px" isInvalid={formErrors.email}>
          <FormLabel
            fontWeight="700"
            fontSize="15px"
            color="blue.200"
            htmlFor="email"
          >
            Dirección de email:
          </FormLabel>
          <Input
            size="sm"
            rounded="5px"
            name="email"
            value={user.email}
            onChange={handleChange}
            color="white"
            id="email"
            type="email"
            borderColor="blue.400"
            border="2px"
          />
          <FormErrorMessage fontSize="12px" fontWeight="600" color="red.400">
            {formErrors.email}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={formErrors.password}>
          <FormLabel fontWeight="700" fontSize="15px" color="blue.200">
            Contraseña:
          </FormLabel>
          <InputGroup>
            <InputRightElement>
              <Text
                cursor="pointer"
                mb="8px"
                ml="-30px"
                bg="none"
                onClick={() => setShow(!show)}
                fontSize="12px"
                color="white"
                fontWeight="600"
              >
                {show ? "Ocultar" : "Mostrar"}
              </Text>
            </InputRightElement>
            <Input
              size="sm"
              rounded="5px"
              name="password"
              value={user.password}
              onChange={handleChange}
              color="white"
              id="password"
              borderColor="blue.400"
              border="2px"
              type={show ? "text" : "password"}
            />
          </InputGroup>
          <FormErrorMessage fontSize="12px" fontWeight="600" color="red.400">
            {formErrors.password}
          </FormErrorMessage>
        </FormControl>
        <Center>
          {Object.keys(formErrors).length === 0 ? (
            <Button
              w="100%"
              alignContent="center"
              onClick={handleSubmit}
              mt="40px"
              colorScheme="blue"
            >
              Ingresar
            </Button>
          ) : (
            <Button
              isDisabled
              w="100%"
              alignContent="center"
              onClick={handleSubmit}
              mt="40px"
              colorScheme="blue"
            >
              Ingresar
            </Button>
          )}
        </Center>
      </Box>
    </VStack>
  );
};
