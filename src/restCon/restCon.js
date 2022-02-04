async function sendToServer(link, type, data) {
  // When GET request
  let response;
  if (type === requestTypes.GET) {
    var url = new URL(link);
    url.search = new URLSearchParams(data).toString();
    response = await fetch(url.href, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "multipart/form-data",
      },
    });
  }

  // When POST, PUT OR DELETE
  else {
    var headers = null;
    headers = {
      "Access-Control-Allow-Origin": "*",
    };
    response = await fetch(link, {
      method: type,
      headers: headers,
      body: JSON.stringify(data),
    });
    console.log("restapi check");
    console.log(response);
  }
  return response;
}

/* ------------------------------------------ */
export const requestTypes = Object.freeze({
  GET: "GET",
  POST: "POST",
});

export async function makeHttpCall(link, type, body) {
  if (typeof link === "string" || link instanceof String) {
    var toReturn = null;
    await sendToServer(link, type, body)
      .then(function (response) {
        toReturn = response;
      })
      .catch(function (error) {
        return error;
      });
    return toReturn;
  }
}

/* ----------------------------------- */
