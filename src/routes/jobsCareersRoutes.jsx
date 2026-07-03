import React from 'react'
import { Route } from 'react-router-dom'
import JobRegistrations from '../pages/jobs-careers/JobRegistrations'
import JobUpdatesList from '../pages/jobs-careers/JobUpdatesList'
import AddJobUpdate from '../pages/jobs-careers/AddJobUpdate'
import HireWithUsList from '../pages/jobs-careers/HireWithUsList'

const jobsCareersRoutes = [
  <Route key="registrations-job" path="/registrations/job" element={<JobRegistrations />} />,
  <Route key="job-updates" path="/job-updates" element={<JobUpdatesList />} />,
  <Route key="job-updates-add" path="/job-updates/add" element={<AddJobUpdate />} />,
  <Route key="job-updates-edit" path="/job-updates/edit/:id" element={<AddJobUpdate />} />,
  <Route key="hire-with-us" path="/forms/hire-with-us" element={<HireWithUsList />} />
]

export default jobsCareersRoutes
