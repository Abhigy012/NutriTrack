const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET_KEY;

const generateToken = (_id) => {
  const token = jwt.sign({ _id }, secret, { expiresIn: "1d" });
  return token;
};

module.exports.generateToken = generateToken;
