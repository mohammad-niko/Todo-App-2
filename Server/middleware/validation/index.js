export const validateParams = (schemaFn) => async (req, res, next) => {
  try {
    console.log(req.params);
    const schema = schemaFn();
    const result = await schema.safeParseAsync(req.params);

    console.log("vaildte params start");
console.log(result);
    if (!result.success)
      return res.status(400).json({
        status: "Fail",
        errors: result.error.issues.map((e) => ({
          error: e.error,
          path: e.path,
        })),
      });
    req.id = result.data;
    console.log("vaildte params fin");
    next();
  } catch (error) {
    console.error("Validation Middleware Error:", error);
    return res
      .status(500)
      .json({ status: "Error", message: "Validation failed" });
  }
};

export const validateBody = (schemaFn) => async (req, res, next) => {
  try {
    const schema = schemaFn();
    console.log(req.body);
    const result = await schema.safeParseAsync(req.body);
    console.log("vaildte body start");
    console.log(result);
    if (!result.success)
      return res.status(400).json({
        status: "Fail",
        errors: result.error.issues.map((e) => ({
          error: e.error,
          path: e.path,
        })),
      });
    req.body = result.data;
    console.log("vaildte body fin");

    next();
  } catch (error) {
    console.error("Validation Middleware Error:", error);
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
    req.validatedQuery = result.data;

    next();
  } catch (error) {
    console.error("Validation Middleware Error:", error);
    return res
      .status(500)
      .json({ status: "Error", message: "Validation failed" });
  }
};
