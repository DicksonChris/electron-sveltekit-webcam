<script>
  import { onMount } from 'svelte';

  // Declare a reactive array to store the webcam devices and streams
  let webcams = [];

  // Define a function to start a webcam stream with a given device
  const startWebcamStream = (webcamDevice) => {
    // Define the constraints for the stream
    const constraints = {
      audio: false,
      video: {
        optional: [{ sourceId: webcamDevice.deviceId }]
      },
      deviceId: {
        exact: webcamDevice.deviceId
      },
    };

    // Request the user media and handle the callbacks
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        // Add the device and stream to the webcams array
        webcams = [
          ...webcams,
          {
            device: webcamDevice,
            stream,
          },
        ];
      })
      .catch((error) => {
        if (error.name === 'NotAllowedError') {
          console.warn('Access to camera is denied.');
        } else if (error.name === 'NotFoundError') {
          console.warn('No camera with the specified constraints was found.');
        } else {
          console.error(error);
        }
      });
  };

  // Run this code when the component mounts
  onMount(() => {
    // Get the webcam devices and filter by video input
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => devices.filter((device) => device.kind === 'videoinput'))
      .then((webcamDevices) =>
        // Start a stream for each webcam device
        webcamDevices.forEach((webcamDevice) => startWebcamStream(webcamDevice))
      );
  });

  // Define a custom directive that sets the srcObject property
  function srcObject(node, stream) {
    node.srcObject = stream;
    return {
      update(stream) {
        node.srcObject = stream;
      },
    };
  }

  // Define an array of IDs that you want to display
  const ids = [
    "fbd5c60da03194f27cc47ba0f8a7672b7de0f827c4630cc90f81ef812209d29a",
    "26e2e40b9f5be81ed5d3355883da7563a31dccb7f1b7558ea1bdd948aa9b3543"
  ];

  // Define a filter function that returns true if the webcam ID matches one of the ids
  const filterById = (webcam) => ids.includes(webcam.device.deviceId);
</script>

<div id="right">
  <!-- Use the filter function here -->
  {#each webcams.filter(filterById) as webcam}
    <div>
      LABEL = "{webcam.device.label}"<br />
      ID = "{webcam.device.deviceId}"
    </div>
    <!-- Use the custom directive here -->
    <video autoplay={true} use:srcObject={webcam.stream}></video>
  {/each}
</div>