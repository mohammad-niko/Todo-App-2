import { Box, Skeleton, Stack } from "@mui/material";

function VerifyEmailSkeletonBox() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Box sx={{ width: 350 }}>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Box>
    </Box>
  );
}

export default VerifyEmailSkeletonBox;
