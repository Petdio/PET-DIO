import { Box, Typography } from '@mui/material';
import { theme } from '@/styles/ThemeRegistry';

interface Props {
  themeName: string;
}

function ThemeSelectItem({ themeName }: Props) {
  return (
    <Box
      display="flex"
      width="50%"
      // width="5rem"
      height="4rem"
      justifyContent="center"
      alignItems="center"
      // border="1px solid black"
      sx={{
        cursor: 'pointer',
        '&:hover': {
          '& > .content': {
            color: theme.palette.secondary.main,
          },
        },
      }}
    >
      <Typography
        className="content"
        color={theme.palette.text.primary}
      >
        {themeName}
      </Typography>
    </Box>
  );
}

export default ThemeSelectItem;
