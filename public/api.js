import { NextApiRequest, NextApiResponse } from "next";

const updateJson = async (req: NextApiRequest, res: NextApiResponse) => {
  const jsonData = req.body;
  const octokit = new Octokit({
    baseUrl: "https://api.github.com/",
    accessToken: "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"
  });

  const fileName = "db.json";
  const branch = "main";

  try {
    const response = await octokit.repos.createOrUpdateFile({
      owner: "mendsxyz",
      repo: "vern-db",
      path: fileName,
      message: `Update ${fileName}`,
      content: Buffer.from(JSON.stringify(jsonData)).toString("base64"),
      branch: branch
    });

    console.log(`File ${fileName} updated successfully`);
    res.status(200).json({ message: `File ${fileName} updated successfully` });
  } catch (error) {
    console.error(`Error updating file ${fileName}: ${error.message}`);
    res.status(500).json({ message: `Error updating file ${fileName}: ${error.message}` });
  }
};

export default updateJson;