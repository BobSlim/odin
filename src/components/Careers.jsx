import { useState } from 'react'
import '../styles/Cv.css'

export function Careers() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Application</h1>
      <SectionGeneral></SectionGeneral>
      <SectionEducation></SectionEducation>
      <SectionPractical></SectionPractical>
    </>
  )
}

const genericHandleSubmit = (stateSetter) => (e) => {
  e.preventDefault()
  const form = e.target
  const formData = new FormData(form)
  stateSetter(Object.fromEntries(formData.entries()))
  form.reset()
}

function SectionGeneral() {
  const [personalDetails, setPersonalDetails] = useState({})
  const handleSubmit = genericHandleSubmit(setPersonalDetails)

  function DetailDisplay({ fullName, email, tel }) {
    return (
      <ul className='hiddenEmpty'>
        {fullName && <li>Name: {fullName}</li>}
        {email && <li>Email: {email}</li>}
        {tel && <li>Phone: {tel}</li>}
      </ul>
    )
  }
  return (
    <section>
      <h2>Personal Details</h2>
      <DetailDisplay {...personalDetails}></DetailDisplay>
      <form action="" onSubmit={handleSubmit}>
        <label>Name<input name="fullName" type="text" /></label>
        <label>Email<input name="email" type="email" /></label>
        <label>Ph<input name="tel" type="tel" /></label>
        <button type="submit">Submit</button>
      </form>
    </section>
  )
}

function DisplayTable({ tableRows, description = false }) {
  function DisplayRow({ name, title, start, end, des }) {
    return (
      <tr>
        <td>{name}</td>
        <td>{title}</td>
        <td>{start}</td>
        <td>{end}</td>
        {des && <td>{des}</td>}
      </tr>
    )
  }
  console.log(tableRows)
  if (tableRows.length <= 0) {
    return null
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Title</th>
          <th>Start</th>
          <th>End</th>
          {description && <th>Description</th>}
        </tr>
      </thead>
      <tbody>
        {tableRows.map(row => <DisplayRow {...row} key={`${row.name}${row.title}`}></DisplayRow>)}
      </tbody>
    </table>
  )
}

function SectionEducation() {
  const [educationTable, setEducationTable] = useState([])
  const addEducation = ({ studyName, studyTitle, studyStart, studyEnd }) => {
    setEducationTable(educationTable.concat({
      name: studyName,
      title: studyTitle,
      start: studyStart,
      end: studyEnd,
    }))
  }
  return (
    <section>
      <h2>Education</h2>
      <DisplayTable tableRows={educationTable}></DisplayTable>
      <form action="" onSubmit={genericHandleSubmit(addEducation)}>
        <label>School Name<input type="text" name="studyName" /></label>
        <label>Title of Study<input type="text" name="studyTitle" /></label>
        <label>Study Start<input type="date" name="studyStart" /></label>
        <label>Study End<input type="date" name="studyEnd" /></label>
        <button type="submit">Add</button>
      </form>
    </section>
  )
}

function SectionPractical() {
  const [practicalTable, setPracticalTable] = useState([])
  const addPractical = ({ workName, workTitle, workStart, workEnd, workDuties }) => {
    setPracticalTable(practicalTable.concat({
      name: workName,
      title: workTitle,
      start: workStart,
      end: workEnd,
      des: workDuties,
    }))
  }

  return (
    <section>
      <h2>Practical Experience</h2>
      <DisplayTable tableRows={practicalTable} description={true}></DisplayTable>
      <form action="" onSubmit={genericHandleSubmit(addPractical)}>
        <label>Company Name<input type="text" name="workName" /></label>
        <label>Position Title<input type="text" name="workTitle" /></label>
        <label>Responsibilities<textarea type="text" name="workDuties" /></label>
        <label>Study Start<input type="date" name="workStart" /></label>
        <label>Study End<input type="date" name="workEnd" /></label>
        <button type="submit">Add</button>
      </form>
    </section>
  )
}