
const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const FRONTEND_URL = process.env.ORIGIN;
const PRODUCTION_URL = process.env.PRODUCTION_URL;
const demoP ='http://localhost:54904';

module.exports = app => {
  app.set("trust proxy", 1);
  app.use(
    cors({
      origin: [FRONTEND_URL,PRODUCTION_URL,demoP],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    })
  );
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};
