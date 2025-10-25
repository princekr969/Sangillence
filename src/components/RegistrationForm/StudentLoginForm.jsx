import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams, Link } from 'react-router-dom'
import axios from "axios";


function formatDateToDDMMYYYY(value) {
  if (!value) return "";
  const [yyyy, mm, dd] = value.split("-");
  if (!yyyy || !mm || !dd) return "";
  return `${dd}/${mm}/${yyyy}`;
}

function formatDateToYYYYMMDD(value) {
  if (!value) return "";
  const parts = value.split("/");
  if (parts.length !== 3) return "";
  const [dd, mm, yyyy] = parts;
  if (!dd || !mm || !yyyy) return "";
  return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
}

function StudentLoginForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    school: "",
    fullName: "",
    dob: "",
    rollNo: "",
    class: "",
    section: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const schools = [
    { value: "", label: "Select School" },
    { value: "school_a  ", label: "PM SHRI KENDRIYA VIDYALAYA NUMBER-1 GWALIOR" },
    { value: "school_b  ", label: "PM SHRI KENDRIYA VIDYALAYA NUMBER-2, AFS, GWALIOR" },
    { value: "school_c", label: "PM SHRI KENDRIYA VIDYALAYA NUMBER-4, GWALIOR" },
    { value: "school_d", label: "PM SHRI KENDRIYA VIDYALAYA NUMBER-5, GWALIOR " },
    { value: "school_e", label: "PM SHRI KENDRIYA VIDYALAYA NUMBER-1 AFS CHAKERI, KANPUR" },
    { value: "school_f  ", label: "PM SHRI KENDRIYA VIDYALAYA NUMBER-1, SURAT " },
    { value: "school_g  ", label: "ARMY PUBLIC SCHOOL, GWALIOR" },
    { value: "other", label: "OTHER" },
  ];

  const schoolConfig = useMemo(() => {
    const map = {
      SOBO: {
        name: "SOBO",
        primary: "from-slate-900 via-slate-800 to-slate-900",
      },
      school_a: {
        name: "School A",
        primary: "from-indigo-900 via-indigo-800 to-indigo-900",
      },
      school_b: {
        name: "School B",
        primary: "from-emerald-900 via-emerald-800 to-emerald-900",
      },
      school_c: {
        name: "School C",
        primary: "from-rose-900 via-rose-800 to-rose-900",
      },
      school_d: {
        name: "School D",
        primary: "from-rose-900 via-rose-800 to-rose-900",
      },
    };
    return formData.school ? map[formData.school] : null;
  }, [formData.school]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  function validateForm() {
    const newErrors = {};
    if (!formData.school) newErrors.school = "School is required";
    if (formData.school) {
      if (!formData.fullName.trim())
        newErrors.fullName = "Student name is required";
      if (!formData.dob)
        newErrors.dob = "Date of birth is required";
      if (!formData.rollNo.trim()) newErrors.rollNo = "Roll number is required";
      if (!formData.class) newErrors.class = "Class is required";
      if (!formData.section) newErrors.section = "Section is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    event.preventDefault()
    if (!formData.school) return
    // If already on a specific school route, keep the user on the same page
    // and (for now) just proceed with local handling; otherwise navigate.
    if (formData.school) {
      const params = new URLSearchParams({
        school: formData.school || '',
        name: formData.fullName || '',
        dob: formData.dob || '',
        rollNo: formData.rollNo || '',
        class: formData.class || '',
        section: formData.section || '',
      })
      console.log(formData)
      try {
        const response = await axios.post(`http://localhost:5001/api/students/login`, formData);
        console.log("Login successful:", response.data);
        if(response.data.success){
          navigate(`/photoCapture/${response.data.data.student._id}`)
        }
       
      } catch (error) {
        console.error("Login failed:", error);
      }
    setIsLoading(false);

      return
    }
  }

  return (
    <div className=" min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="relative z-10 px-4">
        <div className="max-w-4xl mx-auto w-full">
          <div className="relative backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-200/50 overflow-hidden">
            {/* Header with geometric background */}
            <div className={`relative p-8`}>
              {/* Background with geometric accent */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 rounded-xl">
                {/* Geometric overlays */}
                <div
                  className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-blue-600/30 to-transparent rounded-l-xl"
                  style={{
                    clipPath: "polygon(0 0, 80% 0, 60% 100%, 0 100%)",
                  }}
                ></div>
                <div
                  className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-500/20 to-transparent rounded-r-xl"
                  style={{
                    clipPath: "polygon(40% 0, 100% 0, 100% 100%, 20% 100%)",
                  }}
                ></div>
              </div>

              <div className="relative z-10">
                <h1 className="text-3xl font-bold text-white mb-2">
                  SOBO Access
                </h1>
                <p className="text-slate-300">
                  {schoolConfig
                    ? `Enter your details to access the portal for ${schoolConfig.name}`
                    : "Select your school to get started"}
                </p>
              </div>

              {/* Decorative elements */}
              <div className="absolute bottom-2 left-8 w-1 h-6 bg-gradient-to-t from-blue-500 to-transparent"></div>
              <div className="absolute bottom-2 right-8 w-1 h-6 bg-gradient-to-t from-amber-500 to-transparent"></div>
            </div>

            <div className="p-8">
              <form onSubmit={handleSubmit} className="animate-fade-in">
                <div className="flex flex-col gap-4">
                  {/* School Select */}
                  <div>
                    <label
                      htmlFor="school"
                      className="block text-sm font-semibold text-slate-700 mb-2"
                    >
                      School <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="school"
                      name="school"
                      value={formData.school}
                      onChange={handleChange}
                      className={`block w-full px-4 py-3 rounded-lg border ${
                        errors.school ? "border-red-500" : "border-slate-300"
                      } bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                      required
                    >
                      {schools.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                    {errors.school && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.school}
                      </p>
                    )}
                  </div>

                    <>
                      {/* Student Name */}
                      <div>
                        <label
                          htmlFor="fullName"
                          className="block text-sm font-semibold text-slate-700 mb-2"
                        >
                          Student Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          value={formData.fullName}
                          onChange={handleChange}
                          className={`block w-full px-4 py-3 rounded-lg border ${
                            errors.fullName
                              ? "border-red-500"
                              : "border-slate-300"
                          } bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition uppercase`}
                          placeholder="Enter full name"
                          required
                        />
                        {errors.fullName && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      {/* Date of Birth */}
                      <div>
                        <label
                          htmlFor="dateOfBirth"
                          className="block text-sm font-semibold text-slate-700 mb-2"
                        >
                          Date of Birth <span className="text-red-500">*</span>
                        </label>
                        <DateWithCalendar
                          value={formData.dob}
                          onChange={(val) => {
                            setFormData((prev) => ({
                              ...prev,
                              dob: val,
                            }));
                            if (errors.dob) {
                              setErrors((prev) => ({
                                ...prev,
                                dob: "",
                              }));
                            }
                          }}
                          error={errors.dob}
                        />
                        {errors.dob && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.dob}
                          </p>
                        )}
                        <p className="mt-1 text-xs text-slate-500">
                          Type the date or pick from calendar (DD/MM/YYYY)
                        </p>
                      </div>

                      {/* Roll No */}
                      <div>
                        <label
                          htmlFor="rollNo"
                          className="block text-sm font-semibold text-slate-700 mb-2"
                        >
                          Roll No <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="rollNo"
                          name="rollNo"
                          type="text"
                          value={formData.rollNo}
                          onChange={handleChange}
                          className={`block w-full px-4 py-3 rounded-lg border ${
                            errors.rollNo
                              ? "border-red-500"
                              : "border-slate-300"
                          } bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                          placeholder="Enter roll number"
                          required
                        />
                        {errors.rollNo && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.rollNo}
                          </p>
                        )}
                      </div>

                      {/* Class */}
                      <div>
                        <label
                          htmlFor="class"
                          className="block text-sm font-semibold text-slate-700 mb-2"
                        >
                          Class <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="class"
                          name="class"
                          value={formData.class}
                          onChange={handleChange}
                          className={`block w-full px-4 py-3 rounded-lg border ${
                            errors.class ? "border-red-500" : "border-slate-300"
                          } bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                          required
                        >
                          <option value="">Choose Class</option>
                          <option value="Class 3">Class 3</option>
                          <option value="Class 4">Class 4</option>
                          <option value="Class 5">Class 5</option>
                          <option value="Class 6">Class 6</option>
                          <option value="Class 7">Class 7</option>
                          <option value="Class 8">Class 8</option>
                          <option value="Class 9">Class 9</option>
                          <option value="Class 10">Class 10</option>
                        </select>
                        {errors.class && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.class}
                          </p>
                        )}
                      </div>

                      {/* Section */}
                      <div>
                        <label
                          htmlFor="section"
                          className="block text-sm font-semibold text-slate-700 mb-2"
                        >
                          Section <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="section"
                          name="section"
                          value={formData.section}
                          onChange={handleChange}
                          className={`block w-full px-4 py-3 rounded-lg border ${
                            errors.section
                              ? "border-red-500"
                              : "border-slate-300"
                          } bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                          required
                        >
                          <option value="">Choose Section</option>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                          <option value="D">D</option>
                          <option value="E">E</option>
                          <option value="F">F</option>
                        </select>
                        {errors.section && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.section}
                          </p>
                        )}
                      </div>
                    </>
                  
                </div>

                {/* Submit Button with advanced styling */}
                <div className="relative mt-6 group">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`relative w-full py-4 px-8 font-semibold rounded-lg shadow-lg transition-all duration-300 transform overflow-hidden ${
                      isLoading
                        ? "bg-slate-400 text-slate-200 cursor-not-allowed"
                        : "bg-gradient-to-r from-slate-800 to-slate-900 text-white hover:shadow-xl hover:scale-[1.02]"
                    }`}
                  >
                    {/* Geometric hover overlay - only show when not disabled */}
                    {!isLoading && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    )}

                    {/* Button content */}
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isLoading ? (
                        <>
                          {/* Loading spinner */}
                          <svg
                            className="animate-spin h-5 w-5"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        "Continue"
                      )}
                    </span>

                    {/* Decorative elements - only show when not disabled */}
                    {!isLoading && (
                      <>
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-amber-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </>
                    )}

                    {/* Loading state geometric overlay */}
                    {isLoading && (
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-600/30 via-slate-500/20 to-slate-600/30 animate-pulse"></div>
                    )}
                  </button>
                </div>

                {formData.school && (
                  <div className="mt-4 text-center text-sm text-slate-600">
                    Not your school?{" "}
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          school: "",
                          studentName: "",
                          dateOfBirth: "",
                          rollNo: "",
                          class: "",
                          section: "",
                        })
                      }
                      className="text-blue-600 hover:underline font-semibold"
                    >
                      Change school
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentLoginForm;

function DateWithCalendar({ value, onChange, error }) {
  const hiddenPickerRef = useRef(null);

  function handleManualChange(e) {
    onChange(e.target.value);
  }

  function openCalendar() {
    hiddenPickerRef.current?.showPicker?.();
  }

  function onPick(e) {
    onChange(formatDateToDDMMYYYY(e.target.value));
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        inputMode="numeric"
        autoComplete="bday"
        placeholder="DD/MM/YYYY"
        value={value}
        onChange={handleManualChange}
        className={`flex-1 px-4 py-3 rounded-lg border ${
          error ? "border-red-500" : "border-slate-300"
        } bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
        required
      />
      <button
        type="button"
        onClick={openCalendar}
        className="px-4 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
        aria-label="Open calendar"
      >
        📅
      </button>
      <input
        ref={hiddenPickerRef}
        type="date"
        value={formatDateToYYYYMMDD(value)}
        onChange={onPick}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      />
    </div>
  );
}
