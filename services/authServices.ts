import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';

export const generateZoomBearerToken = () => {
  const zoomApiKey = process.env.ZOOM_API_KEY;
  const zoomApiSecret = process.env.ZOOM_API_SECRET;

  if (!zoomApiKey || !zoomApiSecret) {
    return null;
  }

  const token = jwt.sign(
    { iss: zoomApiKey, exp: dayjs().unix() + 3600 },
    zoomApiSecret
  );

  return token;
};
