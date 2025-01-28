const express = require('express');
const axios = require('axios');
const nodemailer = require('nodemailer');
const router = express.Router();

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Ruta para enviar correos
router.post('/', async (req, res) => {
  const { name, email, message, recaptchaToken } = req.body;

  // // Verificar reCAPTCHA con la API de Google
  // const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  // try {
  //     const response = await axios.post(
  //         `https://www.google.com/recaptcha/api/siteverify`,
  //         null,
  //         {
  //             params: {
  //                 secret: secretKey,
  //                 response: recaptchaToken,
  //             },
  //         }
  //     );

  // if (!response.data.success) {
  //     return res.status(400).send('Falló la validación de reCAPTCHA');
  // }

  // Crear un contenido HTML para el correo
  const mailOptions = {
    from: email,
    to: process.env.MAIL_USER,
    subject: `Nuevo mensaje de contacto de ${name}`,
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">
          <table style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <thead>
              <tr>
                <th colspan="2" style="padding: 10px; background-color: #4CAF50; color: white; text-align: center; font-size: 24px; border-radius: 8px;">
                  Nuevo mensaje de contacto
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 10px; font-weight: bold; color: #333;">Nombre:</td>
                <td style="padding: 10px; color: #555;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; color: #333;">Email:</td>
                <td style="padding: 10px; color: #555;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; color: #333;">Mensaje:</td>
                <td style="padding: 10px; color: #555; font-style: italic;">${message}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="padding: 10px; text-align: center; background-color: #f4f4f4; font-size: 14px; color: #888;">
                  Este es un mensaje enviado por ${name} desde el formulario de contacto.
                </td>
              </tr>
            </tfoot>
          </table>
        </body>
      </html>`,
  };

  // Enviar el correo
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error al enviar el correo:', error);
      return res.status(500).send('Error al enviar el correo');
    }
    console.log('Correo enviado: ' + info.response);
    res.status(200).send('Correo enviado exitosamente');
  });

  // } catch (error) {
  //     console.error('Error al verificar el reCAPTCHA:', error);
  //     return res.status(500).send('Error al verificar el reCAPTCHA');
  // }
});

module.exports = router;
