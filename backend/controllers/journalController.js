const Journal = require("../models/Journal");

const getJournal = (req, res) => {
  const userId = req.user.id;
  Journal.findOne({ userId })
    .then((doc) => res.status(200).json(doc))
    .catch((error) => res.status(400).json(error));
};

const postJournal = async (req, res) => {
  const { message, date } = req.body;
  const userId = req.user.id;
  const oldData = await Journal.findOne({ userId });
  if (oldData) {
    let isPresent = false;
    oldData.data.map((item) => {
      if (item.date === date) {
        item.message = message;
        isPresent = true;
      }
    });
    if (!isPresent) {
      oldData.data = [...oldData.data, { date, message }];
    }
    oldData
      .save()
      .then((doc) => res.status(200).json(doc))
      .catch((error) => res.status(400).json(error));
  } else {
    Journal.create({
      userId,
      data: [{ date, message }],
    })
      .then((doc) => res.status(200).json(doc))
      .catch((error) => res.status(400).json(error));
  }
};

module.exports = { getJournal, postJournal };
