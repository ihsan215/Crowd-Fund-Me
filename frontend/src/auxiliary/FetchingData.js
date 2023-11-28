const TIMEOUT_SECONDS = 10;

const timeout = function (s) {
  // Return timeout Promise
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, TIMEOUT_SECONDS * 1000);
  });
};

export const AJAXCall = async (url, config) => {
  try {
    // 1) Make AJAX call with timeout
    const response = await Promise.race([
      fetch(url, config),
      timeout(TIMEOUT_SECONDS),
    ]);

    // 2) Check response is valid
    if (!response) throw new Error(`An error occuring fetching data !`);

    console.log("response : ", response);
    // 3) Get data as json format
    const data = await response.json();

    // 4) Return data
    return data;
  } catch (err) {
    // 1) Return error
    throw err;
  }
};
