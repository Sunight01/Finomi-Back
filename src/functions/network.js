const success = (req, res, status, message, data) => {
  res.status(status).json({
    status: status,
    message: message,
    ...(data && { data })
  });
}

const successCookie = (req, res, status, message, data) => {

  if (req.cookies.authToken) {
    res.clearCookie('authToken');
  }

  //res.cookie('authToken', data.token, { path: '/', maxAge: 3600000, httpOnly: false, secure: false, sameSite: 'lax' });

  //res.cookie('user', data , { maxAge: 3600000, httpOnly: false, secure: false });

  res.status(status).json({
    status: status,
    message: message,
    ...(data && { data })
  });
}

const error = (req, res, status, message, data) => {
  res.status(status).json({
    status: status,
    message: message,
    ...(data && { data })
  });
}

export default {
  success,
  successCookie,
  error
};
