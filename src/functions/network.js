// Funciones para manejar las respuestas de la API.
const success = (req, res, status, message, response) => {
  res.status(status).json({
    status: status,
    message: message,
    ...(response && { response })
  });
}

// Función para manejar las respuestas de la API con cookies.
const successCookie = (req, res, status, message, response) => {

  if (req.cookies.authToken) {
    res.clearCookie('authToken');
  }

  //res.cookie('authToken', data.token, { path: '/', maxAge: 3600000, httpOnly: false, secure: false, sameSite: 'lax' });

  //res.cookie('user', data , { maxAge: 3600000, httpOnly: false, secure: false });

  res.status(status).json({
    status: status,
    message: message,
    ...(response && { response })
  });
}

// Función para manejar las respuestas de la API con errores.
const error = (req, res, status, message, response) => {
  res.status(status).json({
    status: status,
    message: message,
    ...(response && { response })
  });
}

export default {
  success,
  successCookie,
  error
};
