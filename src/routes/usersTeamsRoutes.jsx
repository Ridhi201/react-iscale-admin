import React from 'react'
import { Route } from 'react-router-dom'
import AppUsers from '../pages/users-teams/AppUsers'
import AppUserDetails from '../pages/users-teams/AppUserDetails'
import EditAppUser from '../pages/users-teams/EditAppUser'
import AddStudent from '../pages/users-teams/AddStudent'
import AssignCourses from '../pages/users-teams/AssignCourses'
import TeamsList from '../pages/users-teams/TeamsList'
import AddTeam from '../pages/users-teams/AddTeam'
import UserRoleList from '../pages/users-teams/UserRoleList'
import AddUser from '../pages/users-teams/AddUser'

const usersTeamsRoutes = [
  <Route key="app-users" path="/app-users" element={<AppUsers />} />,
  <Route key="app-users-add" path="/app-users/add" element={<AddStudent />} />,
  <Route key="app-users-details" path="/app-users/details/:id" element={<AppUserDetails />} />,
  <Route key="app-users-edit" path="/app-users/edit/:id" element={<EditAppUser />} />,
  <Route key="app-users-assign-courses" path="/app-users/assign-courses/:id" element={<AssignCourses />} />,
  <Route key="teams-all" path="/teams/all" element={<TeamsList />} />,
  <Route key="teams-add" path="/teams/add" element={<AddTeam />} />,
  <Route key="teams-edit" path="/teams/edit/:id" element={<AddTeam />} />,
  <Route key="user-role" path="/user-role" element={<UserRoleList />} />,
  <Route key="user-role-add" path="/user-role/add" element={<AddUser />} />,
  <Route key="user-role-edit" path="/user-role/edit/:id" element={<AddUser />} />
]

export default usersTeamsRoutes
