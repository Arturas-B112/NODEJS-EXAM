const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
require("dotenv").config();
const { authenticate } = require("./middleware");

const server = express();
server.use(express.json());
server.use(cors());

const mysqlConfig = {
  host: "localhost",
  user: "root",
  password: process.env.DB_PASS,
  database: "mydb",
};

const userSchema = Joi.object({
  full_name: Joi.string().trim().required(),
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().required(),
});

const userLoginSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().required(),
});

const dbPool = mysql.createPool(mysqlConfig).promise();

server.post("/register", async (req, res) => {
  let payload = req.body;

  try {
    payload = await userSchema.validateAsync(payload);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "All fields are required!" });
  }

  try {
    const encryptedPassword = await bcrypt.hash(payload.password, 10);
    const [response] = await dbPool.execute(
      `
    INSERT INTO mydb.users (full_name, email, password)
    VALUES (?, ?, ?)
    `,
      [payload.full_name, payload.email, encryptedPassword]
    );
    const token = jwt.sign(
      {
        name: payload.name,
        email: payload.email,
        id: response.insertId,
      },
      process.env.JWT_SECRET
    );
    res.status(201).send({ token });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

server.post("/login", async (req, res) => {
  let payload = req.body;

  try {
    payload = await userLoginSchema.validateAsync(payload);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "All fields are required!" });
  }

  try {
    const [data] = await dbPool.execute(
      `
    SELECT * FROM mydb.users
    WHERE email = ?
    `,
      [payload.email]
    );

    if (!data.length) {
      return res
        .status(400)
        .send({ error: "Email or password did not match!" });
    }

    const isPasswordMatching = await bcrypt.compare(
      payload.password,
      data[0].password
    );

    if (isPasswordMatching) {
      const token = jwt.sign(
        {
          user_id: data[0].id,
        },
        process.env.JWT_SECRET
      );
      return res.status(200).send({ token });
    }

    return res.status(400).send({ error: "Email or password did not match!" });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

server.post("/groups", authenticate, async (req, res) => {
  try {
    const payload = req.body;

    const response = await dbPool.execute(
      `
      INSERT INTO mydb.groups (name)
      VALUES(?)
    `,
      [payload.name]
    );

    res.status(201).send({ Message: "Cool, group is created!" });
  } catch (error) {
    res.status(500).end();
  }
});

server.get("/groups", authenticate, async (req, res) => {
  try {
    const [response] = await dbPool.execute(`
  SELECT * FROM mydb.groups
`);
    res.json(response);
  } catch (error) {
    res.status(500).end();
  }
});

server.post("/accounts", authenticate, async (req, res) => {
  try {
    const payload = req.body;

    const response = await dbPool.execute(
      `
      INSERT INTO mydb.accounts (group_id, user_id)
      VALUES (?, ?)
    `,
      [payload.group_id, req.user.user_id]
    );

    res.status(201).send({ Message: "Hooray, acc created!" });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

server.get("/accounts", authenticate, async (req, res) => {
  try {
    const [response] = await dbPool.execute(
      `
    SELECT groups.id, name FROM mydb.groups
    LEFT JOIN mydb.accounts ON groups.id = group_id
    WHERE user_id = ?
    `,
      [req.user.user_id]
    );

    console.log(response);

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

server.get("/bills/:group_id", authenticate, async (req, res) => {
  try {
    const [response] = await dbPool.execute(
      ` SELECT * FROM mydb.bills WHERE group_id = ? `,
      [req.params.group_id]
    );

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

server.post("/bills", authenticate, async (req, res) => {
  try {
    const payload = req.body;

    const response = await dbPool.execute(
      ` 
    INSERT INTO mydb.bills (group_id, amount, description)
    VALUES (?, ?, ?)
    `,
      [payload.group_id, payload.amount, payload.description]
    );

    res.status(201).send({ Message: "New bill created!" });
  } catch (error) {
    res.status(500).end();
  }
});

server.listen(process.env.PORT, () =>
  console.log(`Server is running on port: ${process.env.PORT}`)
);
