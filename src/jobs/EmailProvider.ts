import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'seuemail@gmail.com',
    pass: 'sua_senha'
  }
});

export default transporter;