let essentia;

// EssentiaWASM().then( async function(EssentiaWasm) {
//     essentia = new Essentia(EssentiaWasm);
//     // prints version of the essentia wasm backend
//     console.log(essentia.version)
//     // add your custom audio feature extraction callbacks here
//     const audioCtx = new AudioContext();
//
//     let audioURL = "https://p.scdn.co/mp3-preview/c50acc8cbe44aedbb55dd54345d357aae70f5236?cid=774b29d4f13844c495f206cafdad9c86";
//     const audioBuffer = await essentia.getAudioBufferFromURL(audioURL, audioCtx);
//     const inputSignalVector = essentia.arrayToVector(audioBuffer.getChannelData(0));
//
//     let outputRG = essentia.ReplayGain(inputSignalVector, // input
//         44100); // sampleRate (parameter optional)
//
//
//     console.log(outputRG.replayGain);
// });

const audioCtx = new (AudioContext || new webkitAudioContext())();

// model variables
const modelURL = "./msd-musicnn-1/model.json";
let extractor = null;
let musicnn = new EssentiaModel.TensorflowMusiCNN(tf, modelURL, true);

// get audio track URL
let audioURL = "https://p.scdn.co/mp3-preview/c50acc8cbe44aedbb55dd54345d357aae70f5236?cid=774b29d4f13844c495f206cafdad9c86";

window.onload = () => {
    // load Essentia WASM backend
    EssentiaWASM().then(wasmModule => {
        extractor = new EssentiaModel.EssentiaTFInputExtractor(wasmModule, "musicnn", false);
        // fetch audio and decode, then analyse
        extractor.getAudioBufferFromURL(audioURL, audioCtx).then(analyse);
    });
};

// analyse on click
async function analyse(buffer) {
    console.log(buffer);
    // const audioData = await extractor.downsampleAudioBuffer(buffer);
    // const features = await extractor.computeFrameWise(audioData, 256);
    // await musicnn.initialize();
    // const predictions = await musicnn.predict(features, true);
    //
    // // creates a new div to display the predictions and appends to DOM
    // console.log(predictions);
}
