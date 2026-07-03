import React from 'react'
import { Route } from 'react-router-dom'
import LocationCountry from '../pages/locations/LocationCountry'
import LocationState from '../pages/locations/LocationState'
import LocationCity from '../pages/locations/LocationCity'

const locationsRoutes = [
  <Route key="location-country" path="/location-setting/country" element={<LocationCountry />} />,
  <Route key="location-state" path="/location-setting/state" element={<LocationState />} />,
  <Route key="location-city" path="/location-setting/city" element={<LocationCity />} />
]

export default locationsRoutes
