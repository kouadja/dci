const nodemailer = require('nodemailer');
require('dotenv').config();






const transporter = nodemailer.createTransport({
  service: 'gmail', // Utilisation du service Gmail
  auth: {
    user: process.env.EMAIL, // Votre adresse Gmail
    pass: process.env.EMAIL_PASSWORD // Votre mot de passe Gmail ou un mot de passe d'application
  }
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: to,
    subject: subject,
    text: text
  };
  

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email envoyé: ' + info.response);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email: ', error);
  }
};

// Exemple d'utilisation

module.exports={
    sendEmail:sendEmail
}