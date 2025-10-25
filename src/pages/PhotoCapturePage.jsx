import { useState, useRef, useEffect } from 'react';
import { Camera, RefreshCw, X, Upload, Save } from 'lucide-react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

function PhotoCapture() {
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState('user');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const { studentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch student data on component mount
  const fetchStudentData = async () => {
    try {
      const response = await fetch(`https://sayaah.in/api/students/${studentId}`);
      if (response.ok) {
        const data = await response.json();
        setStudentData(data.data);
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facingMode },
        audio: false
      });

      setStream(mediaStream);
      setIsCameraActive(true);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please grant camera permissions.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
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
      formData.append('photo', blob, `photo-${Date.now()}.png`);
      

      // Send to backend - Replace with your actual endpoint
      const uploadResponse = await fetch(`https://sayaah.in/api/student/upload-student-image/${studentId}`, {
        method: 'POST',
        body: formData,
      });


      if (uploadResponse.ok) {
        setUploadStatus('success');
        // Redirect to exam page after successful upload
        setTimeout(() => {
          if (studentData) {
            const params = new URLSearchParams({
              school: studentData.school || 'SOBO',
              name: studentData.fullName || '',
              dob: studentData.dob ? new Date(studentData.dob).toLocaleDateString('en-GB') : '',
              class: studentData.class || '',
              section: studentData.section || '',
            });
            console.log('Auto-redirecting to exam with student data:', studentData);
            console.log('URL params:', params.toString());
            navigate(`/sobo/${studentData.school || 'SOBO'}/EXAM_PAGE?${params.toString()}`);
          }
        }, 2000); // Wait 2 seconds to show success message
      } else {
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
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL('image/png');
        setCapturedImage(imageDataUrl);
        stopCamera();
      }
    }
  };

  const savePhoto = () => {
    if (capturedImage) {
      uploadPhoto(capturedImage);
    }
  };

  const switchCamera = async () => {
    stopCamera();
    setFacingMode(prev => (prev === 'user' ? 'environment' : 'user'));
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
      console.log('Navigating to exam with student data:', studentData);
      console.log('URL params:', params.toString());
      navigate(`/sobo/${studentData.school || 'SOBO'}/EXAM_PAGE?${params.toString()}`);
    }
  };

  useEffect(() => {
    // Fetch student data when component mounts
    fetchStudentData();
  }, [studentId]);

  useEffect(() => {
    if (!capturedImage && !isCameraActive) {
      startCamera();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facingMode, capturedImage]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-6">
            <div className="flex items-center gap-3">
              <Camera className="w-8 h-8 text-white" />
              <h1 className="text-2xl font-bold text-white">Camera Capture</h1>
            </div>
          </div>

          <div className="p-6">
            <div className="relative bg-slate-900 rounded-xl overflow-hidden aspect-video">
              {!capturedImage && isCameraActive && (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              )}

              {capturedImage && (
                <>
                  <img
                    src={capturedImage}
                    alt="Captured"
                    className="w-full h-full object-cover"
                  />
                  {isUploading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <div className="text-center">
                        <Upload className="w-12 h-12 text-white mx-auto mb-2 animate-pulse" />
                        <p className="text-white font-medium">Uploading...</p>
                      </div>
                    </div>
                  )}
                  {uploadStatus === 'success' && (
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
                      Photo uploaded successfully! Redirecting to exam...
                    </div>
                  )}
                  {uploadStatus === 'error' && (
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
                      Upload failed. Please try again.
                    </div>
                  )}
                </>
              )}

              {!isCameraActive && !capturedImage && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">Camera is off</p>
                  </div>
                </div>
              )}

              <canvas ref={canvasRef} className="hidden"></canvas>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              {!capturedImage && isCameraActive && (
                <>
                  <button
                    onClick={capturePhoto}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors shadow-lg"
                  >
                    <Camera className="w-5 h-5" />
                    Capture Photo
                  </button>

                  <button
                    onClick={switchCamera}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-medium transition-colors"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Switch Camera
                  </button>

                  <button
                    onClick={stopCamera}
                    className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                  >
                    <X className="w-5 h-5" />
                    Stop
                  </button>
                </>
              )}

              {!isCameraActive && !capturedImage && (
                <button
                  onClick={startCamera}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors shadow-lg"
                >
                  <Camera className="w-5 h-5" />
                  Start Camera
                </button>
              )}

              {capturedImage && (
                <>
                  <button
                    onClick={savePhoto}
                    disabled={isUploading || uploadStatus === 'success'}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors shadow-lg"
                  >
                    <Save className="w-5 h-5" />
                    {isUploading ? 'Saving...' : uploadStatus === 'success' ? 'Saved' : 'Save Photo'}
                  </button>

                  {uploadStatus === 'success' && (
                    <button
                      onClick={continueToExam}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg"
                    >
                      <Camera className="w-5 h-5" />
                      Continue to Exam
                    </button>
                  )}

                  <button
                    onClick={retakePhoto}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors shadow-lg"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Retake Photo
                  </button>
                </>
              )}
            </div>

            {/* --- Terms of Use Section --- */}
            <div className="mt-8 pt-4 border-t border-slate-200">
              <h2 className="text-lg font-semibold text-slate-700 mb-2">Terms of Use</h2>
              <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
                **By capturing or saving a photo, you acknowledge and agree that the photo is being taken and stored strictly for **surveillance** and **student identification** purposes related to the online examination. This image will not be used for any other purpose.
              </p>
            </div>
            {/* ---------------------------- */}
          </div>
        </div>
      </div>
    </div>
  );
} 

export default PhotoCapture;