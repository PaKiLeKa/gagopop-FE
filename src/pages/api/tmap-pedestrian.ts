import axios from 'axios';

export default async function handler(
  req: {
    body: {
      startLng: string;
      startLat: string;
      endLng: string;
      endLat: string;
      destinationXY: string;
    };
  },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { error: string }): void; new (): any };
    };
  },
) {
  try {
    const APPKEY = process.env.NEXT_PUBLIC_TMAP_API;

    const response = await axios.post(
      'https://apis.openapi.sk.com/tmap/routes/pedestrian',
      req.body,
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
