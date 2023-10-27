import { Typography } from '@mui/material';

import Subtitle from '@/components/studio/subtitle/Subtitle';
import ThemeList from '@/components/studio/theme-list/ThemeList';

interface Props {
  pageTitleContent: string;
  subtitleContent?: string;
}

function PageTitle({ pageTitleContent, subtitleContent = '' }: Props) {
  return (
    <>
      <Typography
        variant="h6"
        color="text"
        fontWeight="bold"
        padding="1rem"
      >
        {pageTitleContent}
      </Typography>
      {subtitleContent && <Subtitle content={subtitleContent} />}
    </>
  );
}

export default PageTitle;
