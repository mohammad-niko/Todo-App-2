import { z } from "zod";

const directorySchema = (directoryList, isEdit, currentName) =>
  z.object({
    directoryName: z.string().refine(
      (val) => {
        const normalizedVal = val.trim().toLowerCase();
        return !directoryList.some((dir) => {
          const name = dir.directoryName.toLowerCase();
          return isEdit === "Edit"
            ? name === normalizedVal && name !== currentName?.toLowerCase()
            : name === normalizedVal;
        });
      },
      {
        message: "Directory name must be unique",
      }
    ),
  });

export default directorySchema;
