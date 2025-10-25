import { useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'

function SoboExamPage() {
  const { schoolId } = useParams()
  const location = useLocation()
  const query = useMemo(() => new URLSearchParams(location.search), [location.search])

  // Base form URL (Google Forms or Fillout). Currently set to your Google Form.
  const baseForm = 'https://docs.google.com/forms/d/e/1FAIpQLSd7K-ZDRYmOs-7Asi62USUmetvdn88Pn-0DqN_HGao9mVuUtQ/viewform'
  const prefill = new URLSearchParams()
  const school = query.get('school') || schoolId
  const name = query.get('name') || ''
  const dob = query.get('dob') || ''
  const rollNo = query.get('rollNo') || ''
  const classValue = query.get('class') || ''
  const section = query.get('section') || ''
  
  // Convert DD/MM/YYYY to YYYY-MM-DD for Google Forms
  const formatDateForGoogle = (dateStr) => {
    if (!dateStr) return ''
    const parts = dateStr.split('/')
    if (parts.length === 3) {
      const [day, month, year] = parts
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
    return dateStr
  }
  
  // Extract number from class string (e.g., "Class 4" -> "4")
  const formatClassForGoogle = (classStr) => {
    if (!classStr) return ''
    const match = classStr.match(/\d+/)
    return match ? match[0] : classStr
  }
  
  const formattedDob = formatDateForGoogle(dob)
  const formattedClass = formatClassForGoogle(classValue)

  // Google Form entry IDs - these need to be updated with the actual entry IDs from your form
  // To get the correct entry IDs:
  // 1. Open your Google Form
  // 2. Click the three dots menu → "Get pre-filled link"
  // 3. Fill in sample values for each field
  // 4. Click "Get link" and copy the generated URL
  // 5. Extract the entry IDs from the URL (e.g., entry.1234567890)
  const GOOGLE_ENTRY_IDS = {
    schoolName: 'entry.1061894325',        // School Name
    studentName: 'entry.166164457',        // Student Name
    class: 'entry.2089310622',            // Class (dropdown)
    section: 'entry.866716400',           // Section (dropdown)
    rollNo: 'entry.1918702461',           // Roll No
    dateOfBirth: 'entry.1794705777',      // Date of Birth
  }

  const isGoogle = /forms\.gle|docs\.google\.com/.test(baseForm)
  if (isGoogle) {
    if (GOOGLE_ENTRY_IDS.schoolName) prefill.set(GOOGLE_ENTRY_IDS.schoolName, school)
    if (GOOGLE_ENTRY_IDS.studentName) prefill.set(GOOGLE_ENTRY_IDS.studentName, name)
    if (GOOGLE_ENTRY_IDS.class) prefill.set(GOOGLE_ENTRY_IDS.class, formattedClass)
    if (GOOGLE_ENTRY_IDS.section) prefill.set(GOOGLE_ENTRY_IDS.section, section)
    // Roll number prefill removed as requested
    if (GOOGLE_ENTRY_IDS.dateOfBirth) prefill.set(GOOGLE_ENTRY_IDS.dateOfBirth, formattedDob)
  } else {
    // Fillout/Tally/Typeform style alias params
    prefill.set('school', school)
    prefill.set('name', name)
    prefill.set('dob', dob)
    // Roll number prefill removed as requested
    prefill.set('class', classValue)
    prefill.set('section', section)
  }

  const googleFormSrc = `${baseForm}?${prefill.toString()}`
  
  // Debug: Log the generated URL and data
  // console.log('Generated Google Form URL:', googleFormSrc)
  // console.log('Prefill params:', Object.fromEntries(prefill))
  // console.log('Student data:', { school, name, dob, classValue, section })
  // console.log('Formatted data:', { formattedDob, formattedClass })

  return (
    <div className="fixed inset-0 bg-white">
      <div className="absolute top-4 left-4 z-10 bg-blue-100 border border-blue-300 rounded p-2 text-sm text-blue-800">
        <strong>Note:</strong> If form fields are not pre-filled, the entry IDs may need to be updated.
        <br />
        <a 
          href={googleFormSrc} 
          target="_blank" 
          rel="noopener noreferrer"
          className="underline hover:text-blue-600"
        >
          Open form in new tab
        </a>
      </div>
      <iframe
        title={`${schoolId?.toUpperCase()} Exam`}
        src={googleFormSrc}
        width="100%"
        height="100%"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
      >Loading…</iframe>
    </div>
  )
}

export default SoboExamPage


