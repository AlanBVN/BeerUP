import axios from "axios";
const apiUrl = process.env.REACT_API_URL;

export const createMeetup = async (meetupObj) => {
  try {
    const { data } = await axios.post(
      `http://localhost:5000/api/meetup/create`,
      meetupObj
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const getMeetups = async () => {
  try {
    const data = await axios.get(`http://localhost:5000/api/meetup/getAll`);
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const editMeetup = async (meetupId, meetupObj) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/meetup/${meetupId}`,
      meetupObj
    );
    return response;
  } catch (error) {
    return error.response.data.message;
  }
};

export const deleteMeetup = async (meetupId) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/meetup/${meetupId}`
    );
    return response;
  } catch (error) {
    return error.response.data.message;
  }
};

export const getSingleMeetup = async (meetupId) => {
  try {
    const { data } = await axios.get(
      `http://localhost:5000/api/meetup/${meetupId}`
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const confirmAttendance = async (meetupId, userId) => {
  try {
    const { data } = await axios.put(
      `http://localhost:5000/api/meetup/confirm/${meetupId}`,
      userId
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const rejectAttendance = async (meetupId, userId) => {
  try {
    const { data } = await axios.put(
      `http://localhost:5000/api/meetup/reject/${meetupId}`,
      userId
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const invitePeople = async (meetupId, userId) => {
  try {
    const { data } = await axios.put(
      `http://localhost:5000/api/meetup/invite/${meetupId}`,
      userId
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const sendNotifications = async (meetupId, userId) => {
  try {
    const { data } = await axios.put(
      `http://localhost:5000/api/meetup/send/${meetupId}`,
      userId
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const readNotifications = async (meetupId, userId) => {
  try {
    const { data } = await axios.put(
      `http://localhost:5000/api/meetup/read/${meetupId}`,
      userId
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const weatherApi = async () => {
  var options = {
    method: "GET",
    url: "https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily",
    params: { lat: "-34.6", lon: "-58.3" },
    headers: {
      "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
      "x-rapidapi-key": "44dd943582msh3c0bc3c871a8fa7p1d0319jsn31e11d122f66",
    },
  };

  try {
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
