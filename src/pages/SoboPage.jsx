import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'

function formatDateToDDMMYYYY(value) {
  if (!value) return ''
  const [yyyy, mm, dd] = value.split('-')
  if (!yyyy || !mm || !dd) return ''
  return `${dd}/${mm}/${yyyy}`
}

function formatDateToYYYYMMDD(value) {
  // Convert DD/MM/YYYY → YYYY-MM-DD for the calendar input
  if (!value) return ''
  const parts = value.split('/')
  if (parts.length !== 3) return ''
  const [dd, mm, yyyy] = parts
  if (!dd || !mm || !yyyy) return ''
  return `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`
}

function SoboPage() {
  const navigate = useNavigate()
  const { schoolId } = useParams()
  const [formData, setFormData] = useState({ school: '', userId: '', password: '', studentName: '', dateOfBirth: '', rollNo: '', class: '', section: '' })

  const schools = [
    { value: '', label: 'Select School' },
    { value: 'SOBO', label: 'SOBO' },
    { value: 'school_a', label: 'School A' },
    { value: 'school_b', label: 'School B' },
    { value: 'school_c', label: 'School C' },
  ]

  useEffect(() => {
    if (schoolId) {
      setFormData(prev => ({ ...prev, school: schoolId }))
    }
  }, [schoolId])

  function handleChange(event) {
    const { name, value } = event.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }


  function handleSubmit(event) {
    event.preventDefault()
    if (!formData.school) return
    // If already on a specific school route, keep the user on the same page
    // and (for now) just proceed with local handling; otherwise navigate.
    if (schoolId) {
      const params = new URLSearchParams({
        school: formData.school || schoolId,
        name: formData.studentName || '',
        dob: formData.dateOfBirth || '',
        rollNo: formData.rollNo || '',
        class: formData.class || '',
        section: formData.section || '',
      })
      navigate(`/sobo/${schoolId}/EXAM_PAGE?${params.toString()}`)
      return
    }
    navigate(`/sobo/${formData.school}`)
  }

  const schoolConfig = useMemo(() => {
    const map = {
      SOBO: {
        name: 'SOBO',
        primary: 'bg-black hover:bg-gray-900',
        accent: 'text-gray-900',
      },
      school_a: {
        name: 'School A',
        primary: 'bg-indigo-600 hover:bg-indigo-700',
        accent: 'text-indigo-700',
      },
      school_b: {
        name: 'School B',
        primary: 'bg-emerald-600 hover:bg-emerald-700',
        accent: 'text-emerald-700',
      },
      school_c: {
        name: 'School C',
        primary: 'bg-rose-600 hover:bg-rose-700',
        accent: 'text-rose-700',
      },
    }
    if (!schoolId) return null
    return map[schoolId] ?? { name: schoolId, primary: 'bg-black hover:bg-gray-900', accent: 'text-gray-900' }
  }, [schoolId])

  return (
    <div className="min-h-[60vh] w-full flex items-center justify-center py-12">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5 px-6 py-8 rounded-xl border border-gray-200 shadow-sm bg-white">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-gray-900">{schoolConfig ? `${schoolConfig.name} — SOBO Access` : 'SOBO Access'}</h1>
          {schoolConfig && (
            <p className={`text-sm ${schoolConfig.accent}`}>You are accessing the portal for {schoolConfig.name}.</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="school" className="block text-sm font-medium text-gray-700">School</label>
          <select
            id="school"
            name="school"
            value={formData.school}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            required
          >
            {schools.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        {schoolConfig && (
          <>
            <div className="space-y-2">
              <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">Student Name</label>
              <input
                id="studentName"
                name="studentName"
                type="text"
                value={formData.studentName}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <DateWithCalendar
                value={formData.dateOfBirth}
                onChange={(val) => setFormData(prev => ({ ...prev, dateOfBirth: val }))}
              />
              <p className="text-xs text-gray-500">Type the date or pick from calendar (DD/MM/YYYY)</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="rollNo" className="block text-sm font-medium text-gray-700">Roll No</label>
              <input
                id="rollNo"
                name="rollNo"
                type="text"
                value={formData.rollNo}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                placeholder="Enter roll number"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="class" className="block text-sm font-medium text-gray-700">Class</label>
              <select
                id="class"
                name="class"
                value={formData.class}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
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
            </div>

            <div className="space-y-2">
              <label htmlFor="section" className="block text-sm font-medium text-gray-700">Section</label>
              <select
                id="section"
                name="section"
                value={formData.section}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
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
            </div>
          </>
        )}

        <button
          type="submit"
          className={`w-full rounded-md text-white py-2.5 font-medium ${schoolConfig ? schoolConfig.primary : 'bg-black hover:bg-gray-900'}`}
        >
          Continue
        </button>

        {schoolConfig && (
          <div className="text-center text-sm text-gray-600">
            Not your school? <Link to="/sobo" className="underline">Change school</Link>
          </div>
        )}
      </form>
    </div>
  )
}

export default SoboPage



function DateWithCalendar({ value, onChange }) {
  const hiddenPickerRef = useRef(null)

  function handleManualChange(e) {
    onChange(e.target.value)
  }

  function openCalendar() {
    hiddenPickerRef.current?.showPicker?.()
  }

  function onPick(e) {
    onChange(formatDateToDDMMYYYY(e.target.value))
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
        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
        required
      />
      <button
        type="button"
        onClick={openCalendar}
        className="px-3 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
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
  )
}

