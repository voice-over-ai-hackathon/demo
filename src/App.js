import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './App.css';

import play from './play.svg';
import stop from './pause.svg';

import WaveSurfer from 'wavesurfer.js'

const audioFile = 'http://ibd-backend.datah-route-b0wnj1b639re-1206570512.eu-west-1.convox.site/static/wav/too2.wav';

const conceptToEmojiImage = {
    undefined: "http://1x1px.me/FF4D00-0.png",
    null: "http://1x1px.me/FF4D00-0.png",
    false: "http://1x1px.me/FF4D00-0.png",
    "calm": "http://ibd-backend.datah-route-b0wnj1b639re-1206570512.eu-west-1.convox.site/static/emoji/calm.png",
    "happy": "http://ibd-backend.datah-route-b0wnj1b639re-1206570512.eu-west-1.convox.site/static/emoji/happy.png",
    "sad": "http://ibd-backend.datah-route-b0wnj1b639re-1206570512.eu-west-1.convox.site/static/emoji/sad.png",
    "angry": "http://ibd-backend.datah-route-b0wnj1b639re-1206570512.eu-west-1.convox.site/static/emoji/angry.png",
    "fearful": "http://ibd-backend.datah-route-b0wnj1b639re-1206570512.eu-west-1.convox.site/static/emoji/fearful.png",
    "neutral": "http://ibd-backend.datah-route-b0wnj1b639re-1206570512.eu-west-1.convox.site/static/emoji/neutral.png",
    "informationQuery": "http://ibd-backend.datah-route-b0wnj1b639re-1206570512.eu-west-1.convox.site/static/emoji/getting_information2.png",
    "pickupCollection": "http://ibd-backend.datah-route-b0wnj1b639re-1206570512.eu-west-1.convox.site/static/emoji/collecting.png",
    "delivery": "http://ibd-backend.datah-route-b0wnj1b639re-1206570512.eu-west-1.convox.site/static/emoji/delivery.png",
    "business": "http://ibd-backend.datah-route-b0wnj1b639re-1206570512.eu-west-1.convox.site/static/emoji/briefcase.png",
    "private": "http://ibd-backend.datah-route-b0wnj1b639re-1206570512.eu-west-1.convox.site/static/emoji/private.png",
    "satisfied": "http://ibd-backend.datah-route-b0wnj1b639re-1206570512.eu-west-1.convox.site/static/emoji/courteous_agent.png",
    "unsatisfied": "http://ibd-backend.datah-route-b0wnj1b639re-1206570512.eu-west-1.convox.site/static/emoji/uncourteous_agent.png",
    "kind": "http://ibd-backend.datah-route-b0wnj1b639re-1206570512.eu-west-1.convox.site/static/emoji/courteous_agent2.png",
    "unkind": "http://ibd-backend.datah-route-b0wnj1b639re-1206570512.eu-west-1.convox.site/static/emoji/uncourteous_agent2.png",
    "": "http://1x1px.me/FF4D00-0.png",
};

const emojis = [
    "happy", "angry", "unsatisfied", "neutral", "unkind", "angry", "calm", "neutral", "satisfied", "unsatisfied", "sad", "fearful", "angry"
];
const tags = [
    "", "", "", "business", "", "", "", "", "", "", "", "", "", ""
];

