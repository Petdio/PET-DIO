import axios from 'axios';

export default async function getAlbumList(accessToken: string | null) {
  try {
    const response = await axios.get(
      // process.env.NEXT_PUBLIC_API_URL + `album/list`,
      `album/list`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    // console.log(response);
    return response;
  } catch (error) {
    if (accessToken === null) {
      console.log('There is no access token. ');
    }
    console.error('Failed to get album list:', error);
  }
}
