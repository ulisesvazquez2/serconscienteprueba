const { RecaptchaEnterpriseServiceClient } = require('@google-cloud/recaptcha-enterprise');

/**
 * Crea una evaluación para analizar el riesgo de una acción de la IU.
 *
 * @param {Object} params
 * @param {string} params.projectID El ID del proyecto de Google Cloud.
 * @param {string} params.recaptchaKey La clave reCAPTCHA asociada con el sitio o la aplicación.
 * @param {string} params.token El token generado obtenido del cliente.
 * @param {string} params.recaptchaAction El nombre de la acción que corresponde al token.
 */
async function createAssessment({
  projectID = "ser-consciente-1733197700552",  // Tu Project ID
  recaptchaKey = "6LduuYgqAAAAANwJGDKBDdmX4akZpKXFbXj0gwn-",  // Tu siteKey de reCAPTCHA
  token = "action-token",  // El token generado en el frontend
  recaptchaAction = "action-name",  // El nombre de la acción asociada al token
}) {
  const client = new RecaptchaEnterpriseServiceClient();
  const projectPath = client.projectPath(projectID);

  // Crea la solicitud de evaluación
  const request = {
    assessment: {
      event: {
        token: token,  // Token enviado desde el frontend
        siteKey: recaptchaKey,  // La clave del sitio
      },
    },
    parent: projectPath,
  };

  try {
    // Realiza la solicitud para crear la evaluación
    const [response] = await client.createAssessment(request);

    // Verifica si el token es válido
    if (!response.tokenProperties.valid) {
      console.error(`El token es inválido. Motivo: ${response.tokenProperties.invalidReason}`);
      return null;
    }

    // Verifica que la acción coincida con lo esperado
    if (response.tokenProperties.action !== recaptchaAction) {
      console.error("La acción del reCAPTCHA no coincide con la acción esperada.");
      return null;
    }

    // Obtén la puntuación de riesgo
    const riskScore = response.riskAnalysis.score;

    // Muestra la puntuación de riesgo y las razones
    console.log(`La puntuación de reCAPTCHA es: ${riskScore}`);
    if (response.riskAnalysis.reasons && response.riskAnalysis.reasons.length > 0) {
      console.log("Razones del riesgo:");
      response.riskAnalysis.reasons.forEach((reason) => {
        console.log(`- ${reason}`);
      });
    }

    // Devuelve la puntuación de riesgo
    return riskScore;

  } catch (error) {
    // Manejo de errores
    console.error('Error al crear la evaluación de reCAPTCHA:', error);
    return null;
  }
}

module.exports = { createAssessment };