import { Box, Card, Typography, Stack, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function AddNewTaskCardApp({ onAdd }) {
  return (
    <Box
      sx={{
        position: "relative",
        width: 290,
        height: 260,
        mb: 5,
      }}
    >
      <Card
        onClick={onAdd}
        sx={{
          height: "100%",
          width: "100%",
          borderRadius: 4,
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
          border: (theme) => `2px dashed ${theme.palette.primary.light}`,
          color: (theme) => theme.palette.text.secondary,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.3s ease",
          boxShadow: "0px 2px 6px rgba(0,0,0,0.05)",
          "&:hover": {
            borderColor: (theme) => theme.palette.primary.main,
            transform: "translateY(-5px) scale(1.02)",
            boxShadow: "0px 8px 20px rgba(0,0,0,0.1)",
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
          },
        }}
      >
        <Stack alignItems="center" spacing={1.2}>
          <IconButton
            size="large"
            disableRipple
            sx={{
              color: (theme) => theme.palette.primary.main,
              transition: "transform 0.25s ease, color 0.25s ease",
              "&:hover": {
                color: (theme) => theme.palette.primary.dark,
                transform: "rotate(90deg) scale(1.1)",
              },
            }}
          >
            <AddCircleOutlineIcon sx={{ fontSize: 46 }} />
          </IconButton>

          <Typography
            variant="subtitle1"
            fontWeight={700}
            sx={{
              letterSpacing: 0.3,
              color: (theme) => theme.palette.text.primary,
            }}
          >
            Add New Task
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: (theme) => theme.palette.text.secondary,
              fontSize: 13,
              textAlign: "center",
              px: 3,
              lineHeight: 1.5,
            }}
          >
            Click to quickly create a new task card.
          </Typography>
        </Stack>
      </Card>
    </Box>
  );
}
