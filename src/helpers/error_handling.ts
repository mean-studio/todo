export const ErrorHandler = (err, req, res, next) => {
  return res.status(500).send(err);
}