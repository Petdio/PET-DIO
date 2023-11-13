'use client';

import { Typography, Button, Box } from '@mui/material';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <Box>
          <Typography>앗! 페이지를 불러오지 못했어요.</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            다시 시도하기
          </Button>
        </Box>
      </body>
    </html>
  );
}
