import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Text,
  Center,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { signUpUser } from "../services/authServices";
import { useNavigate } from "react-router";
import { useToast } from "@chakra-ui/react";

export const RegisterView = () => {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    image: "",
  });
  //
  const [formErrors, setFormErrors] = useState({});
  const [show, setShow] = useState(false);
  //
  //
  //
  const toast = useToast();
  const navigate = useNavigate();
  //

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    setFormErrors(validate(user));
  };

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
    if (!values.surname) {
      errors.surname = "Se requiere tu apellido";
    }
    if (!values.name) {
      errors.name = "Se requiere tu apellido";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signUpUser(user);

    if (typeof response === "string") {
      toast({
        title: "Tu cuenta no pudo ser creada.",
        description: `${response} 😒`,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Cuenta creada.",
        description:
          "Ya hemos creado tu cuenta. Te esperamos en las meetups! 👍",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
      setUser({
        name: "",
        surname: "",
        email: "",
        password: "",
        image: "",
      });
    }
  };

  return (
    <Flex justifyContent="center" alignItems="center">
      <Box rounded="5px" w="450px" h="100%" py="20px" px="20px">
        <FormControl mb="10px" isInvalid={formErrors.name}>
          <FormLabel fontWeight="700" fontSize="15px" color="blue.200">
            Nombre:
          </FormLabel>
          <Input
            onChange={handleChange}
            name="name"
            value={user.name}
            size="sm"
            rounded="5px"
            color="white"
            id="nombre"
            borderColor="blue.500"
            border="2px"
          />
          <FormErrorMessage fontSize="12px" fontWeight="600" color="red.400">
            {formErrors.name}
          </FormErrorMessage>
        </FormControl>
        <FormControl mb="10px" isInvalid={formErrors.surname}>
          <FormLabel fontWeight="700" fontSize="15px" color="blue.200">
            Apellido:
          </FormLabel>
          <Input
            onChange={handleChange}
            name="surname"
            value={user.surname}
            size="sm"
            rounded="5px"
            color="white"
            id="nombre"
            borderColor="blue.400"
            border="2px"
          />
          <FormErrorMessage fontSize="12px" fontWeight="600" color="red.400">
            {formErrors.surname}
          </FormErrorMessage>
        </FormControl>
        <FormControl mb="10px" isInvalid={formErrors.email}>
          <FormLabel fontWeight="700" fontSize="15x" color="blue.200">
            Email:
          </FormLabel>
          <Input
            onChange={handleChange}
            name="email"
            value={user.email}
            size="sm"
            rounded="5px"
            color="white"
            type="email"
            borderColor="blue.400"
            border="2px"
          />
          <FormErrorMessage fontSize="12px" fontWeight="600" color="red.400">
            {formErrors.email}
          </FormErrorMessage>
        </FormControl>
        <FormControl mb="10px">
          <FormLabel fontWeight="700" fontSize="15px" color="blue.200">
            Imagen de perfil (opcional):
          </FormLabel>
          <Input
            onChange={handleChange}
            name="image"
            value={user.image}
            placeholder="Ingrese un enlace de la imagen"
            color="white"
            id="image"
            size="sm"
            rounded="5px"
            borderColor="blue.400"
            border="2px"
          />
        </FormControl>
        <FormControl isInvalid={formErrors.password}>
          <FormLabel fontWeight="700" fontSize="15px" color="blue.200">
            Contraseña:
          </FormLabel>
          <InputGroup>
            <InputRightElement>
              <Text
                cursor="pointer"
                ml="-30px"
                mb="8px"
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
              onChange={handleChange}
              name="password"
              value={user.password}
              size="sm"
              rounded="5px"
              color="white"
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
              mt="40px"
              w="100%"
              onClick={handleSubmit}
              colorScheme="blue"
            >
              Registrarme
            </Button>
          ) : (
            <Button
              mt="40px"
              isDisabled
              w="100%"
              onClick={handleSubmit}
              colorScheme="blue"
            >
              Registrarme
            </Button>
          )}
        </Center>
      </Box>
    </Flex>
  );
};
