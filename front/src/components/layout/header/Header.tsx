'use client';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { usePathname } from 'next/navigation';
import axios from 'axios';
// components
import { AppBar } from '@mui/material';
import Logo from '../../common/logo/Logo';
import MyPage from '@/components/common/my-page/MyPage';
import MemberMenu from '@/components/common/my-page/member-menu/MemberMenu';
import BackButton from '@/components/common/back-button/BackButton';
import HomeButton from '@/components/common/home-button/HomeButton';
// interfaces
import { UserInfoProps } from '@/interfaces/UserInfoProps';
// apis
import { getUserInfo } from '@/apis/getUserInfo';

const StyledAppBar = styled(AppBar)`
  && {
    background-color: #fff;
    color: #757575;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 72px;
    width: 100%;
    max-width: 480px;
  }
`;

export default function Header() {
  const [coin, setCoin] = useState(0);
  const [profile, setProfile] = useState('');
  const [memberMenuOpen, setMemberMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMyPageOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setMemberMenuOpen(true);
  };
  const handleMyPageClose = () => {
    setMemberMenuOpen(false);
  };
  const pathname = usePathname();

  const noneBackButtonPathList = ['/album', '/generating', '/result'];

  async function getUserInfo() {
    try {
      const response = await axios.get(
        // process.env.NEXT_PUBLIC_API_URL + `user`,
        `user`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access-token')}`,
          },
        }
      );

      console.log(response);
      setCoin(response.data.userCoin);
      setProfile(response.data.profileImage);
    } catch (error) {
      console.error('에러 발생:', error);
      alert('로그인 해주세요.');
      window.location.href = '/login';
    }
  }
  useEffect(() => {
    if (window.location.href.includes('/studio/result')) {
      if (localStorage.getItem('access-token')) {
        getUserInfo();
      }
    } else {
      getUserInfo();
    }
  }, []);

  return (
    <>
      <StyledAppBar
        position="static"
        sx={{ zIndex: 1000 }}
        elevation={0}
      >
        {pathname !== '/studio' &&
          !noneBackButtonPathList.some((path) => pathname.includes(path)) && (
            <BackButton />
          )}
        {pathname.includes('/result') && <HomeButton />}
        <Logo />
        <MyPage
          onClick={handleMyPageOpen}
          profile={profile}
        />
        <MemberMenu
          anchorEl={anchorEl}
          isOpen={memberMenuOpen}
          closeFn={handleMyPageClose}
          coins={coin}
        />
      </StyledAppBar>
    </>
  );
}
