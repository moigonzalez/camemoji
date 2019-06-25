# camemoji 😄🙂😐🙁🙁😡

## Demo

![camemoji demo](demo/camemoji_demo.mp4 "camemoji demo")

Experimental project that uses [Google Cloud Vidion API](https://cloud.google.com/) in nodejs to recognize faces' emotions and map these results to emojis.

## How it works

Uses firebase to upload pictures from the webcam and Vision API to get a result of the emotion.

Currently the emotion mappers looks like this:

```
"NORMAL": "😐",
"HAPPY": "🙂",
"VERY_HAPPY": "😄",
"SAD": "🙁",
"VERY_SAD": "😭",
"ANGRY": "😠",
"VERY_ANGRY": "😡",
"SURPRISED": "😮",
"HEADWEAR": "🤠"
```

## Running the project

### Google Vision API

To run this project you'll need to set up a [Google Vision Credential](https://cloud.google.com/vision/docs/quickstart-client-libraries#client-libraries-install-nodejs) account, enable the API, create the authentication file and add it in your root project called `auth.json`.

### Firebase

Additionally, for file upload I set up a firebase project for storage, you'll need the `API Key`and the `Storage Bucket` in a `firebase_auth.js` file in the root of the project.

