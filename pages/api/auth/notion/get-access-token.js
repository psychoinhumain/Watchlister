export default function handler(req, res) {
  if (req.method === "POST" && req.body.code) {
    fetch(`https://api.notion.com/v1/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
          `${process.env.NOTION_OAUTH_CLIENT_TOKEN}:${process.env.NOTION_INTEGRATION_SECRET}`
        ).toString("base64")}`,
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code: req.body.code,
        redirect_uri: `${process.env.APPLICATION_URL}/auth/notion/callback`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        res.status(200).json(data);
      });
  }
}
