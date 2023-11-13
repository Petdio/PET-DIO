'use client';

import { useEffect } from 'react';
import { Typography, Box, Button } from '@mui/material';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      width={'100%'}
      height={'100%'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Typography variant="h6">앗!</Typography>
      <Typography variant="body1">페이지를 불러오지 못했어요.</Typography>
      <Box height={'1rem'} />
      <Button
        variant="outlined"
        color="primary"
        onClick={() => reset()}
      >
        다시 불러오기
      </Button>
    </Box>
  );
}
