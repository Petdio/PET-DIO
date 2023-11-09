import { Snackbar, Alert, AlertTitle, Collapse } from '@mui/material';

interface Props {}

function GenerateAlert() {
  return (
    // <Alert sx={{ margin: '0 1rem 0 1rem' }}>
    //   <AlertTitle>이미지 생성 완료!</AlertTitle>
    //   요청하신 이미지가 완성되었어요 —{' '}
    //   <strong>
    //     <a href="/test">이동</a>
    //   </strong>
    // </Alert>
    <Snackbar open />
  );
}

export default GenerateAlert;
