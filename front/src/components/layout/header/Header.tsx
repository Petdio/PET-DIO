'use client';
import { useState } from 'react';
import { AppBar } from '@mui/material';
import Logo from '../../common/logo/Logo';
import { styled } from '@mui/material/styles';
import MyPage from '@/components/common/my-page/MyPage';
import MemberMenu from '@/components/common/my-page/member-menu/MemberMenu';
import BackButton from '@/components/common/back-button/BackButton';
import { usePathname } from 'next/navigation';

const dummyCoin = 20000;

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

  return (
    <>
      <StyledAppBar
        position="static"
        sx={{ zIndex: 1000 }}
        elevation={0}
      >
        {pathname !== '/studio' && !pathname.includes('/album') && (
          <BackButton />
        )}
        <Logo />
        <MyPage onClick={handleMyPageOpen} />
        <MemberMenu
          anchorEl={anchorEl}
          isOpen={memberMenuOpen}
          closeFn={handleMyPageClose}
          coins={dummyCoin}
        />
      </StyledAppBar>
    </>
  );
}
