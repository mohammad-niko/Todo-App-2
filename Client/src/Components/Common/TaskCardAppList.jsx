import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  IconButton,
} from "@mui/material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import StarIcon from "@mui/icons-material/Star";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import DeleteDialog from "./DeleteDialog";

export default function TaskCardAppList() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  function handleDialog() {
    setIsOpenDialog(!isOpenDialog);
  }

  return (
    <Box
      sx={{
        position: "relative",
        width: "290px",
        fontFamily: "Inter, Roboto, Arial",
        height: "260px",
        mb: 5,
      }}
    >
      {/* Top-right tag */}
      <Box
        sx={{
          position: "absolute",
          top: -27,
          right: 12,
          backgroundColor: "#FBCFE8", // Light pink
          color: "#7A2040",
          fontSize: 13,
          px: 2.3,
          py: 0.8,
          borderRadius: 2,
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          fontWeight: 600,
          zIndex: -1,
        }}
      >
        MAIN
      </Box>

      {/* Main card */}
      <Card
        sx={{
          height: "100%",
          width: "100%",
          background: "linear-gradient(145deg, #6D28D9, #8B5CF6)", // Soft purple gradient
          color: "#fff",
          borderRadius: 3,
          pt: 3,
          pb: 2,
          px: 2.2,
          boxShadow: "0px 4px 10px rgba(0,0,0,0.25)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <CardContent sx={{ p: 0 }}>
          {/* Title */}
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", mb: 0.8, fontSize: 16 }}
          >
            Something
          </Typography>

          {/* Description */}
          <Box
            sx={{
              maxHeight: "90px",
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
              sx={{
                color: "rgba(255,255,255,0.9)",
                fontSize: 13.5,
                lineHeight: 1.5,
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
              asperiores necessitatibus vitae non voluptatum rem repudiandae.
            </Typography>
          </Box>

          {/* Bottom section */}
          <Box sx={{ position: "absolute", bottom: "18px", width: "88%" }}>
            {/* Date */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={0.7}
              sx={{ mt: 2 }}
            >
              <CalendarTodayOutlinedIcon sx={{ fontSize: 16 }} />
              <Typography sx={{ fontSize: 13.5, color: "white" }}>
                10/19/2024
              </Typography>
            </Stack>

            {/* Dashed divider */}
            <Box
              sx={{
                borderBottom: "1px dashed rgba(255,255,255,0.4)",
                mt: 1.6,
                mb: 1.5,
              }}
            />

            {/* Status and icons */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              {/* Status chip */}
              <Chip
                label="Uncompleted"
                sx={{
                  backgroundColor: "#FDE68A", // Yellow
                  color: "#000",
                  fontWeight: 600,
                  height: 28,
                  borderRadius: "12px",
                  fontSize: 13,
                  px: 1.2,
                }}
              />

              {/* Action icons */}
              <Stack direction="row" alignItems="center" spacing={0.6}>
                <IconButton
                  size="small"
                  sx={{
                    color: "#FACC15",
                    "&:hover": { color: "#FDE68A", transform: "scale(1.1)" },
                    transition: "all 0.2s",
                  }}
                >
                  <StarIcon fontSize="small" />
                </IconButton>

                <IconButton
                  onClick={handleDialog}
                  size="small"
                  sx={{
                    color: "#EF4444",
                    "&:hover": { color: "#F87171", transform: "scale(1.1)" },
                    transition: "all 0.2s",
                  }}
                >
                  <DeleteOutlineIcon  fontSize="small" />
                </IconButton>

                <IconButton
                  size="small"
                  sx={{
                    color: "#fff",
                    "&:hover": { color: "#E0E7FF", transform: "scale(1.1)" },
                    transition: "all 0.2s",
                  }}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>
          </Box>
        </CardContent>
      </Card>
      <DeleteDialog open={isOpenDialog} handleClose={handleDialog } onConfirm={isOpenDialog} />
    </Box>
  );
}
