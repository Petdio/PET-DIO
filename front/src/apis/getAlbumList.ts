import axios from "axios";

export default async function getAlbumList(accessToken: string | null) {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + `concept/list`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    if (accessToken === null) {
      console.log("There is no access token. ");
    }
    console.error("Failed to get album list:", error);
  }
}
