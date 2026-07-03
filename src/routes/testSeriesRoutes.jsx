import React from 'react'
import { Route } from 'react-router-dom'
import TestSeriesCategory from '../pages/test-series/TestSeriesCategory'
import TestSeriesPackages from '../pages/test-series/TestSeriesPackages'
import TestSeriesRegistrations from '../pages/test-series/TestSeriesRegistrations'
import TestSeriesWishlist from '../pages/test-series/TestSeriesWishlist'
import AddTestSeriesCategory from '../pages/test-series/AddTestSeriesCategory'
import AddTestSeriesPackage from '../pages/test-series/AddTestSeriesPackage'
import PackageView from '../pages/test-series/PackageView'

const testSeriesRoutes = [
  <Route key="wishlist-test-series" path="/wishlist/test-series" element={<TestSeriesWishlist />} />,
  <Route key="test-series" path="/test-series" element={<TestSeriesCategory />} />,
  <Route key="test-series-category" path="/test-series/category" element={<TestSeriesCategory />} />,
  <Route key="test-series-category-add" path="/test-series/category/add" element={<AddTestSeriesCategory />} />,
  <Route key="test-series-packages" path="/test-series/packages" element={<TestSeriesPackages />} />,
  <Route key="test-series-packages-add" path="/test-series/packages/add" element={<AddTestSeriesPackage />} />,
  <Route key="test-series-packages-view" path="/test-series/packages/view/:id" element={<PackageView />} />
]

export default testSeriesRoutes
