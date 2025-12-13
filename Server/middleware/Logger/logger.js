export default function logger(req, res, next) {
  console.log(
    `METHOD: ${req.method} || URL: ${
      req.url
    } || DATA: ${new Date().toISOString()} `
  );
  next();
}