const styleStr = `
                .playbtn{
                    border-radius : 50%;
                }
                .container {
                    position: relative;
                    display: block;
                    left: 45%
                    width: 200px;
                    height: 100%;
                }

                .pulse-button {

                    position: relative;
                    width: 100px;
                    height: 100px;
                    border: none;
                    box-shadow: 0 0 0 0 rgba(232, 76, 61, 0.7);
                    border-radius: 50%;
                    background-color: #e84c3d;
                    background-image: url(http://ibd-backend.datah-route-b0wnj1b639re-1206570512.eu-west-1.convox.site/static/emoji/briefcase.png);
                    background-size:cover;
                    background-repeat: no-repeat;
                    cursor: pointer;
                    -webkit-animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
                    -moz-animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
                    -ms-animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
                    animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
                }
                    .pulse-button:hover
                    {
                        -webkit-animation: none;-moz-animation: none;-ms-animation: none;animation: none;
                    }

                    @-webkit-keyframes pulse {to {box-shadow: 0 0 0 45px rgba(232, 76, 61, 0);}}
                    @-moz-keyframes pulse {to {box-shadow: 0 0 0 45px rgba(232, 76, 61, 0);}}
                    @-ms-keyframes pulse {to {box-shadow: 0 0 0 45px rgba(232, 76, 61, 0);}}
                    @keyframes pulse {to {box-shadow: 0 0 0 45px rgba(232, 76, 61, 0);}}

`;

class Waveform extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            playing: false,
            secondsElapsed: 0,
        }

    }

    componentDidMount() {
        this.$el = ReactDOM.findDOMNode(this)
        this.$waveform = this.$el.querySelector('.wave')
        this.wavesurfer = WaveSurfer.create({
            container: this.$waveform,
            waveColor: 'purple',
            progressColor: 'orange',
            height: 300,
        });
        this.wavesurfer.load(this.props.src);
        this.wavesurfer.on('audioprocess', (secondsElapsed) => {
            this.onAudioProcess(secondsElapsed - 1.5);
        })
    }

    componentWillUnmount() {

    }

    onAudioProcess(secondsElapsed) {
        if (secondsElapsed < 0) {
            secondsElapsed = 0;
        }
        this.secondsElapsedFull = secondsElapsed;
        this.setState({
            secondsElapsed: Math.round(secondsElapsed),
            emojiIndex: Math.round(secondsElapsed / 5)
        });
    }

    play() {
        this.setState({playing: true});
        this.wavesurfer.play();
    }

    stop() {
        this.setState({playing: false});
        this.wavesurfer.stop();
    }

    render() {
        console.log(this.state.secondsElapsed);
        return (
            <div>
                <style>
                    {styleStr}
                </style>
                <div className='waveform'>
                    <br />
                    <br />
                    <button className='playbtn' onClick={() => {
                        if (this.state.playing) {
                            this.stop();
                        } else {
                            this.play();
                        }
                    }}>
                        <img className='play' src={!this.state.playing ? play : stop} height={50} width={50}/>
                    </button>
                    {/*<button onClick={() => {
                        this.stop()
                    }}>Stop
                    </button>*/}

                </div>
                <div className='wave'></div>
                <div>
                    {this.state.playing ?
                        <div width="100%" align="left">
                            <table border="0">
                                <tr>
                                    <td><img src={"http://1x1px.me/FF4D00-0.8.png"}
                                             width={(((1.0 * this.secondsElapsedFull) / 67.0) * 1812)} height={0}/></td>
                                    <td align="center">
                                        <img src={conceptToEmojiImage[emojis[this.state.emojiIndex]]} width={128}
                                             height={128}/><br/>
                                        <h1>{emojis[this.state.emojiIndex]}</h1>
                                        {/*<img src={conceptToEmojiImage[tags[this.state.emojiIndex]]} width={128} height={128}/><br/>*/}
                                        {/*<h1>{tags[this.state.emojiIndex]}</h1>*/}
                                    </td>
                                </tr>
                            </table>

                        </div>
                        : <div/>}
                </div>
                {tags[this.state.emojiIndex] == "business" ?
                    <div align="center" style={{'marginTop': '70px'}}>
                        <div className="container">
                            <button className="pulse-button"></button>
                        </div>
                        Business
                    </div> : false
                }

            </div>

        )
    }
}

Waveform.defaultProps = {
    src: ""
}


class App extends Component {
    render() {
        return (
            <div className="App">
                <Waveform src={audioFile}/>
            </div>
        );
    }
}

export default App;
