import React from 'react'
import { Route } from 'react-router-dom'
import Settings from '../pages/settings/Settings'
import ModuleSubModuleList from '../pages/settings/ModuleSubModuleList'
import MyProfile from '../pages/settings/MyProfile'
import ApplicationSetting from '../pages/settings/ApplicationSetting'

const settingsRoutes = [
  <Route key="settings" path="/settings" element={<Settings />} />,
  <Route key="module-sub-module" path="/master/module-sub-module" element={<ModuleSubModuleList />} />,
  <Route key="my-profile" path="/general-setting/my-profile" element={<MyProfile />} />,
  <Route key="application-setting" path="/general-setting/application" element={<ApplicationSetting />} />
]

export default settingsRoutes
