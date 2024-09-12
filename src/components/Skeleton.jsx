import { Box, Skeleton, TableCell, TableRow } from "@mui/material";

export const ListSkeleton = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Skeleton variant="rounded" width="100%" height={96} />
      <Skeleton variant="rounded" width="100%" height={64} />
      <Skeleton variant="rounded" width="100%" height={48} />
    </Box>
  );
};

export const POSkeleton = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <Skeleton variant="rounded" width="100%" height={96} />
        <Skeleton variant="rounded" width="100%" height={96} />
      </Box>
      <Skeleton variant="rounded" width="100%" height={64} />
      <Skeleton variant="rounded" width="100%" height={64} />
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <Skeleton variant="rounded" width="100%" height={64} />
        <Skeleton variant="rounded" width="100%" height={64} />
      </Box>
    </Box>
  );
};

export const TableSkeleton = ({ row = 3, column }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        {[...Array(column)].map((index) => (
          <Skeleton key={index} variant="rounded" width="100%" height={64} />
        ))}
      </Box>
      {[...Array(row)].map((index) => (
        <Skeleton key={index} variant="rounded" width="100%" height={64} />
      ))}
    </Box>
  );
};
