import { IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface Props {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function MyPage({ onClick }: Props) {
  return (
    <>
      <IconButton
        edge="end"
        color="inherit"
        aria-label="user-info"
        size="large"
        sx={{ position: 'absolute', zIndex: 1001, right: '1rem' }}
        onClick={onClick}
      >
        <AccountCircleIcon sx={{ fontSize: '30px' }} />
      </IconButton>
    </>
  );
}
