import nodemailer from 'nodemailer';
import { senderEmail, senderPassword } from '../config/keys';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: senderEmail,
    pass: senderPassword,
  },
});

export default transporter;
