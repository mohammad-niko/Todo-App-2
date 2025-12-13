export const validateParams = (schemaFn) => async (req, res, next) => {
  try {
    const schema = schemaFn();
    const result = await schema.safeParseAsync(req.params);

    if (!result.success)
      return res.status(400).json({
        status: "Fail",
        errors: result.error.issues.map((e) => ({
          error: e.error,
          path: e.path,
        })),
      });
    req.params = result.data;
    next();
  } catch (error) {
    console.error("Validation Middleware Error:", err);
    return res
      .status(500)
      .json({ status: "Error", message: "Validation failed" });
  }
};

export const validateBody = (schemaFn) => async (req, res, next) => {
  try {
    const schema = schemaFn();
    const result = await schema.safeParseAsync(req.body);

    if (!result.success)
      return res.status(400).json({
        status: "Fail",
        errors: result.error.issues.map((e) => ({
          error: e.error,
          path: e.path,
        })),
      });
    req.body = result.data;
    next();
  } catch (error) {
    console.error("Validation Middleware Error:", err);
    return res
      .status(500)
      .json({ status: "Error", message: "Validation failed" });
  }
};

export const validateQuery = (schemaFn) => async (req, res, next) => {
  try {
    const schema = schemaFn();
    const result = await schema.safeParseAsync(req.query);

    if (!result.success)
      return res.status(400).json({
        status: "Fail",
        errors: result.error.issues.map((e) => ({
          error: e.error,
          path: e.path,
        })),
      });
    req.query = result.data;
    next();
  } catch (error) {
    console.error("Validation Middleware Error:", err);
    return res
      .status(500)
      .json({ status: "Error", message: "Validation failed" });
  }
};
