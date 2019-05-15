import React, { Component } from "react";

import emojiConfig from "./emojiConfig";

class Camera extends Component {

  state = {
    jsonRes: null,
    streaming: false,
    emoji: null,
  };

  takePicture = () => {
    const video = document.getElementById('video');
    const fileName = `${Math.random().toString(36).substring(7)}.jpg`;
    const canvas = document.getElementById('canvas');
    const storageRef = this.props.firebase.storage().ref().child(fileName);
    
    var width = 320;
    const height = video.videoHeight / (video.videoWidth/width);

    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    let context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, 320, 240);
  
    const data = canvas.toDataURL('image/png');

    storageRef.putString(data, 'data_url').then((snapshot) => {
      storageRef.getDownloadURL().then(url => {
        fetch(`http://localhost:3000?filename=${encodeURIComponent(url)}`).then((response) => {
          return response.json();
        }).then((data) => {
          this.setState({
            jsonRes: JSON.stringify(data),
            emoji: this.setCurrentEmoji(data)
          });
        }).catch(() => {
          console.log("Booo");
        });
      });
    })
  }

  setCurrentEmoji = (data) => {
    if (data.headwearLikelihood === "LIKELY" || 
       data.headwearLikelihood === "VERY_LIKELY") {
      return emojiConfig.HEADWEAR;
    } else if (data.joyLikelihood === "LIKELY") {
      return emojiConfig.HAPPY;
    } else if (data.joyLikelihood === "VERY_LIKELY") {
      return emojiConfig.VERY_HAPPY;
    } else if (data.sorrowLikelihood === "POSSIBLE") {
      return emojiConfig.SAD;
    } else if (data.sorrowLikelihood === "LIKELY" ||
          data.sorrowLikelihood === "VERY_LIKELY") {
      return emojiConfig.VERY_SAD;
    } else if (data.angerLikelihood === "LIKELY") {
      return emojiConfig.ANGRY;
    } else if (data.angerLikelihood === "VERY_LIKELY") {
      return emojiConfig.VERY_ANGRY;
    } else if (data.surpriseLikelihood === "LIKELY" || 
               data.surpriseLikelihood === "VERY_LIKELY") {
      return emojiConfig.SURPRISED;
   } else {
     return emojiConfig.NORMAL;
   }
  }

  componentDidMount() {
    var width = 320;
    var height = 0;

    const video = document.getElementById('video');
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then((stream) => {
        video.srcObject = stream;
        video.play();
    })
    .catch(function(err) {
        console.log("An error occurred: " + err);
    });

    video.addEventListener('canplay', (ev) => {
      if (!this.state.streaming) {
        height = video.videoHeight / (video.videoWidth/width);
      
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        this.setState({
          streaming: true
        });
      }
    }, false);
  }

  render() {
    return (<div>
        <div className="camera">
          <video id="video">Video stream not available.</video>
          <button onClick={this.takePicture}>Take photo</button>
        </div>
        <div className="res_container">
          <canvas id="canvas"></canvas>
          <div className="json_container">{this.state.jsonRes}</div>
          <div className="emoji_container">{this.state.emoji}</div>
        </div>
    </div>);
  }
};

export default Camera;