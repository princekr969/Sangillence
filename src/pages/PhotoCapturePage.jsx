import { useState, useRef, useEffect } from 'react';
import { Camera, Link as LinkIcon, CheckCircle, Loader2 } from 'lucide-react';
// import { initializeGoogleDrive, requestGoogleDrivePermission, uploadToGoogleDrive } from '../lib/googleDrive';

export default function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedLink, setUploadedLink] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      try {
        await initializeGoogleDrive();
        setIsInitialized(true);
      } catch (err) {
        setError('Failed to initialize Google Drive. Please refresh the page.');
      }
    };
    init();
  }, []);

  const requestPermissions = async () => {
    if (!isInitialized) {
      setError('Google Drive is still initializing. Please wait.');
      return;
    }

    try {
      setError(null);
      await requestGoogleDrivePermission();
      setPermissionGranted(true);
      await startCamera();
    } catch (err) {
      setError('Failed to get Google Drive permission. Please try again.');
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
        setError(null);
      }
    } catch (err) {
      setError('Unable to access camera. Please check browser permissions.');
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const file = new File([blob], `capture-${Date.now()}.jpg`, {
                type: 'image/jpeg',
              });
              setImageFile(file);
              setSelectedImage(canvas.toDataURL('image/jpeg'));
              stopCamera();
              setUploadedLink(null);
            }
          },
          'image/jpeg'
        );
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return;

    setIsUploading(true);
    setError(null);

    try {
      const driveLink = await uploadToGoogleDrive(imageFile);
      setUploadedLink(driveLink);
      await sendToBackend(driveLink);
    } catch (err) {
      setError('Failed to upload image to Google Drive');
    } finally {
      setIsUploading(false);
    }
  };

  const sendToBackend = async (imageUrl) => {
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl }),
      });

      if (!response.ok) {
        console.warn('Backend notification failed');
      }
    } catch (err) {
      console.warn('Failed to notify backend:', err);
    }
  };

  const copyToClipboard = async () => {
    if (uploadedLink) {
      await navigator.clipboard.writeText(uploadedLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  const reset = () => {
    setSelectedImage(null);
    setImageFile(null);
    setUploadedLink(null);
    setError(null);
    stopCamera();
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
        <h1 className="text-3xl font-bold text-white">Camera Capture</h1>
        <p className="text-blue-100 mt-2">Capture a photo and upload to Google Drive</p>
      </div>

      <div className="p-8">
        {!permissionGranted && !isCameraActive && (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
              <p className="text-sm text-blue-800">
                This app needs permission to access your camera and Google Drive to capture and
                store photos.
              </p>
            </div>
            <button
              onClick={requestPermissions}
              disabled={!isInitialized}
              className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 px-6 rounded-xl transition-colors"
            >
              <Camera className="w-5 h-5" />
              {isInitialized ? 'Grant Permissions & Start Camera' : 'Initializing...'}
            </button>
          </div>
        )}

        {permissionGranted && !selectedImage && !isCameraActive && (
          <button
            onClick={startCamera}
            className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors"
          >
            <Camera className="w-5 h-5" />
            Open Camera
          </button>
        )}

        {isCameraActive && (
          <div className="space-y-4">
            <div className="relative rounded-xl overflow-hidden bg-black">
              <video ref={videoRef} autoPlay playsInline className="w-full" />
            </div>
            <div className="flex gap-3">
              <button
                onClick={captureImage}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
              >
                Capture Photo
              </button>
              <button
                onClick={stopCamera}
                className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {selectedImage && (
          <div className="space-y-6">
            <div className="relative rounded-xl overflow-hidden border-2 border-gray-200">
              <img src={selectedImage} alt="Captured" className="w-full h-auto" />
            </div>

            {!uploadedLink && (
              <button
                onClick={uploadImage}
                disabled={isUploading}
                className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 px-6 rounded-xl transition-colors"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Uploading to Google Drive...
                  </>
                ) : (
                  <>
                    <Camera className="w-5 h-5" />
                    Upload to Google Drive
                  </>
                )}
              </button>
            )}

            {uploadedLink && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-green-600 font-semibold">
                  <CheckCircle className="w-5 h-5" />
                  Uploaded to Google Drive successfully!
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Google Drive Link
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={uploadedLink}
                      readOnly
                      className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                    />
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <LinkIcon className="w-4 h-4" />
                      {linkCopied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={reset}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              Capture Another Photo
            </button>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
            {error}
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}
