import express from "express";
import { z } from "zod";

const app = express();

const OWNER = "abstractalgo";
const REPO = "nodebook";
const Config = {
  PORT: z.string().parse(process.env.PORT),
  GITHUB_APP_CLIENT_ID: z.string().parse(process.env.GITHUB_APP_CLIENT_ID),
  GITHUB_APP_CLIENT_SECRET: z
    .string()
    .parse(process.env.GITHUB_APP_CLIENT_SECRET),
};

app.get("/", (req, res) => {
  res.send("fuck yeah 2");
});

app.get("/callback", async (req, res) => {
  const requestUrl = new URL(req.protocol + req.headers.host + req.originalUrl);
  const code = requestUrl.searchParams.get("code");

  if (!code) {
    res.status(400).send(`No 'code' was provided`);
    return;
  }

  // get access token
  const authUrl = new URL("https://github.com/login/oauth/access_token");
  authUrl.searchParams.append("client_id", Config.GITHUB_APP_CLIENT_ID);
  authUrl.searchParams.append("client_secret", Config.GITHUB_APP_CLIENT_SECRET);
  authUrl.searchParams.append("code", code);
  const accessToken = (await (await fetch(authUrl)).text())
    .split("&")
    .filter((c) => c.startsWith("access_token"))[0]
    .replace("access_token=", "");

  const ghHeaders = {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${accessToken}`,
    "X-GitHub-Api-Version": "2022-11-28",
  };

  // get the last commit
  const lastCommitSha = (
    await (
      await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/commits`, {
        method: "GET",
        headers: ghHeaders,
      })
    ).json()
  )[0].sha;

  console.log({ lastCommitSha });

  // {
  //   // create a branch
  //   const createBranchRes = await fetch(
  //     `https://api.github.com/repos/${OWNER}/${REPO}/git/refs`,
  //     {
  //       method: "POST",
  //       headers: ghHeaders,
  //       body: JSON.stringify({
  //         ref: "refs/heads/tete",
  //         sha: lastCommit.sha,
  //       }),
  //     }
  //   );

  //   console.log(await createBranchRes.json());
  // }

  {
    // create a commit
    const createCommit = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/git/trees`,
      {
        method: "POST",
        headers: ghHeaders,
        body: JSON.stringify({
          base_tree: lastCommitSha,
          tree: [
            {
              path: "README.md",
              mode: "100644",
              type: "blob",
              content: "new content",
            },
          ],
        }),
      }
    );

    console.log(await createCommit.json());
  }

  // const ress = await fetch(
  //   `https://api.github.com/repos/${OWNER}/${REPO}/pulls`,
  //   {
  //     method: "POST",
  //     headers: ghHeaders
  //     body: JSON.stringify({
  //       title: "Amazing new feature",
  //       body: "Please pull these awesome changes in!",
  //       head: "octocat:new-feature",
  //       base: "master",
  //     }),
  //   }
  // );

  // console.log(ress);

  res.send("bla");
});

app.listen(parseInt(Config.PORT), () => {
  console.log(`🎧 Listening on port ${Config.PORT}...`);
});
