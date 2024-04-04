export default async function handler(req: any, res: { setHeader: (arg0: string, arg1: string) => void; status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; json: { (arg0: { error: string; }): void; new(): any; }; }; }) {
  const APPKEY = process.env.NEXT_PUBLIC_TMAP_API;

  try {
    const response = await fetch(
      `https://apis.openapi.sk.com/tmap/jsv2?version=1&appkey=${APPKEY}`,
    );
    const scriptContent = await response.text();

    // 결과를 클라이언트에게 반환
    res.setHeader('Content-Type', 'application/javascript');
    res.status(200).send(scriptContent);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
}
