import jwt from 'jsonwebtoken'

export const createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

export const createSecretTokenForDoc = (id) => {
  return jwt.sign({ id }, process.env.DOCTOR_JWT_SECRET);
}

export const createSecretTokenForAdmin = (id) =>{
  return jwt.sign({ id }, process.env.ADMIN_JWT_SECRET);
}