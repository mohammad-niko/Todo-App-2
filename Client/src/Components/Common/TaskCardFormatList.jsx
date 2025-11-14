import {
  Box,
  Typography,
  IconButton,
  Chip,
  Paper,
  Stack,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const TaskCardFormatList = () => {
  return (
    <Box sx={{ position: "relative", width: "100%", pb: 2.5 }}>
      {/* "Main" label */}
      <Box
        sx={{
          position: "absolute",
          top: -18,
          right: 24,
          backgroundColor: "#FBCFE8", // Light pink
          color: "#7A2040",
          fontSize: 13,
          px: 2.2,
          py: 0.5,
          borderRadius: 2,
          boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
          fontWeight: 600,
          zIndex: 2,
          textTransform: "uppercase",
          letterSpacing: 0.5,
        }}
      >
        Main
      </Box>

      {/* Main card */}
      <Paper
        elevation={4}
        sx={{
          background: "linear-gradient(145deg, #6D28D9, #8B5CF6)",
          color: "white",
          borderRadius: 3,
          p: 2.5,
          mb: 2,
          transition: "transform 0.2s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
          },
          display: "flex",
          flexDirection: "column",
          gap: 1.3,
        }}
      >
        {/* Title and description */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", fontSize: 16 }}
          >
            Something
          </Typography>
          <Box
            sx={{
              mt: 0.5,
              maxHeight: 60,
              overflowY: "auto",
              pr: 0.5,
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(255,255,255,0.3)",
                borderRadius: "4px",
              },
            }}
          >
            <Typography
              variant="body2"
              sx={{ opacity: 0.9, fontSize: 13.5, lineHeight: 1.5 }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
              doloribus, tempora harum, quaerat, debitis aliquid labore eligendi
              soluta deleniti repellendus non incidunt distinctio corrupti.
            </Typography>
          </Box>
        </Box>

        {/* Footer: date + status + icons */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mt: 1 }}
        >
          {/* Date */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <CalendarMonthIcon sx={{ fontSize: 18 }} />
            <Typography variant="body2" sx={{ fontSize: 13.5 }}>
              10/19/2024
            </Typography>
          </Stack>

          {/* Right side: chip + icons */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.2}
            sx={{
              "@media (max-width:640px)": {
                spacing: 0.3,
                "& .MuiChip-root": {
                  fontSize: "0.6rem",
                  height: 22,
                  px: 0.3,
                },
                "& .MuiIconButton-root": {
                  padding: "1px",
                },
              },
            }}
          >
            <Chip
              label="Uncompleted"
              sx={{
                bgcolor: "#FDE68A",
                color: "#000",
                fontWeight: 600,
                borderRadius: "14px",
                height: "26px",
                fontSize: 13,
              }}
            />
            <IconButton
              size="small"
              sx={{
                color: "#FACC15",
                transition: "all 0.2s",
                "&:hover": {
                  color: "#FDE68A",
                  transform: "scale(1.15)",
                },
              }}
            >
              <StarIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              sx={{
                color: "#EF4444",
                transition: "all 0.2s",
                "&:hover": {
                  color: "#F87171",
                  transform: "scale(1.15)",
                },
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              sx={{
                color: "#fff",
                transition: "all 0.2s",
                "&:hover": {
                  color: "#E0E7FF",
                  transform: "scale(1.15)",
                },
              }}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

export default TaskCardFormatList;
