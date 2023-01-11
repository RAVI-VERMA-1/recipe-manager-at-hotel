import { TIMEOUT_SEC, API_KEY } from './config';

// import { API_URL } from './config';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} seconds`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([
      fetchPro, // 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
      timeout(TIMEOUT_SEC),
    ]);
    // console.log(res);
    const data = await res.json();

    // console.log(data);

    if (!res.ok) throw new Error(`${data.message} ${res.status}`);

    return data;
  } catch (err) {
    // console.log(err);
    throw err;
  }
};

// export const getJSON = async function (url) {
//   try {
//     const fetchPro = fetch(url);
//     const res = await Promise.race([
//       fetchPro
//       ,
//       timeout(TIMEOUT_SEC),
//     ]);
//     // console.log(res);
//     const data = await res.json();

//     // console.log(data);

//     if (!res.ok) throw new Error(`${data.message} ${res.status}`);

//     return data;
//   } catch (err) {
//     // console.log(err);
//     throw err;
//   }
// };

// export const sendJSON = async function (url, uploadData) {
//   try {
//     const fetchPro = fetch(url,{
//       method:'POST',
//       headers:{
//         'Content-Type':'application/json',
//       },
//       body:JSON.stringify(uploadData),
//     });

//     const res = await Promise.race([
//       fetchPro
//       ,
//       timeout(TIMEOUT_SEC),
//     ]);
//     // console.log(res);
//     const data = await res.json();

//     // console.log(data);

//     if (!res.ok) throw new Error(`${data.message} ${res.status}`);

//     return data;
//   } catch (err) {
//     // console.log(err);
//     throw err;
//   }

// };
