// script.js

// Function to handle image classification
async function classifyImage() {
    const imageInput = document.getElementById('imageInput');
    const resultDiv = document.getElementById('result');

    // Check if an image is selected
    if (imageInput.files.length === 0) {
        resultDiv.innerText = 'Please select an image.';
        return;
    }

    // Load the TensorFlow.js model
    const model = await loadModel();

    // Read and preprocess the selected image
    const imageFile = imageInput.files[0];
    const imageElement = document.createElement('img');
    const reader = new FileReader();
    reader.onload = async function(event) {
        imageElement.src = event.target.result;

        // Resize and normalize the image
        const imageTensor = tf.browser.fromPixels(imageElement)
            .resizeNearestNeighbor([224, 224]) // Resize to match the input size of the model
            .toFloat()
            .div(255) // Normalize pixel values to [0, 1]

        // Expand dimensions to create a batch of 1
        const inputTensor = imageTensor.expandDims();

        // Perform inference
        const predictions = await model.predict(inputTensor).data();

        // Display results
        const result = predictions[0] > 0.5 ? 'Violent' : 'Non-Violent';
        resultDiv.innerText = `Prediction: ${result} (${(predictions[0] * 100).toFixed(2)}% confidence)`;

        // Clean up
        imageTensor.dispose();
    };
    reader.readAsDataURL(imageFile);
}
