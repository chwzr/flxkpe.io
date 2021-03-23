import { v4 as uuid } from 'uuid';
import fs from 'fs';
import path from 'path';
import session from '@/lib/session';

const root = process.cwd();

export default async (req, res) => {
  session(req, res);
  let {title, summary, category, url, content, id} = req.body

  let post = `---
title: '${title}'
publishedAt: '${new Date().toISOString()}'
summary: '${summary}'
category: '${category}'
type: ${content ? 'article' : 'link'}
url: '${url}'
---
${content ? content : ''}
  `

  if (!id) {
    id = uuid()
  }
  // if not hosting on vercel, you can use localstorage, beware of needing backups of you server then ;)
  // fs.writeFileSync(path.join(root, 'data', 'blog', `${id}.mdx`), post)
  
  // use github api to post into my repo (Y)
  // https://docs.github.com/en/rest/reference/repos#create-or-update-file-contents
  // req.session.accessToken

  // /repos/{owner}/{repo}/contents/{path}

  // parameter
  // content base64
  // message string 

  let buff = Buffer.from(post, 'utf-8');
  const base64 = buff.toString('base64');


  const commitFile = await (
    await fetch(`https://api.github.com/repos/chwzr/flxkpe.io/contents/data/blog/${id}.mdx`, {
      method: 'PUT',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Authorization: `token ${req.session.accessToken}`,
        Accept: 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
        content: base64,
        message: `Create ${id}.mdx Article`
      })
    })
  ).json();


  return res.status(200).json({ id: commitFile });
};

