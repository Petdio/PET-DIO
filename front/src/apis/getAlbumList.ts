import axios from 'axios';

export default async function getAlbumList(accessToken: string | null) {
  try {
    const response = await axios.get(
      // `${process.env.BASE_URL}:8080/album/list`,
      `http://k9a206.p.ssafy.io:8080/concept/list`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    if (accessToken === null) {
      console.log('There is no access token. ');
    }
    console.error('Failed to get album list:', error);
  }
}
