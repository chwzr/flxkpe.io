import session from '@/lib/session';

const CLIENT_ID = process.env.OAUTH_CLIENT_KEY;
const CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;

export default async (req, res) => {
  session(req, res);

  const { code } = req.query;

  if (!code) {
    return res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&allow_signup=false&scope=user%20repo`
    );
  }

  try {
    const data = await (
      await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        body: JSON.stringify({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    ).json();

    const accessToken = data.access_token;
    if (accessToken) {
      const userInfo = await (
        await fetch('https://api.github.com/user', {
          method: 'GET',
          withCredentials: true,
          credentials: 'include',
          headers: {
            Authorization: `token ${accessToken}`,
            Accept: 'application/json'
          }
        })
      ).json();

      req.session.login = userInfo.login;
      req.session.email = userInfo.email;
      req.session.accessToken = accessToken;
    } else {
      req.session.login = '';
      req.session.email = '';
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to auth.' });
  }

  return res.redirect('/admin');
};
