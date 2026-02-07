const responseLogger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

      const headers = res.getHeaders();

    // فیلتر هدرهای rate limit
    const rateLimitHeaders = Object.fromEntries(
      Object.entries(headers).filter(([key]) =>
        key.toLowerCase().includes("rate")
      )
    );

    console.log({
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      headers: rateLimitHeaders,
    });
  });

  next();
};

export default responseLogger;
