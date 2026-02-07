export default function requestLogger(req, res, next) {
  console.log({
    METHOD: req.method,
    URL: req.url,
    DATA: new Date().toISOString(),
  });
  next();
}
