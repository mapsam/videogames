import { request } from 'undici';

// token saved in memory to act as a cache
let token;

async function getToken() {
  if (token) return token;
  const url = `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_SECRET}&grant_type=client_credentials`;
  const { body } = await request(url, { method: 'POST' });
  const json = await body.json();
  return json.access_token;
}

function log(request) {
  console.log(`${request.method} ${request.url} ${JSON.stringify(request.body)}`);
}

export default async function handler(req, res) {
  log(req);
  // get token
  const token = await getToken();

  // make a search request
  // https://api-docs.igdb.com/#search-1
  const response = await request(`https://api.igdb.com/v4/${req.query.e}`, {
    method: 'POST',
    headers: {
      'Client-ID': process.env.TWITCH_CLIENT_ID,
      'Authorization': `Bearer ${token}`
    },
    body: req.query.q
  });

  const json = await response.body.json();
  return res.status(200).json(json);
}