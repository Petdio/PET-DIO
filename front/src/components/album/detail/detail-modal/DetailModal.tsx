"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import downloadImage from "@/utils/downLoadImage";
import ShareIcon from "@mui/icons-material/Share";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import CameraIcon from "@mui/icons-material/Camera";
import CloseIcon from "@mui/icons-material/Close";
import { ImgInfoProps } from "@/interfaces/AlbumDataProps";
import { SlideMUI } from "@/components/animation/SlideMUI";
import shareImage from "@/utils/shareImage";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useAlert } from "@/components/provider/AlertProvider";

const ActionButton = styled(Button)({});

interface Props {
  imgInfo: ImgInfoProps;
  themeName: string;
  isOpen: boolean;
  handleClose: () => void;
  againURL: string;
}

function DetailModal({
  imgInfo,
  themeName,
  isOpen,
  handleClose,
  againURL,
}: Props) {
  const { albumURL, albumCreated } = imgInfo;
  const imgBrief = themeName + ", " + albumCreated;
  const fileName = themeName + "_" + albumCreated;
  const router = useRouter();
  const { failed } = useAlert();

  async function deletePicture() {
    try {
      const response = await axios.delete(
        // process.env.NEXT_PUBLIC_API_URL + `user`,
        `album/${imgInfo.albumId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );

      console.log(response);
      handleClose();
      window.location.reload(); // 추후 삭제 모션으로 바꿀것
    } catch (error) {
      failed("Error : 이미지 삭제 실패!");
      console.error("에러 발생:", error);
    }
  }

  if (!isOpen) return null;
  return (
    <Dialog
      fullWidth={true}
      maxWidth="xs"
      open={isOpen}
      TransitionComponent={SlideMUI}
      onClose={handleClose}
      sx={{
        paddingLeft: "1rem",
        paddingRight: "1rem",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          startIcon={<CloseIcon />}
          size="small"
          // 컬러가 흠...
          color="inherit"
          disableRipple
          sx={{
            margin: "1rem 0 0 0.75rem",
            borderRadius: 100,
          }}
          onClick={handleClose}
        >
          닫기
        </Button>
        <Button
          endIcon={<DeleteIcon />}
          size="small"
          variant="outlined"
          color="error"
          disableRipple
          sx={{
            margin: "1rem 0.75rem 0 0",
          }}
          onClick={deletePicture}
        >
          삭제
        </Button>
      </Box>
      <DialogContent sx={{ padding: "1rem" }}>
        <DialogContentText textAlign="end">
          <Typography fontSize={14}>{imgBrief}</Typography>
        </DialogContentText>

        <Box
          position="relative"
          width="100%"
          marginTop="0.5rem"
          sx={{ aspectRatio: 1 / 1 }}
        >
          <Image
            src={albumURL}
            alt={imgBrief}
            fill
            objectFit="cover"
            objectPosition="center center"
            placeholder="empty"
            style={{ borderRadius: "0.5rem" }}
          />
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          padding: "0 1rem 1rem 1rem",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          width="100%"
          alignItems="center"
          padding={0}
        >
          <Box display="flex" width="100%">
            {/* <Tooltip title="아직 준비중인 기능이에요." placement="top" arrow> */}
            <ActionButton
              variant="contained"
              color="secondary"
              endIcon={<ShareIcon />}
              fullWidth
              onClick={() => shareImage(albumURL)}
            >
              공유
            </ActionButton>
            {/* </Tooltip> */}
            <Box width="1em" />
            <ActionButton
              variant="contained"
              color="primary"
              endIcon={<SaveAltIcon />}
              fullWidth
              onClick={() => downloadImage(albumURL, fileName)}
            >
              저장
            </ActionButton>
          </Box>
          <Box height="0.5rem" />
          <ActionButton
            variant="outlined"
            color="primary"
            endIcon={<CameraIcon />}
            fullWidth
            sx={{ width: "100%" }}
            onClick={() => router.push(`/studio/${againURL}/add-photo`)}
          >
            이 테마로 다시 만들기
          </ActionButton>
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default DetailModal;
