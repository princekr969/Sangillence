import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Camera, RotateCcw, Download, X, CheckCircle, AlertCircle } from 'lucide-react';

const PhotoCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [facingMode, setFacingMode] = useState('environment');
  const [deviceSupport, setDeviceSupport] = useState(null);

  // Check for device support
  useEffect(() => {
    const checkSupport = () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setDeviceSupport(false);
        setError('Camera not supported on this device/browser');
        return;
      }
      
      // Check if we're on HTTPS or localhost
      const isSecureContext = window.isSecureContext || 
                             window.location.hostname === 'localhost' || 
                             window.location.hostname === '127.0.0.1';
      
      if (!isSecureContext) {
        setDeviceSupport(false);
        setError('Camera requires HTTPS or localhost');
        return;
      }
      
      setDeviceSupport(true);
    };

    checkSupport();
  }, []);

  const startCamera = useCallback(async () => {
    if (!deviceSupport) return;
    
    setIsLoading(true);
    setError(null);

    try {
      // Try with specific constraints first
      let constraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1280, max: 1920 },
          height: { ideal: 720, max: 1080 }
        }
      };

      let mediaStream;
      
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch (err) {
        // Fallback to basic constraints if specific ones fail
        console.warn('Falling back to basic camera constraints');
        constraints = {
          video: {
            facingMode: facingMode
          }
        };
        mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      }

      setStream(mediaStream);
      
      // Ensure video element is ready before setting srcObject
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        
        // Wait for video to be ready
        const video = videoRef.current;
        video.onloadedmetadata = () => {
          video.play().catch(e => console.error('Error playing video:', e));
        };
      }
      
    } catch (err) {
      console.error('Error accessing camera:', err);
      
      // Provide specific error messages
      let errorMessage = 'Unable to access camera';
      
      if (err.name === 'NotAllowedError') {
        errorMessage = 'Camera permission denied. Please allow camera access and try again.';
      } else if (err.name === 'NotFoundError') {
        errorMessage = 'No camera found on this device.';
      } else if (err.name === 'NotReadableError') {
        errorMessage = 'Camera is already in use by another application.';
      } else if (err.name === 'OverconstrainedError') {
        errorMessage = 'Camera constraints not supported. Trying basic mode...';
        // Try again with minimal constraints
        setTimeout(() => {
          setFacingMode('user');
          startCamera();
        }, 1000);
        return;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [facingMode, deviceSupport]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => {
        track.stop();
      });
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, [stream]);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) {
      setError('Video or canvas not available');
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) {
      setError('Canvas context not available');
      return;
    }

    // Check if video is ready and has dimensions
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      setError('Video not ready. Please wait for the camera to load completely.');
      return;
    }

    // Check if video is actually playing
    if (video.paused || video.ended) {
      setError('Video is not playing. Please ensure camera is active.');
      return;
    }

    try {
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Clear canvas first
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Verify that something was drawn
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const isEmpty = imageData.data.every(pixel => pixel === 0);
      
      if (isEmpty) {
        throw new Error('Captured image is empty');
      }

      // Convert canvas to image data URL with high quality
      const imageDataUrl = canvas.toDataURL('image/png');
      
      // Double check the data URL is valid
      if (!imageDataUrl || imageDataUrl === 'data:,' || imageDataUrl.length < 100) {
        throw new Error('Failed to generate image data');
      }
      
      console.log('Image captured successfully:', {
        width: canvas.width,
        height: canvas.height,
        dataUrlLength: imageDataUrl.length
      });
      
      setCapturedImage(imageDataUrl);
      stopCamera();
    } catch (err) {
      console.error('Error capturing photo:', err);
      setError(`Failed to capture photo: ${err.message}. Please try again.`);
    }
  }, [stopCamera]);

  const retakePhoto = useCallback(() => {
    setCapturedImage(null);
    setError(null);
    startCamera();
  }, [startCamera]);

  const downloadPhoto = useCallback(() => {
    if (!capturedImage) return;

    try {
      const link = document.createElement('a');
      link.download = `photo-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.jpg`;
      link.href = capturedImage;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error downloading photo:', err);
      setError('Failed to download photo');
    }
  }, [capturedImage]);

  const switchCamera = useCallback(async () => {
    const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(newFacingMode);
    
    if (stream) {
      stopCamera();
      // Small delay to ensure camera is properly released
      setTimeout(() => {
        startCamera();
      }, 300);
    }
  }, [facingMode, stream, stopCamera, startCamera]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  if (deviceSupport === false) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8">
              <AlertCircle size={64} className="mx-auto mb-4 text-red-500" />
              <h2 className="text-xl font-semibold text-red-800 mb-2">Camera Not Available</h2>
              <p className="text-red-600">{error}</p>
              {!window.isSecureContext && (
                <p className="text-red-600 mt-2 text-sm">
                  Try accessing this page via HTTPS or localhost
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">📸 Photo Capture</h1>
          <p className="text-gray-600">Take photos using your device camera</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Camera Controls */}
          <div className="p-4 bg-gray-50 border-b">
            <div className="flex flex-wrap gap-3 justify-center">
              {!stream && !capturedImage && (
                <button
                  onClick={startCamera}
                  disabled={isLoading || !deviceSupport}
                  className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-sm"
                >
                  <Camera size={20} className="mr-2" />
                  {isLoading ? 'Starting Camera...' : 'Start Camera'}
                </button>
              )}

              {stream && !capturedImage && (
                <>
                  <button
                    onClick={capturePhoto}
                    className="flex items-center px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 font-medium shadow-sm text-lg"
                  >
                    <Camera size={24} className="mr-2" />
                    📸 Capture Photo
                  </button>

                  <button
                    onClick={switchCamera}
                    className="flex items-center px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 font-medium shadow-sm"
                  >
                    <RotateCcw size={20} className="mr-2" />
                    Switch Camera
                  </button>

                  <button
                    onClick={stopCamera}
                    className="flex items-center px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-medium shadow-sm"
                  >
                    <X size={20} className="mr-2" />
                    Stop Camera
                  </button>
                </>
              )}

              {capturedImage && (
                <>
                  <button
                    onClick={retakePhoto}
                    className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium shadow-sm"
                  >
                    <RotateCcw size={20} className="mr-2" />
                    Retake Photo
                  </button>

                  <button
                    onClick={downloadPhoto}
                    className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 font-medium shadow-sm"
                  >
                    <Download size={20} className="mr-2" />
                    💾 Download Photo
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Status Messages */}
          {error && (
            <div className="p-4 bg-red-50 border-b">
              <div className="flex items-center justify-center text-red-800">
                <AlertCircle size={20} className="mr-2" />
                <span className="font-medium">{error}</span>
              </div>
            </div>
          )}

          {/* Camera/Photo Display Area */}
          <div className="relative bg-black min-h-[400px] flex items-center justify-center">
            {isLoading && (
              <div className="text-center p-8">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4"></div>
                <p className="text-white text-lg">Starting camera...</p>
                <p className="text-gray-400 text-sm mt-2">Please allow camera permissions if prompted</p>
              </div>
            )}

            {!stream && !capturedImage && !error && !isLoading && deviceSupport && (
              <div className="text-center p-8">
                <Camera size={80} className="mx-auto mb-6 text-gray-400" />
                <p className="text-gray-400 text-xl mb-2">Ready to take photos!</p>
                <p className="text-gray-500">Click "Start Camera" to begin</p>
              </div>
            )}

            {/* Video Stream */}
            {stream && !capturedImage && (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-auto max-h-[70vh] object-contain rounded"
              />
            )}

            {/* Captured Image */}
            {capturedImage && (
              <div className="relative w-full flex justify-center">
                <img
                  src={capturedImage}
                  alt="Captured Photo"
                  className="max-w-full max-h-[70vh] object-contain rounded shadow-lg"
                  onLoad={() => console.log('Image loaded successfully')}
                  onError={(e) => {
                    console.error('Image failed to load:', e);
                    setError('Failed to display captured image');
                  }}
                  style={{
                    display: 'block',
                    backgroundColor: '#f3f4f6'
                  }}
                />
                <div className="absolute top-4 right-4 bg-green-500 text-white p-3 rounded-full animate-pulse shadow-lg">
                  <CheckCircle size={28} />
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white px-4 py-2 rounded-full text-sm">
                  ✨ Photo captured successfully!
                </div>
              </div>
            )}

            {/* Camera Facing Mode Indicator */}
            {stream && (
              <div className="absolute top-4 left-4 bg-black bg-opacity-75 text-white px-4 py-2 rounded-full text-sm font-medium">
                📷 {facingMode === 'user' ? 'Front Camera' : 'Back Camera'}
              </div>
            )}
          </div>

          {/* Hidden Canvas for Photo Capture */}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Debug Info - Remove in production */}
        {capturedImage && (
          <div className="mt-4 p-4 bg-gray-100 rounded text-sm text-gray-600">
            <strong>Debug Info:</strong> Image captured - Data URL length: {capturedImage.length} characters
            <br />
            <strong>Image preview:</strong> 
            <div className="mt-2 p-2 bg-white rounded border max-h-20 overflow-hidden">
              <code className="text-xs break-all">{capturedImage.substring(0, 100)}...</code>
            </div>
          </div>
        )}
        <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
            <Camera className="mr-2" size={20} />
            How to use:
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-3 text-blue-800">
              <li className="flex items-start">
                <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
                Click "Start Camera" to access your device's camera
              </li>
              <li className="flex items-start">
                <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
                Allow camera permissions when prompted by your browser
              </li>
            </ul>
            <ul className="space-y-3 text-blue-800">
              <li className="flex items-start">
                <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
                Use "Switch Camera" to toggle between front/back cameras
              </li>
              <li className="flex items-start">
                <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</span>
                Click "Capture Photo" when ready, then download or retake
              </li>
            </ul>
          </div>
          
          <div className="mt-4 p-4 bg-blue-100 rounded border border-blue-300">
            <p className="text-blue-900 text-sm">
              <strong>💡 Tip:</strong> Make sure you're using HTTPS or localhost, and grant camera permissions when prompted. 
              If you're having issues, try refreshing the page and allowing permissions again.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoCapture;