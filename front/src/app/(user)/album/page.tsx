import { Box, Typography } from '@mui/material';

function Album() {
  return (
    <>
      <Box
        sx={{
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 1rem 0 1rem',
        }}
      >
        <Typography
          variant="h6"
          color="text"
          fontWeight="bold"
        >
          앨범
        </Typography>
      </Box>
    </>
  );
}

export default Album;
