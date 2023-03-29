const https = require("https");
const { URL } = require("url");

exports.handler = async (event, context) => {
  const payload = JSON.stringify({
    text: `Issue Created: ${event.issue.html_url}`,
  });

  const slackUrl = new URL(process.env.SLACK_URL);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(payload),
    },
    hostname: slackUrl.hostname,
    path: slackUrl.pathname,
    protocol: slackUrl.protocol,
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        resolve(data);
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.write(payload);
    req.end();
  });
};
