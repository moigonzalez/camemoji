const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

app.use(cors());
app.options('*', cors());

app.get('/', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  console.log(req.query.filename);

  const [result] = await client.faceDetection(req.query.filename);

  console.log(result);

  const face = result.faceAnnotations[0];

  const json = {
    joyLikelihood: face.joyLikelihood,
    sorrowLikelihood: face.sorrowLikelihood,
    angerLikelihood: face.angerLikelihood,
    surpriseLikelihood: face.surpriseLikelihood,
    blurredLikelihood: face.blurredLikelihood,
    headwearLikelihood: face.headwearLikelihood
  }


  res.json(json);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));