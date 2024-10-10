import { Box, Typography, Grid2 as Grid, Button, Container } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Petty Cash KPN",
};

export default function Home() {
  // const redDataURL =
  // "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmZjNkM2QiLz48L3N2Zz4=";

  return (
    <Container maxWidth="md" sx={{ height: "100svh" }}>
      <Grid
        container
        spacing={4}
        sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box sx={{ textAlign: "center" }}>
            <Image
              src="https://kpn-corp.com/content_file_upload/posts/1700496686_posts_about-content-home.png"
              width={300}
              height={300}
              // placeholder="blur"
              alt="KPN Corp"
              // blurDataURL={redDataURL}
            />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography>KPN Corp</Typography>
          <Typography variant="h1">Petty Cash System</Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Link href="/login" passHref>
              <Button variant="contained">Login</Button>
            </Link>
            <Link href="/dashboard" passHref>
              <Button variant="outlined">Dashboard</Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
