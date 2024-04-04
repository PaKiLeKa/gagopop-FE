import axios from 'axios';

export default async function handler(req: { body: { startLng: string; startLat: string; endLng: string; endLat: string; destinationXY: string; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }) {
  try {
    const { startLng, startLat, endLng, endLat, destinationXY } = req.body;
    const APPKEY = process.env.NEXT_PUBLIC_TMAP_API;

    const response = await axios.post(
      'https://apis.openapi.sk.com/tmap/routes/pedestrian',
      {
        startX: startLng,
        startY: startLat,
        endX: endLng,
        endY: endLat,
        reqCoordType: 'WGS84GEO',
        resCoordType: 'EPSG3857',
        startName: '출발지',
        endName: '도착지',
        passList: destinationXY,
      },
      {
        headers: {
          appKey: APPKEY,
          'Content-Type': 'application/json',
        },
      },
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'fetching error' });
  }
}
