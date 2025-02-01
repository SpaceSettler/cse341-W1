const { response } = require('express');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const all = async (req, res) => {
  const result = await mongodb.getDb().db('Wk1').collection('contacts').find();
  result.toArray().then((lists) => {
    res.status(200).json(lists);
  });
};

const one = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('Wk1').collection('contacts').find({ _id: userId });
  result.toArray().then((lists) => {
    res.status(200).json(lists[0]);
  });
};

const putThis = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('Wk1').collection('contacts').updateOne({ _id: userId }, { $set: req.body });
  if (result.error) {
    res.status(500).json(result.error);
  }
  else {
    res.status(204).json();
  };
};

const postThis = async (req, res) => {
  const request = await mongodb.getDb().db('Wk1').collection('contacts').insertOne(req.body);
  if (request.error) {
    res.status(500).json(request.error);
  }
  else {
    res.status(201).json(req.body);
  }
};

const deleteThis = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const request = await mongodb.getDb().db('Wk1').collection('contacts').deleteMany({ _id: userId });
  if (request.error || request.deletedCount === 0) {
    res.status(500).json(request.error);
  }
  else {
    res.status(200).json(request);
  }
};

module.exports = { all, one, putThis, postThis, deleteThis };