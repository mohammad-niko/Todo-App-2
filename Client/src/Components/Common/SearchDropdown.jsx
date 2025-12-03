import React from "react";
import {
  Box,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Button,
  Divider,
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { useSelector } from "react-redux";

export default function SearchDropdown({
  query,
  onResultClick,
  onSeeAllResults,
}) {
  const theme = useTheme();
  const tasks = useSelector((store) => store.Task.task);
  const trimmed = query.trim();

  const results =
    trimmed.length > 0
      ? tasks.filter((t) =>
          t.title.toLowerCase().includes(trimmed.toLowerCase())
        )
      : [];

  if (!trimmed || results.length === 0) return null;

  const displayedResults = results.slice(0, 4);

  return (
    <Box
      sx={{
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        zIndex: 50,
        mt: 1,
        width: "100%",
        maxWidth: "100%",
        animation: "fadeIn .15s ease-out",
        "@keyframes fadeIn": {
          from: { opacity: 0, transform: "translateY(-4px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      <Paper
        elevation={6}
        sx={{
          borderRadius: "12px",
          overflow: "hidden",
          backdropFilter: "blur(6px)",
          background:
            theme.palette.mode === "dark"
              ? alpha("#0F172A", 0.85)
              : alpha("#F5F7FB", 0.9),
          border: `1px solid ${
            theme.palette.mode === "dark"
              ? alpha("#A5B4FC", 0.15)
              : alpha("#7B3FF3", 0.15)
          }`,
        }}
      >
        <List disablePadding>
          {displayedResults.map((result, index) => (
            <React.Fragment key={result.id}>
              <ListItemButton
                onClick={() => onResultClick(result)}
                sx={{
                  py: 1.4,
                  px: 2,
                  transition: "0.15s",
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? alpha(theme.palette.primary.main, 0.12)
                        : alpha(theme.palette.primary.main, 0.08),
                  },
                  "&:hover .MuiListItemText-primary": {
                    color: theme.palette.primary.main,
                    fontWeight: 700,
                  },
                }}
              >
                {/* TITLE + DEADLINE */}
                <ListItemText
                  primary={result.title}
                  secondary={`Deadline: ${result.deadLine}`}
                  slotProps={{
                    primary: {
                      sx: {
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        mb: 0.3,
                      },
                    },
                    secondary: {
                      sx: {
                        fontSize: "0.75rem",
                        color: "text.secondary",
                      },
                    },
                  }}
                />
              </ListItemButton>

              {index < displayedResults.length - 1 && (
                <Divider component="li" sx={{ opacity: 0.15 }} />
              )}
            </React.Fragment>
          ))}

          {/* SEE ALL BUTTON */}
          <Box
            sx={{
              p: 1,
              textAlign: "center",
              borderTop: `1px solid ${theme.palette.divider}`,
              backgroundColor:
                theme.palette.mode === "dark"
                  ? alpha("#1E293B", 0.5)
                  : alpha("#EEF2F7", 0.6),
            }}
          >
            <Button
              color="primary"
              fullWidth
              onClick={() => onSeeAllResults(trimmed)}
              sx={{
                textTransform: "none",
                borderRadius: 1,
                fontWeight: 600,
                fontSize: "0.85rem",
                py: 1,
              }}
            >
              All Results ({results.length}) For "{trimmed}"
            </Button>
          </Box>
        </List>
      </Paper>
    </Box>
  );
}
