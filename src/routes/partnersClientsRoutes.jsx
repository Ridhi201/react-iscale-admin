import React from 'react'
import { Route } from 'react-router-dom'
import PartnersList from '../pages/partners-clients/PartnersList'
import AddPartner from '../pages/partners-clients/AddPartner'
import AlliedList from '../pages/partners-clients/AlliedList'
import AddAllied from '../pages/partners-clients/AddAllied'
import EditAllied from '../pages/partners-clients/EditAllied'
import ClientList from '../pages/partners-clients/ClientList'
import AddClient from '../pages/partners-clients/AddClient'
import EditClient from '../pages/partners-clients/EditClient'

const partnersClientsRoutes = [
  <Route key="our-allied" path="/our-allied" element={<AlliedList />} />,
  <Route key="our-allied-add" path="/our-allied/add" element={<AddAllied />} />,
  <Route key="our-allied-edit" path="/our-allied/edit/:id" element={<EditAllied />} />,
  <Route key="our-clients" path="/our-clients" element={<ClientList />} />,
  <Route key="our-clients-add" path="/our-clients/add" element={<AddClient />} />,
  <Route key="our-clients-edit" path="/our-clients/edit/:id" element={<EditClient />} />
]

export default partnersClientsRoutes
