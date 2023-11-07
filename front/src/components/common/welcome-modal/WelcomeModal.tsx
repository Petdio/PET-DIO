import { Dialog } from '@mui/material';
import { SlideMUI } from '@/components/animation/SlideMUI';

function WelcomeModal() {
  return (
    <Dialog
      fullWidth={true}
      maxWidth="xs"
      open={true}
      TransitionComponent={SlideMUI}
      onClose={() => {}}
      sx={{
        paddingLeft: '1rem',
        paddingRight: '1rem',
      }}
    ></Dialog>
  );
}

export default WelcomeModal;
