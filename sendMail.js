const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Récupération des informations du corps de la requête HTTP
  const { to, subject, message } = JSON.parse(event.body);

  // Configuration du transporteur de messagerie
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'votre_adresse_email@gmail.com',
      pass: 'votre_mot_de_passe'
    }
  });

  // Création de l'objet de messagerie
  const mailOptions = {
    from: 'votre_adresse_email@gmail.com',
    to,
    subject,
    text: message
  };

  try {
    // Envoi du message
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message envoyé avec succès' })
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
