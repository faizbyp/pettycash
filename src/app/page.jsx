import { Box, Typography, Grid2 as Grid, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  // const redDataURL =
  // "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmZjNkM2QiLz48L3N2Zz4=";

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
            // blurDataURL={redDataURL}
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
