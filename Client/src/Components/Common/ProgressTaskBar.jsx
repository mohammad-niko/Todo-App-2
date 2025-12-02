import { useEffect, useState } from "react";
import { Box, Typography, LinearProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";

const StyledProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 6,
  backgroundColor: "rgba(200, 220, 230, 0.6)", // soft neutral for drawer tone
  "& .MuiLinearProgress-bar": {
    borderRadius: 6,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    transition: "width 0.4s ease",
  },
}));

export default function LinearWithValueLabel() {
  const [progress, setProgress] = useState(0);
  const tasks = useSelector((store) => store.Task.task);
  const totalTasks = tasks.length;
  const doneTasks = tasks.filter((t) => t.completed === true);
  useEffect(() => {
    const percent = totalTasks
      ? doneTasks[0]
        ? (doneTasks.length / totalTasks) * 100
        : 0
      : 0;
    const timeout = setTimeout(() => setProgress(percent), 250);
    return () => clearTimeout(timeout);
  }, [totalTasks, doneTasks]);

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: (theme) => theme.palette.customColors.drawerBg,
        px: 3,
        py: 1.4,
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: 0,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: (theme) => theme.palette.text.secondary,
            flexGrow: 1,
          }}
        >
          Task Progress
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: (theme) => theme.palette.text.primary,
          }}
        >
          {`${Math.round(progress)}%`}
        </Typography>
      </Box>
      <StyledProgress variant="determinate" value={progress} />
    </Box>
  );
}
