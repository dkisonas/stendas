export function initializeWebcam() {
    const webcamContainer = document.getElementById('webcam-container');
    if (!webcamContainer) {
        return;
    }

    const video = document.getElementById('video') as HTMLVideoElement;
    const photo = document.getElementById('photo') as HTMLImageElement;
    const startButton = document.getElementById('startbutton') as HTMLButtonElement;
    const countdownElement = document.getElementById('countdown') as HTMLElement;
    const webcamImageElement = document.getElementById('webcam_image') as HTMLInputElement;

    const width = 640;
    let height = 0;
    let stream: MediaStream | null = null;

    photo.style.display = 'none';

    const handleError = (err: any) => {
        console.error("An error occurred: " + err);
    };

    const setupWebcamStream = (mediaStream: MediaStream) => {
        stream = mediaStream;
        video.srcObject = stream;
        video.play();
    };

    const setVideoDimensions = () => {
        if (!height) {
            height = video.videoHeight / (video.videoWidth / width);
            video.setAttribute('width', width.toString());
            video.setAttribute('height', height.toString());
        }
    };

    const startCountdown = (seconds: number, callback: () => void) => {
        countdownElement.style.display = 'block';
        let remainingSeconds = seconds;
        countdownElement.innerText = remainingSeconds.toString();

        const interval = setInterval(() => {
            remainingSeconds -= 1;
            countdownElement.innerText = remainingSeconds.toString();

            if (remainingSeconds <= 0) {
                clearInterval(interval);
                countdownElement.style.display = 'none';
                callback();
            }
        }, 1000);
    };

    const takePicture = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
        context!.drawImage(video, 0, 0, width, height);
        const data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
        photo.style.display = 'block';
        webcamImageElement.value = data;
    };

    const stopWebcamStream = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    };

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(setupWebcamStream)
        .catch(handleError);

    video.addEventListener('canplay', setVideoDimensions, false);
    startButton.addEventListener('click', (ev) => {
        ev.preventDefault();
        startCountdown(10, takePicture);
    }, false);

    window.addEventListener('beforeunload', stopWebcamStream);
}