'use client';
import { forwardRef, useState, useRef } from 'react';
import {
  Grid,
  Box,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import Image from 'next/image';
import { TransitionProps } from '@mui/material/transitions';
import ThemeCard from '../theme-card/ThemeCard';
import Subtitle from '../subtitle/Subtitle';
import { Container, height } from '@mui/system';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return (
    <Slide
      direction="up"
      ref={ref}
      {...props}
    />
  );
});

export default function ThemeList() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState<number>(0);

  const onDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + scrollRef.current!.scrollLeft);
  };

  const onDragEnd = () => {
    setIsDrag(false);
  };

  const onDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDrag) {
      scrollRef.current!.scrollLeft = startX - e.pageX;
    }
  };

  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [exampleList, setExampleList] = useState<string[]>([]);

  const handleClickOpen = (index: number) => {
    setOpen(true);
    setModalTitle(themeList[index].name);
    setExampleList(themeList[index].examples);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // 추후 이 리스트를 api로 가져와야함
  const themeList = [
    {
      src: 'https://static.displate.com/857x1200/displate/2023-04-06/11f93ddb07ad9e1aa4e1281d77d6bcc2_423963312516d8608dbcee6a41f6b374.jpg',
      examples: [
        'https://static.displate.com/857x1200/displate/2023-04-06/92cc37dd392bf0c242aa6b7f8dce98b8_db6fcf774335f5c441aeb0cc2a42f0eb.jpg',
        'https://static.displate.com/857x1200/displate/2023-01-30/28ab887200316bc5dcccee826afd21ed_662dd4bd513811650151cd75245e3dae.jpg',
        'https://static.displate.com/857x1200/displate/2023-03-23/0b87bf910d68ea8f63f1291666f0bd7e_86605742b59ddace60ad2479061e1240.jpg',
      ],
      name: '우주복',
    },
    {
      src: 'https://static.displate.com/857x1200/displate/2023-09-26/c60a6f815876fa8923b827464123e82e_748289fcbf9a9a65967b5712a5ad9ad2.jpg',
      examples: [
        'https://static.displate.com/857x1200/displate/2023-10-04/e1bfaa1c8e5a7daf56a2e912892bb7ac_4d2d6e11243532d085f4ce4db6f0d7c7.jpg',
        'https://static.displate.com/857x1200/displate/2023-03-03/7ff3c159d02babadd3562f2a233eac9d_2af650f69dc1a7626dd519837c900fea.jpg',
        'https://static.displate.com/857x1200/displate/2023-10-20/2c6173d6bad142c8baf12745ed1f3a00_868b34dd39a719413a4757a8bcb4d903.jpg',
      ],
      name: '크리스마스',
    },
    {
      src: 'https://static.displate.com/857x1200/displate/2022-12-21/2bac69382cc5d3a3c8c0573677efae1c_c2f24f483cd8fe150251f72f223013f7.jpg',
      examples: [
        'https://static.displate.com/857x1200/displate/2023-02-15/fb213418db2ddc756b9ca27a60a62fdb_2422a488578aecb02fafca580b165fdf.jpg',
        'https://static.displate.com/857x1200/displate/2023-02-15/f5e972dc54b49dc734950d1495981a5f_f81d17ccd68bfb6f270c5a201e91fc7e.jpg',
        'https://static.displate.com/857x1200/displate/2023-06-02/a046525d5c0904c226c14e64aab962db_caf8c8f4c814e2afba5d9334c2d9cb44.jpg',
      ],
      name: '히어로',
    },
    {
      src: 'https://t3.ftcdn.net/jpg/05/85/80/82/360_F_585808277_QID4Suse88rzCqjCJ97XfeCMMlZtWLt2.jpg',
      examples: [
        'https://preview.redd.it/aristocrat-dachshund-created-by-bluewillow-ai-v0-cqbn4olxdota1.jpg?width=1080&crop=smart&auto=webp&s=4d6c4db7d276fe9fdbf9d1b106dc6264caf45221',
        'https://preview.redd.it/aristocrat-dachshund-created-by-bluewillow-ai-v0-egpg8olxdota1.jpg?width=1080&crop=smart&auto=webp&s=567cc7fc197364f6f087510daea42b621202f019',
        'https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWt4WkRJeVl6Rm1PQzA1Wm1ZeUxUUmtZakV0T0RaaVlTMWpOVFl5TnpWa05qRmpNemNHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--5b34da1fc5f86415ae6a76152fc3ca204183ad45/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--935666d13f63ed5aca9daa2416340e3a90b6014e/prompthero-prompt-a34da4105c8.png',
      ],
      name: '웨딩',
    },
    {
      src: 'https://static.displate.com/857x1200/displate/2023-03-11/87dd489d90598737082eaf8dd8ca950a_b640ff9c43ad1908ee9bf747e67fd18e.jpg',
      examples: [
        'https://static.displate.com/857x1200/displate/2023-01-30/d22daae5240161052aec9b4327dc0ccc_ef5d123d88f5636794af391f472b311e.jpg',
        'https://static.displate.com/857x1200/displate/2023-01-30/198bfdabb225346ebd7db7365722ee4b_051f36b98e53b5c3571bfdf1cd1f63d1.jpg',
        'https://static.displate.com/857x1200/displate/2023-01-30/cb49244124749d5c3b1213467259dc8d_7aee472ba18647967a39e29f929a4446.jpg',
      ],
      name: '신사',
    },
    {
      src: 'https://static.displate.com/857x1200/displate/2023-03-06/381d8304575c98db4992e0820bcc5bc0_278e7d08f38d1b7209eb7b06ffe2bef4.jpg',
      examples: [
        'https://static.displate.com/857x1200/displate/2023-03-22/ce95b42674750329062c56faa64975d2_35023b1aa4bc996ceaea8f2c06dc911d.jpg',
        'https://static.displate.com/857x1200/displate/2023-06-08/9c498d3480a6c774b523013b0a53f56d_1404c565fd75dc789e94cdfb486d1cca.jpg',
        'https://static.displate.com/857x1200/displate/2023-03-13/5dee4309f871d59966e7b8934a4335ec_e1050c4bf31bb80394b2806bb4453e6d.jpg',
      ],
      name: '사이버펑크',
    },
    {
      src: 'https://static.displate.com/857x1200/displate/2023-09-09/f0293de4182f3a53fc495e8d9428b75c_3959566d152574ee3e5a2f562c30bbcc.jpg',
      examples: [
        'https://static.displate.com/857x1200/displate/2023-07-23/b84c7bdb69d10e1e64bedc9adeffb068_c1e45cf808bd19adda8af5f8deb36c80.jpg',
        'https://static.displate.com/857x1200/displate/2023-03-26/043c192275ea7e875a2f6841e7b87ce2_f04c7c6a795c8e5c86a9fd29c3c884d0.jpg',
        'https://static.displate.com/857x1200/displate/2023-09-15/9e77307b1cfacaf36b88de3d4a5b5af7_bff2d98e53c3431f746e065135b4e88f.jpg',
      ],
      name: '귀족',
    },
    {
      src: 'https://static.displate.com/857x1200/displate/2023-07-06/5be0d39cc46d329703a951d58d59e536_ca6dbac4917c06c72f629df051e7138d.jpg',
      examples: [
        'https://static.displate.com/857x1200/displate/2022-12-07/7d2119dbf4c0ffeb38fe747799066236_456673d4c3b2a500461cb38aa2721881.jpg',
        'https://static.displate.com/857x1200/displate/2023-07-21/4fc750ddbafaafddb82dc19815a654e0_a477398491879da879ae8697c5444551.jpg',
        'https://static.displate.com/857x1200/displate/2022-09-29/589850817064f60c235d77c607df2ff5_d9b2527919eb07f8947adf16052a68f8.jpg',
      ],
      name: '밀리터리',
    },
  ];
  return (
    <>
      <Box
        sx={{
          padding: '20px',
        }}
      >
        <Grid
          container
          spacing={2}
        >
          {themeList.map((item, index) => {
            return (
              <Grid
                key={index}
                item
                xs={6}
                onClick={() => handleClickOpen(index)}
              >
                <ThemeCard
                  imgSrc={item.src}
                  themeName={item.name}
                ></ThemeCard>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="select-theme"
        maxWidth="xs"
      >
        <DialogTitle textAlign="center">{modalTitle}</DialogTitle>
        <DialogContent sx={{ padding: 0 }}>
          <Subtitle
            content="이런 이미지를 만들 수 있어요."
            mode="modal"
          ></Subtitle>
          <Container
            ref={scrollRef}
            onMouseDown={onDragStart}
            onMouseMove={onDragMove}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
            sx={{
              backgroundColor: '#454545',
              height: '230px',
              width: '100%',
              overflow: 'hidden',
              overflowX: 'scroll',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              margin: '20px 0 20px 0',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                height: '100%',
              }}
            >
              {exampleList.map((item, index) => {
                return (
                  <Box
                    sx={{
                      position: 'relative',
                      marginBottom: '0.25rem',
                      flexShrink: 0,
                      aspectRatio: 1 / 1,
                      margin: 1,
                    }}
                    key={index}
                  >
                    <Image
                      src={item}
                      alt={`${modalTitle} example ${index}`}
                      fill
                      objectFit="cover"
                      objectPosition="center center"
                      placeholder="empty"
                      style={{ borderRadius: '0.5rem' }}
                    />
                  </Box>
                );
              })}
            </Box>
          </Container>
          <DialogContentText
            color="text"
            textAlign="center"
            id="select-theme"
          >
            이 테마로 진행할까요?
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px 17px 56px 17px',
          }}
        >
          <Button
            sx={{ width: '50%' }}
            variant="contained"
            color="inherit"
            onClick={handleClose}
          >
            취소
          </Button>
          <Button
            sx={{ width: '50%' }}
            variant="contained"
            onClick={handleClose}
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
