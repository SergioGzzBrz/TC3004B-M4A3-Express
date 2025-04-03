import { sqlConnect, sql } from "../utils/sql.js";
import crypto, { hash } from "crypto";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  let isLogin = false;
  const pool = await sqlConnect();
  const data = await pool
    .request()
    .input("username", sql.VarChar, req.body.username)
    .query("SELECT * FROM users WHERE username = @username");

  const dbPassword = data.recordset[0]?.password;
  const salt = dbPassword.slice(0, 10);

  const pepper = process.env.PEPPER;
  const hashing = crypto.createHash("sha512");

  const hash =
    salt +
    hashing.update(salt + req.body.password + pepper).digest("base64url");

  isLogin = data.recordset[0]?.password === hash;
  if (isLogin) {
    const token = jwt.sign({ sub: data.recordset[0].id }, process.env.JWT, {
      expiresIn: "1h",
    });
    res
      .status(200)
      .json({ isLogin: isLogin, user: data.recordset[0], token: token });
  } else {
    res.status(400).json({ isLogin: isLogin, user: {} });
  }
};

export const register = async (req, res) => {
  const salt = crypto.randomBytes(24).toString().slice(0, 10);
  const pepper = process.env.PEPPER;

  const hashing = crypto.createHash("sha512");
  const hash =
    salt +
    hashing.update(salt + req.body.password + pepper).digest("base64url");

  const pool = await sqlConnect();
  const data = await pool
    .request()
    .input("name", sql.VarChar, req.body.name)
    .input("username", sql.VarChar, req.body.username)
    .input("password", sql.VarChar, hash)
    .query(
      "INSERT INTO users(name, username, password) VALUES (@name, @username, @password)"
    );

  res.status(200).json({ done: true });
};
