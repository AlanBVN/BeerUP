const express = require("express");
const router = express.Router();

const {
  meetups,
  createMeetup,
  editMeetup,
  deleteMeetup,
  meetupById,
  confirmAttendance,
  rejectAttendance,
  invitePeople,
  userNotifications,
  readNotifications,
} = require("../controllers/meetupController");

//GET ALL THE MEETUPS
router.get("/getAll", meetups);

//CREATE A MEETUP
router.post("/create", createMeetup);

//REMOVE A MEETUP
router.delete("/:meetupId", deleteMeetup);

//EDIT A MEETUP
router.put("/:meetupId", editMeetup);

//SEND NOTIFICATION
router.put("/send/:meetupId", userNotifications);

//SEND NOTIFICATION
router.put("/read/:meetupId", readNotifications);

//CONFIRM A MEETUP
router.put("/confirm/:meetupId", confirmAttendance);

//REJECT A MEETUP
router.put("/reject/:meetupId", rejectAttendance);

//INVITE PEOPLE
router.put("/invite/:meetupId", invitePeople);

//GET SINGLE MEETUP BY ID
router.get("/:meetupId", meetupById);

module.exports = router;
