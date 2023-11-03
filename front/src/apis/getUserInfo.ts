import axios from 'axios';

export async function getUserInfo() {
  try {
    const response = await axios.get(`user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    });

    console.log(response);
    // setCoin(response.data.userCoin);
    // setProfile(response.data.profileImage);
    return response.data;
  } catch (error) {
    console.error('에러 발생:', error);
    alert('로그인 해주세요.');
    window.location.href = '/login';
  }
}
