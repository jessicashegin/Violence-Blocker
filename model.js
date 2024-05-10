// model.js

// Load the TensorFlow.js model
async function loadModel() {
    const model = await tf.loadGraphModel('savedmodelfolder/model.json');
    return model;
}
