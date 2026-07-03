import React from 'react'
import { Route } from 'react-router-dom'
import InstructorList from '../pages/instructors/InstructorList'
import AddInstructor from '../pages/instructors/AddInstructor'
import EditInstructor from '../pages/instructors/EditInstructor'

const instructorsRoutes = [
  <Route key="instructors" path="/instructors" element={<InstructorList />} />,
  <Route key="instructors-all" path="/instructors/all" element={<InstructorList />} />,
  <Route key="instructors-add" path="/instructors/add" element={<AddInstructor />} />,
  <Route key="instructors-edit" path="/instructors/edit/:id" element={<EditInstructor />} />
]

export default instructorsRoutes
