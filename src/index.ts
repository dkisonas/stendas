import {initializeWebcam} from "./lib/webcam";
import {initializeWeather} from "./lib/weather";

document.addEventListener('DOMContentLoaded', async () => {
    await initializeWeather();
    initializeWebcam();
});