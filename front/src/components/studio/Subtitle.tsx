import { Typography, Box } from '@mui/material';
import { theme } from '@/styles/ThemeRegistry';

interface Props {
  content: string;
}

function Subtitle({ content }: Props) {
  return (
    <>
      <Box
        sx={{ width: '2rem', heighit: '0.25rem', backgroundColor: 'black' }}
      />
      <Typography variant="h6">{content}</Typography>
    </>
  );
}

export default Subtitle;
