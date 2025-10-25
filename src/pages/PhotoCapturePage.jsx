import { useState, useRef, useEffect } from 'react';
import { Camera, RefreshCw, X, Upload, Save, AlertCircle } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

function PhotoCapture() {
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState('user');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const { studentId } = useParams();
  const navigate = useNavigate();

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Fetch student data on component mount
  const fetchStudentData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://sayaah.in/api/students/${studentId}`);
      if (response.ok) {
        const data = await response.json();
        setStudentData(data.data);
      } else {
        throw new Error('Failed to fetch student data');
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
      setCameraError('Failed to load student information');
    } finally {
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
      });
      streamRef.current = null;
    }
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraActive(false);
    setCameraError(null);
  };

  const startCamera = async () => {
    try {
      stopCamera(); // Clean up any existing stream first
      setCameraError(null);

      // Mobile-optimized constraints
      const constraints = {
        video: { 
          facingMode: facingMode,
          width: { ideal: isMobile ? 1280 : 1920 },
          height: { ideal: isMobile ? 720 : 1080 },
          aspectRatio: isMobile ? { ideal: 9/16 } : { ideal: 16/9 } // Portrait for mobile
        },
        audio: false
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      
      streamRef.current = mediaStream;
      setStream(mediaStream);
      setIsCameraActive(true);
      
      // Wait for video element to be ready
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        
        // Wait for video to load metadata
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().catch(e => {
            console.error('Video play error:', e);
          });
        };
      }
     
    } catch (error) {
      console.error('Error accessing camera:', error);
      let errorMessage = 'Unable to access camera. ';
      
      if (error.name === 'NotAllowedError') {
        errorMessage += 'Please grant camera permissions in your browser settings.';
      } else if (error.name === 'NotFoundError') {
        errorMessage += 'No camera found on your device.';
      } else if (error.name === 'NotSupportedError') {
        errorMessage += 'Camera not supported in your browser.';
      } else if (error.name === 'OverconstrainedError') {
        errorMessage += 'Camera constraints could not be satisfied. Trying different settings...';
        // Try with simpler constraints
        try {
          const fallbackStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
          });
          streamRef.current = fallbackStream;
          setStream(fallbackStream);
          setIsCameraActive(true);
          return;
        } catch (fallbackError) {
          errorMessage += ' Unable to access camera with any settings.';
        }
      }
      
      setCameraError(errorMessage);
      setIsCameraActive(false);
    }
  };

  const uploadPhoto = async (imageDataUrl) => {
    setIsUploading(true);
    setUploadStatus(null);

    try {
      // Convert base64 to blob
      const response = await fetch(imageDataUrl);
      const blob = await response.blob();

      // Create FormData
      const formData = new FormData();
      formData.append('photo', blob, `student-${studentId}-${Date.now()}.png`);

      // Send to backend
      const uploadResponse = await fetch(`https://sayaah.in/api/student/upload-student-image/${studentId}`, {
        method: 'POST',
        body: formData,
      });

      if (uploadResponse.ok) {
        setUploadStatus('success');
        // Wait a moment to show success message before redirecting
        setTimeout(() => {
          if (studentData) {
            const params = new URLSearchParams({
              school: studentData.school || 'SOBO',
              name: studentData.fullName || '',
              dob: studentData.dob ? new Date(studentData.dob).toLocaleDateString('en-GB') : '',
              class: studentData.class || '',
              section: studentData.section || '',
            });
            navigate(`/sobo/${studentData.school || 'SOBO'}/EXAM_PAGE?${params.toString()}`);
          }
        }, 2000);
      } else {
        const errorData = await uploadResponse.text();
        console.error('Upload failed:', errorData);
        setUploadStatus('error');
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
      setUploadStatus('error');
    } finally {
      setIsUploading(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current && isCameraActive) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      if (context) {
        // Draw current video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert to image data URL
        const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8); // Use JPEG for better compression
        setCapturedImage(imageDataUrl);
        stopCamera();
      }
    }
  };

  const savePhoto = () => {
    if (capturedImage && !isUploading) {
      uploadPhoto(capturedImage);
    }
  };

  const switchCamera = async () => {
    const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(newFacingMode);
  };

  const retakePhoto = async () => {
    setCapturedImage(null);
    setUploadStatus(null);
    await startCamera();
  };

  const continueToExam = () => {
    if (studentData) {
      const params = new URLSearchParams({
        school: studentData.school || 'SOBO',
        name: studentData.fullName || '',
        dob: studentData.dob ? new Date(studentData.dob).toLocaleDateString('en-GB') : '',
        class: studentData.class || '',
        section: studentData.section || '',
      });
      navigate(`/sobo/${studentData.school || 'SOBO'}/EXAM_PAGE?${params.toString()}`);
    }
  };

  // Initialize camera when component mounts
  useEffect(() => {
    fetchStudentData();
    
    // Start camera automatically
    const initializeCamera = async () => {
      await startCamera();
    };
    
    initializeCamera();

    // Cleanup on unmount
    return () => {
      stopCamera();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Restart camera when facing mode changes
  useEffect(() => {
    if (!capturedImage) {
      startCamera();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facingMode]);

  // Student info display - mobile optimized
  const renderStudentInfo = () => {
    if (!studentData) return null;

    return (
      <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2 text-sm">Student Information</h3>
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-1' : 'grid-cols-2 gap-2'} text-xs`}>
          <div>
            <span className="text-blue-600 font-medium">Name:</span> {studentData.fullName}
          </div>
          <div>
            <span className="text-blue-600 font-medium">Class:</span> {studentData.class}
          </div>
          {!isMobile && (
            <>
              <div>
                <span className="text-blue-600 font-medium">Section:</span> {studentData.section}
              </div>
              <div>
                <span className="text-blue-600 font-medium">Roll No:</span> {studentData.rollNo}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl overflow-hidden">
          {/* Header - Mobile Optimized */}
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-4 sm:p-6">
            <div className={`flex items-center ${isMobile ? 'flex-col gap-2 text-center' : 'justify-between'}`}>
              <div className={`flex items-center gap-2 sm:gap-3 ${isMobile ? 'justify-center' : ''}`}>
                <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                <div>
                  <h1 className="text-lg sm:text-2xl font-bold text-white">
                    {isMobile ? 'Photo Capture' : 'Student Photo Capture'}
                  </h1>
                  <p className="text-slate-300 text-xs sm:text-sm">
                    {isMobile ? 'Take a clear photo' : 'Take a clear photo for identification'}
                  </p>
                </div>
              </div>
              {studentData && (
                <div className={`text-white ${isMobile ? 'text-center mt-2' : 'text-right'}`}>
                  <p className="font-medium text-sm sm:text-base">{studentData.fullName}</p>
                  <p className="text-slate-300 text-xs sm:text-sm">
                    Class {studentData.class} - {studentData.section}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {renderStudentInfo()}

            {/* Camera Preview - Mobile Optimized */}
            <div className={`relative bg-slate-900 rounded-lg sm:rounded-xl overflow-hidden ${
              isMobile ? 'aspect-[3/4]' : 'aspect-video'
            } mb-4`}>
              {/* Camera Feed */}
              {!capturedImage && isCameraActive && !cameraError && (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              )}

              {/* Captured Image Preview */}
              {capturedImage && (
                <>
                  <img
                    src={capturedImage}
                    alt="Captured"
                    className="w-full h-full object-cover"
                  />
                  {isUploading && (
                    <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                      <div className="text-center text-white p-4">
                        <Upload className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 animate-pulse" />
                        <p className="font-medium text-sm sm:text-base">Uploading Photo...</p>
                        <p className="text-xs sm:text-sm text-slate-300 mt-1">Please wait</p>
                      </div>
                    </div>
                  )}
                  {uploadStatus === 'success' && (
                    <div className="absolute top-2 sm:top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg shadow-lg animate-pulse text-xs sm:text-sm">
                      ✅ Photo uploaded successfully! Redirecting...
                    </div>
                  )}
                  {uploadStatus === 'error' && (
                    <div className="absolute top-2 sm:top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg shadow-lg text-xs sm:text-sm">
                      ❌ Upload failed. Please try again.
                    </div>
                  )}
                </>
              )}

              {/* Camera Error State */}
              {cameraError && (
                <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                  <div className="text-center text-white p-4">
                    <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-red-400" />
                    <p className="font-medium mb-2 text-sm sm:text-base">Camera Error</p>
                    <p className="text-xs sm:text-sm text-slate-300 mb-4 max-w-xs">{cameraError}</p>
                    <button
                      onClick={startCamera}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              )}

              {/* Camera Loading/Inactive State */}
              {!isCameraActive && !capturedImage && !cameraError && (
                <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Camera className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-slate-400 animate-pulse" />
                    <p className="text-slate-400 text-sm sm:text-base">Initializing camera...</p>
                  </div>
                </div>
              )}

              {/* Camera Active Indicator */}
              {isCameraActive && !capturedImage && (
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                  <div className="flex items-center gap-1 sm:gap-2 bg-black bg-opacity-50 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full animate-pulse"></div>
                    Live
                  </div>
                </div>
              )}

              <canvas ref={canvasRef} className="hidden"></canvas>
            </div>

            {/* Camera Instructions */}
            <div className="text-center mb-4 sm:mb-6">
              <p className="text-xs sm:text-sm text-slate-600">
                {!capturedImage 
                  ? "Ensure your face is clearly visible and well-lit" 
                  : "Review your photo before saving"}
              </p>
            </div>

            {/* Action Buttons - Mobile Optimized */}
            <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3 justify-center">
              {!capturedImage && isCameraActive && !cameraError && (
                <>
                  <button
                    onClick={capturePhoto}
                    className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg text-sm sm:text-base flex-1 sm:flex-none justify-center min-w-0"
                  >
                    <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
                    {isMobile ? 'Capture' : 'Capture Photo'}
                  </button>

                  <button
                    onClick={switchCamera}
                    className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors text-sm sm:text-base flex-1 sm:flex-none justify-center min-w-0"
                  >
                    <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
                    {isMobile ? 'Switch' : 'Switch Camera'}
                  </button>

                  <button
                    onClick={stopCamera}
                    className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors text-sm sm:text-base flex-1 sm:flex-none justify-center min-w-0"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                    {isMobile ? 'Stop' : 'Stop Camera'}
                  </button>
                </>
              )}

              {!isCameraActive && !capturedImage && !cameraError && (
                <button
                  onClick={startCamera}
                  className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg text-sm sm:text-base w-full sm:w-auto justify-center"
                >
                  <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
                  Start Camera
                </button>
              )}

              {capturedImage && (
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center w-full">
                  <button
                    onClick={savePhoto}
                    disabled={isUploading || uploadStatus === 'success'}
                    className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors shadow-lg text-sm sm:text-base flex-1 justify-center min-w-0"
                  >
                    <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                    {isUploading ? 'Saving...' : uploadStatus === 'success' ? 'Saved!' : (isMobile ? 'Save' : 'Save Photo')}
                  </button>

                  {uploadStatus === 'success' && (
                    <button
                      onClick={continueToExam}
                      className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg text-sm sm:text-base flex-1 justify-center min-w-0"
                    >
                      {isMobile ? 'Continue' : 'Continue to Exam'}
                    </button>
                  )}

                  <button
                    onClick={retakePhoto}
                    disabled={isUploading}
                    className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-slate-600 hover:bg-slate-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors text-sm sm:text-base flex-1 justify-center min-w-0"
                  >
                    <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
                    {isMobile ? 'Retake' : 'Retake Photo'}
                  </button>
                </div>
              )}
            </div>

            {/* Terms of Use Section - Mobile Optimized */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-200">
              <h2 className="text-base sm:text-lg font-semibold text-slate-700 mb-2 sm:mb-3">
                {isMobile ? 'Terms' : 'Terms of Use'}
              </h2>
              <div className="text-xs sm:text-sm text-slate-600 bg-slate-50 p-3 sm:p-4 rounded-lg border border-slate-200">
                <p className="mb-2">
                  <strong>Important:</strong> By capturing or saving a photo, you acknowledge and agree that:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li className="text-xs sm:text-sm">The photo is for <strong>surveillance</strong> and <strong>identification</strong></li>
                  <li className="text-xs sm:text-sm">Used only for online examination</li>
                  <li className="text-xs sm:text-sm">Ensure face is clearly visible</li>
                  <li className="text-xs sm:text-sm">Not used for other purposes without consent</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 

export default PhotoCapture;