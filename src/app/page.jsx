import { Box, Typography, Grid2 as Grid, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100svh",
      }}
    >
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Image
            src="https://kpn-corp.com/content_file_upload/posts/1700496686_posts_about-content-home.png"
            width={200}
            height={200}
            // placeholder="blur"
            alt="KPN Corp"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography variant="h1">Petty Cash KPN</Typography>
          <Link href="/login" passHref>
            <Button variant="contained">Login</Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}
