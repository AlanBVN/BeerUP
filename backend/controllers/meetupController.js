const Meetup = require("../models/Meetup");
const User = require("../models/User");

exports.meetups = async (req, res) => {
  const allMeetups = await Meetup.find()
    .populate("invited", ["_id", "name", "surname", "image", "email"])
    .populate("confirmed", ["_id", "name", "surname", "image", "email"])
    .populate("rejected", ["_id", "name", "surname", "image", "email"])
    .populate("host", ["_id", "name", "surname", "image", "email"]);
  try {
    return res.status(200).json(allMeetups);
  } catch (error) {
    return res.status(500).json({ message: "Couldn't get all the meetups" });
  }
};

exports.createMeetup = async (req, res) => {
  const meetupToCreate = new Meetup(req.body);
  await meetupToCreate.save();

  try {
    return res.status(201).json(meetupToCreate);
  } catch (error) {
    return res.status(500).json({ message: "Couldn't create the meetup'" });
  }
};

exports.editMeetup = async (req, res) => {
  const { meetupId } = req.params;
  const meetupToUpdate = await Meetup.findByIdAndUpdate(meetupId, req.body, {
    new: true,
  })
    .populate("invited", ["_id", "name", "surname", "image", "email"])
    .populate("confirmed", ["_id", "name", "surname", "image", "email"])
    .populate("rejected", ["_id", "name", "surname", "image", "email"])
    .populate("host", ["_id", "name", "surname", "image", "email"]);

  try {
    return res.status(202).json(meetupToUpdate);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Hubo un error modificando la meetup." });
  }
};

exports.meetupById = async (req, res) => {
  const { meetupId } = req.params;
  const singleMeetup = await Meetup.findById(meetupId)
    .populate("invited", ["_id", "name", "surname", "image", "email"])
    .populate("confirmed", ["_id", "name", "surname", "image", "email"])
    .populate("rejected", ["_id", "name", "surname", "image", "email"])
    .populate("host", ["_id", "name", "surname", "image", "email"]);
  try {
    return res.status(200).json(singleMeetup);
  } catch (error) {
    return res.status(500).json({ message: "Esa meetup no existe." });
  }
};

exports.deleteMeetup = async (req, res) => {
  const { meetupId } = req.params;
  await Meetup.findByIdAndDelete(meetupId);

  try {
    return res.status(203).json({ message: "Meetup eliminada exitosamente." });
  } catch (error) {
    return res.status(500).json({ message: "Esa meetup no existe." });
  }
};

exports.confirmAttendance = async (req, res) => {
  const { meetupId } = req.params;
  const { userId } = req.body;

  const meetupToUpdate = await Meetup.findByIdAndUpdate(
    meetupId,
    {
      $push: { confirmed: userId },
      $pull: { rejected: userId, invited: userId },
    },
    {
      new: true,
    }
  );

  const userToUpdate = await User.findByIdAndUpdate(userId, {
    $push: { meetups: meetupId },
  });

  try {
    return res.status(200).json(meetupToUpdate);
  } catch (error) {
    return res.status(500).json({ message: "Esa meetup no existe." });
  }
};

exports.rejectAttendance = async (req, res) => {
  const { meetupId } = req.params;
  const { userId } = req.body;

  const meetupToUpdate = await Meetup.findByIdAndUpdate(
    meetupId,
    {
      $push: { rejected: userId },
      $pull: { invited: userId, confirmed: userId },
    },
    {
      new: true,
    }
  );

  const userToUpdate = await User.findByIdAndUpdate(userId, {
    $pull: { meetups: meetupId },
  });

  try {
    return res.status(200).json(meetupToUpdate);
  } catch (error) {
    return res.status(500).json({ message: "Esa meetup no existe." });
  }
};

exports.invitePeople = async (req, res) => {
  const { meetupId } = req.params;
  const { userId } = req.body;

  const meetupToUpdate = await Meetup.findByIdAndUpdate(
    meetupId,
    { $push: { invited: userId } },
    {
      new: true,
    }
  );
  try {
    return res.status(200).json(meetupToUpdate);
  } catch (error) {
    return res.status(500).json({ message: "Esa meetup no existe." });
  }
};

exports.userNotifications = async (req, res) => {
  const { meetupId } = req.params;
  const { userId } = req.body;

  const userToUpdate = await User.findByIdAndUpdate(
    userId,
    {
      $push: { notifications: meetupId },
    },
    {
      new: true,
    }
  )
    .populate("notifications", ["_id", "host", "title"])
    .populate("meetups");

  try {
    return res.status(200).json(userToUpdate);
  } catch (error) {
    return res.status(500).json({ message: "Esa meetup no existe." });
  }
};

exports.readNotifications = async (req, res) => {
  const { meetupId } = req.params;
  const { userId } = req.body;

  const userToUpdate = await User.findByIdAndUpdate(
    userId,
    {
      $pull: { notifications: meetupId },
    },
    {
      new: true,
    }
  ).populate("notifications", ["_id", "host", "title"]);

  try {
    return res.status(200).json(userToUpdate);
  } catch (error) {
    return res.status(500).json({ message: "Esa meetup no existe." });
  }
};
