import { Box, Typography } from '@mui/material';

export default function Home() {
  return (
    <Box sx={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100svh',
    }}
    >
      <Typography variant="h1">Petty Cash KPN</Typography>
    </Box>
  );
}
