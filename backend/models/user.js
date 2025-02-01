//backend/models/user.js
const sql = require("mssql");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

// Fungsi untuk menghasilkan token JWT
const generateAuthToken = (userId) => {
  return jwt.sign({ _id: userId }, process.env.JWT_KEY, { expiresIn: "7d" });
};

// Fungsi untuk memvalidasi data login
const validateLogin = (data) => {
  const schema = Joi.object({
    Nrp: Joi.string().required().label("Nrp"),
    email: Joi.string().required().email().label("Email"),
  });
  return schema.validate(data);
};

// Fungsi login
const login = async (data) => {
  const { error } = validateLogin(data);
  if (error) throw new Error(error.details[0].message);

  const { Nrp, email } = data;

  try {
    const result =
      await sql.query`SELECT * FROM Users WHERE Nrp = ${Nrp} AND email = ${email}`;
    const user = result.recordset[0];

    if (!user) throw new Error("User  not found");

    const token = generateAuthToken(user.Id);
    return { token, user };
  } catch (error) {
    console.error("Error during login:", error.message);
    throw error;
  }
};

// Ekspor fungsi
module.exports = {
  login,
  validateLogin,
  generateAuthToken,
};
