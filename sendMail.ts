import { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Envoi de la réponse HTTP
    return res.status(200).send('Bonjour');
  // Récupération des informations du corps de la requête HTTP
  const { to, subject, message } = req.body;

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
    return res.status(200).json({ message: 'Message envoyé avec succès' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erreur lors de l\'envoi du message' });
  }
}
