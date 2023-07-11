const Deadline = require("../models/Deadline");

const getDeadline = (req, res) => {
  const userId = req.user.id;
  Deadline.findOne({ userId })
    .then((doc) => res.status(200).json(doc))
    .catch((error) => res.status(400).json(error));
};

const postDeadline = async (req, res) => {
  const { date, event } = req.body;
  const userId = req.user.id;
  const oldData = await Deadline.findOne({ userId });
  if (oldData) {
    let isPresent = false;
    oldData.data.map((item) => {
      if (item.date === date) {
        item.events = [...item.events, event];
        isPresent = true;
      }
    });
    if (!isPresent) {
      oldData.data = [...oldData.data, { date, events: [event] }];
    }
    oldData
      .save()
      .then((doc) => res.status(200).json(doc))
      .catch((error) => res.status(400).json(error));
  } else {
    Deadline.create({
      userId,
      data: [{ date, events: [event] }],
    })
      .then((doc) => res.status(200).json(doc))
      .catch((error) => res.status(400).json(error));
  }
};

const deleteDeadline = async (req, res) => {
  const { date, event } = req.params;
  const userId = req.user.id;
  const oldData = await Deadline.findOne({ userId });
  oldData.data.map((item) => {
    if (item.date === date) {
      const temp = item.events.filter((name) => {
        return name !== event;
      });
      item.events = temp;
    }
  });
  const temp = oldData.data.filter((item) => {
    return item.events.length != 0;
  });
  oldData.data = temp;
  oldData
    .save()
    .then((doc) => res.status(200).json(doc))
    .catch((error) => res.status(400).json(error));
};

module.exports = {
  getDeadline,
  postDeadline,
  deleteDeadline,
};
