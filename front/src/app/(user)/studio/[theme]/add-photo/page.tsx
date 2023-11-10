import { Typography, Box } from '@mui/material';
import Subtitle from '@/components/studio/subtitle/Subtitle';
import PhotoAddBox from '@/components/studio/photo-add-box/PhotoAddBox';
import PhotoTooltip from '@/components/studio/Tooltip/photo-tooltip/PhotoTooltip';
import Bar from '@/components/studio/bar/bar';

export default function AddPhoto() {
  return (
    <>
      <Subtitle content="우리집 반려동물 사진을 올려주세요." />
      {/* <Typography
        variant="caption"
        color="grey"
        paddingLeft="1rem"
        paddingBottom={0}
      >
        반려동물의 얼굴이 잘 나오도록 올려주세요.
      </Typography>
      <br /> */}
      <Typography
        variant="caption"
        color="grey"
        paddingLeft="1rem"
        paddingRight="0"
      >
        정방향으로, 흔들리지 않아야 이미지가 잘 나와요.
      </Typography>
      <PhotoTooltip />
      <PhotoAddBox />
      <Bar />
    </>
  );
}
