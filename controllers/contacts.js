const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const all = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((lists) => {
    res.status(200).json(lists);
  });
};

const one = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('contacts').find({ _id: userId });
  result.toArray().then((lists) => {
    res.status(200).json(lists[0]);
  });
};

module.exports = { all, one };