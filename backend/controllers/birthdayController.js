const Birthday = require("../models/Birthday");

const getBirthday = (req, res) => {
  const userId = req.user.id;
  Birthday.findOne({ userId })
    .then((doc) => res.status(200).json(doc))
    .catch((error) => res.status(400).json(error));
};

const postBirthday = async (req, res) => {
  const { person, date } = req.body;
  const userId = req.user.id;
  const oldData = await Birthday.findOne({ userId });
  if (oldData) {
    let isPresent = false;
    oldData.data.map((item) => {
      if (item.date === date) {
        item.persons = [...item.persons, person];
        isPresent = true;
      }
    });
    if (!isPresent) {
      oldData.data = [...oldData.data, { date, persons: [person] }];
    }
    oldData
      .save()
      .then((doc) => res.status(200).json(doc))
      .catch((error) => res.status(400).json(error));
  } else {
    Birthday.create({
      userId,
      data: [{ date, persons: [person] }],
    })
      .then((doc) => res.status(200).json(doc))
      .catch((error) => res.status(400).json(error));
  }
};

const deleteBirthday = async (req, res) => {
  const { date, person } = req.params;
  const userId = req.user.id;
  const oldData = await Birthday.findOne({ userId });
  oldData.data.map((item) => {
    if (
      item.date.split("-")[0] === date.split("-")[0] &&
      item.date.split("-")[1] === date.split("-")[1]
    ) {
      const temp = item.persons.filter((name) => {
        return name !== person;
      });
      item.persons = temp;
    }
  });
  const temp = oldData.data.filter((item) => {
    return item.persons.length != 0;
  });
  oldData.data = temp;
  oldData
    .save()
    .then((doc) => res.status(200).json(doc))
    .catch((error) => res.status(400).json(error));
};

module.exports = { getBirthday, postBirthday, deleteBirthday };
