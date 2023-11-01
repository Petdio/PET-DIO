"use client";
import { styled } from "@mui/material/styles";
import { Typography, Button } from "@mui/material";
import { createSvgIcon } from "@mui/material/utils";

const KakaoLogInButton = styled(Button)`
  && {
    background-color: #fee500;
    color: #000;
    margin-top: 30vh;
  }
`;

const KakaoSymbol = createSvgIcon(
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_471_1733)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.00004 0.476132C4.02919 0.476132 1.8e-05 3.60553 1.8e-05 7.46512C1.8e-05 9.86547 1.55842 11.9815 3.93154 13.2401L2.93305 16.9069C2.84483 17.2309 3.21343 17.4892 3.49648 17.3014L7.87336 14.3974C8.24272 14.4333 8.61809 14.4542 9.00004 14.4542C13.9705 14.4542 17.9999 11.3249 17.9999 7.46512C17.9999 3.60553 13.9705 0.476132 9.00004 0.476132"
        fill="black"
      />
    </g>
    <defs>
      <clipPath id="clip0_471_1733">
        <rect width="18" height="18" fill="white" />
      </clipPath>
    </defs>
  </svg>,
  "kakao"
);

export default function KakaoLogIn() {
  const kakaoLoginHandler = () => {
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}&response_type=code`;
    window.location.href = link;
  };

  return (
    <KakaoLogInButton variant="contained" onClick={kakaoLoginHandler}>
      <KakaoSymbol fontSize="small" />
      <Typography fontSize="15px" padding="5px 40px 5px 60px">
        카카오 로그인
      </Typography>
    </KakaoLogInButton>
  );
}
