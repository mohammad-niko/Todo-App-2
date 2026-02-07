import z from "zod";

import { ObjectIdSchema } from "../../common/schemas/sheard.schema.js";

export const createDirSchema = () =>
  z.object({
    directoryName: z
      .string()
      .trim()
      .toLowerCase()
      .nonempty({ error: "Dirctory Name Is Required" }),
  });

export const updateDirSchema = () =>
  z
    .object({
      directoryName: z
        .string()
        .trim()
        .toLowerCase()
        .nonempty({ error: "Directory Name Is Required" }),
      // path: z.string().trim().nonempty({ error: "Path Is Required" }),
    })
    // .superRefine((data, ctx) => {
    //   if (!data.path.startsWith("/directory/")) {
    //     return ctx.addIssue({
    //       errors: "Path must start with /directory/",
    //     });
    //   }

    //   const expectedPath = `/directory/${data.directoryName}`;
    //   if (data.path !== expectedPath) {
    //     return ctx.addIssue({
    //       errors: `Path must be exactly ${expectedPath}`,
    //     });
    //   }
    // });

export const dirIDSchema = () =>
  z.object({
    id: ObjectIdSchema,
  });
