import fetch from 'node-fetch';

const returnClarifaiRequestOptions = (imageUrl) => {
  const PAT = "f6bb83b5c5c54ba3855e967dd2ba1590";
  const USER_ID = "qt77gjkvqeg9";
  const APP_ID = "face-recognition-app";
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };

  return requestOptions;
};

export const handleApiCall = (req, res) => {
  fetch(
    "https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs",
    returnClarifaiRequestOptions(req.body.input)
  )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("unable to work with API"));
};

export const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0].entries);
    })
    .catch((err) => res.status(400).json("unable to get entries"));
};