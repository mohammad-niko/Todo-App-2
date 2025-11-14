import { Box, Paper, Typography, Stack, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const AddNewTaskCardFormat = () => {
  return (
    <Box sx={{ position: "relative", width: "100%", pb: 2.5 }}>
      <Paper
        elevation={4}
        sx={{
          borderRadius: 4,
          border: (theme) => `2px dashed ${theme.palette.primary.light}`,
          background: (theme) =>
            `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
          color: (theme) => theme.palette.text.secondary,
          p: 3,
          mb: 2,
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          transition: "all 0.3s ease",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          "&:hover": {
            borderColor: (theme) => theme.palette.primary.main,
            transform: "translateY(-6px) scale(1.02)",
            boxShadow: (theme) =>
              `0 8px 20px ${theme.palette.primary.main}33, 0 0 0 3px ${theme.palette.primary.main}11`,
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.background.default}, ${theme.palette.background.paper})`,
          },
        }}
      >
        <IconButton
          disableRipple
          sx={{
            color: (theme) => theme.palette.primary.main,
            transition: "transform 0.3s ease, color 0.25s ease",
            "&:hover": {
              color: (theme) => theme.palette.primary.dark,
              transform: "rotate(90deg) scale(1.15)",
            },
          }}
        >
          <AddCircleOutlineIcon sx={{ fontSize: 42 }} />
        </IconButton>

        <Stack alignItems="center" spacing={0.5}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              color: (theme) => theme.palette.text.primary,
              letterSpacing: 0.2,
            }}
          >
            Add New Task
          </Typography>

          <Typography
            variant="body2"
            sx={{
              fontSize: 13,
              color: (theme) => theme.palette.text.secondary,
              textAlign: "center",
              px: 2,
              lineHeight: 1.5,
              opacity: 0.9,
            }}
          >
            Click to create a new task item.
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default AddNewTaskCardFormat;
