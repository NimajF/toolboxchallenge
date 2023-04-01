import fetch from "node-fetch";

export async function getData(req, res) {
  try {
    const fileName = req.query.fileName;
    const response = await fetch(
      "https://echo-serv.tbxnet.com/v1/secret/files",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer aSuperSecretKey",
        },
      }
    );
    const data = await response.json();
    const { files } = data;
    let obj = {};
    for (let file of files) {
      const response2 = await fetch(
        `https://echo-serv.tbxnet.com/v1/secret/file/${file}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer aSuperSecretKey",
          },
        }
      );
      let jsonResponse = await response2.text();
      let lines = jsonResponse.split("\n");
      let formattedLines = lines.map((row) => row.split(",")).slice(1);

      for (let elem of formattedLines) {
        if (
          elem.length === 4 &&
          !isNaN(elem[2]) &&
          elem.every((item) => item !== null && item !== "")
        ) {
          if (!obj[elem[0]]) {
            obj[elem[0]] = [];
          }
          let lineObj = {};
          lineObj = {
            text: elem[1],
            number: parseInt([elem[2]]),
            hex: elem[3],
          };
          obj[elem[0]].push(lineObj);
        }
      }
    }
    const allFiles = Object.entries(obj).map(([file, lines]) => ({
      file,
      lines,
    }));

    if (fileName) {
      const file = allFiles.find((item) => item.file === fileName);
      if (!file)
        return res.status(500).json({ message: `Can't download ${fileName}` });
      return res.status(200).json([file]);
    }

    res.status(200).json(allFiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
}

export async function getFilesList(req, res) {
  try {
    const response = await fetch(
      `https://echo-serv.tbxnet.com/v1/secret/files`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer aSuperSecretKey",
        },
      }
    );
    let jsonResponse = await response.json();
    res.status(200).json(jsonResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
}
