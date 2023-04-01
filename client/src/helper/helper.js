export async function fetchList() {
  try {
    const response = await fetch(`http://localhost:8080/api/files/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const jsonResponse = await response.json();
    const { files } = jsonResponse;
    return files;
  } catch (err) {
    return { err: "Error en la lista" };
  }
}

export async function fetchData(fileName) {
  try {
    let response = "";
    let jsonResponse = "";
    if (fileName) {
      response = await fetch(
        `http://localhost:8080/api/files/data?fileName=${fileName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      jsonResponse = await response.json();
    } else {
      response = await fetch(`http://localhost:8080/api/files/data`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      jsonResponse = await response.json();
    }
    console.log(jsonResponse);
    return jsonResponse;
  } catch (err) {
    return { err: "Error al descargar archivos" };
  }
}
