import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Textarea,
  Center,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getUsers } from "../services/authServices";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../utils/DatePicker.css";
import useAuth from "../hooks/useAuth";
import moment from "moment";
import {
  createMeetup,
  sendNotifications,
  weatherApi,
} from "../services/meetupServices";
import { useToast } from "@chakra-ui/react";

export const CreateMeetup = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDateToCreate, setSelectedDateToCreate] = useState(null);
  const [selectedPeople, setSelectedPeople] = useState(null);

  const [formData, setFormData] = useState({
    date: "",
    temp: "",
    beers: "",
    hour: "",
    description: "",
    address: "",
    title: "",
    invited: [],
    host: user._id,
  });

  const toast = useToast();

  const onDropdownChange = (value) => {
    setSelectedPeople(value);
    setFormData({
      ...formData,
      invited: value?.map((p) => p.value),
    });
  };

  const importUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleDate = (value) => {
    setSelectedDate(value);
    let dateToFormat = moment(value).format("DD-MM-YYYY").replaceAll("-", "/");
    setSelectedDateToCreate(dateToFormat);
  };

  // SELECT MULTIPLE USERS
  const userOptions = users?.map((u) => {
    return {
      label: u.name,
      value: u._id,
    };
  });

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      date: selectedDateToCreate,
    });
  };

  const getTemp = async () => {
    const weatherData = await weatherApi();

    const temp = weatherData.data?.find(
      (elem) => elem.valid_date === moment("27-02-2022").format("YYYY-MM-DD") //SelectedDateToCreate
    );

    let max_temp;
    let beersToBuy;

    if (temp?.max_temp) {
      max_temp = temp.max_temp;
      beersToBuy = temp.max_temp < 20 ? 0.75 : temp.max_temp > 24 ? 2 : 1;
    } else {
      beersToBuy = 2;
      max_temp = 25;
    }

    setFormData({ ...formData, temp: max_temp, beers: beersToBuy });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast({
      title: "Meetup creada!",
      description:
        "Tu reunión ya fue creada, ahora solo queda esperar el gran día! 🥳 ",
      status: "success",
      duration: 6000,
      isClosable: true,
    });
    const createdMeetup = await createMeetup(formData);

    const res = createdMeetup.invited.map(
      async (userId) =>
        await sendNotifications(createdMeetup._id, { userId: userId })
    );

    setFormData({
      date: "",
      hour: "",
      title: "",
      beers: "",
      temp: "",
      description: "",
      address: "",
      invited: [],
      host: user._id,
    });
    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 1200);
  };

  useEffect(() => {
    importUsers();
    getTemp();
  }, [formData.date]);

  return (
    <Flex justifyContent="center" alignItems="space-between">
      <Box w="450px" h="100%">
        <FormControl mb="5px">
          <FormLabel fontWeight="700" fontSize="15px" color="blue.200">
            Fecha:
          </FormLabel>
          <DatePicker
            selected={selectedDate}
            wrapperClassName="datePicker"
            onChange={(date) => handleDate(date)}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
          />
        </FormControl>
        <FormControl mb="5px">
          <FormLabel fontWeight="700" fontSize="15px" color="blue.200">
            Hora de inicio:
          </FormLabel>
          <Input
            borderColor="blue.500"
            border="2px"
            onChange={handleChange}
            name="hour"
            value={formData.hour}
            size="sm"
            rounded="5px"
            mb="12px"
            color="white"
            placeholder="21:30 - Utilizar formato de 24 horas."
          />
        </FormControl>
        <FormControl mb="5px">
          <FormLabel fontWeight="700" fontSize="15px" color="blue.200">
            Título de la reunión:
          </FormLabel>
          <Input
            borderColor="blue.500"
            border="2px"
            onChange={handleChange}
            name="title"
            value={formData.title}
            size="sm"
            rounded="5px"
            mb="12px"
            color="white"
          />
        </FormControl>
        <FormControl mb="5px">
          <FormLabel fontWeight="700" fontSize="15px" color="blue.200">
            Descripción:
          </FormLabel>
          <Textarea
            borderColor="blue.500"
            border="2px"
            onChange={handleChange}
            name="description"
            value={formData.description}
            size="sm"
            rounded="5px"
            mb="10px"
            color="white"
          />
        </FormControl>
        <FormControl mb="5px">
          <FormLabel fontWeight="700" fontSize="15px" color="blue.200">
            Ubicación:
          </FormLabel>
          <Input
            onChange={handleChange}
            name="address"
            value={formData.address}
            borderColor="blue.500"
            border="2px"
            size="sm"
            rounded="5px"
            mb="12px"
            color="white"
            placeholder="Escribe la dirección de la meetup"
          />
        </FormControl>
        <FormControl mb="5px">
          <FormLabel fontWeight="700" fontSize="15px" color="blue.200">
            ¿Quieres invitar gente?
          </FormLabel>
          <Box mb="12px">
            <Select
              options={userOptions}
              placeholder="Seleccione las personas..."
              onChange={onDropdownChange}
              isMulti
            ></Select>
          </Box>
        </FormControl>
        <Center>
          <Button mt="20px" w="100%" onClick={handleSubmit} colorScheme="blue">
            Crear meetup!
          </Button>
        </Center>
      </Box>
    </Flex>
  );
};
