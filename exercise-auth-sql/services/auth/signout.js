const { cookies } = require('../../helpers')

module.exports = _ => async (req, res, next) => {
  cookies.clearCookie(res);
  res.status(200).json({
    success: true,
  });
};