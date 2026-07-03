import React from 'react'
import { Route } from 'react-router-dom'
import NotesRegistrations from '../pages/notes/NotesRegistrations'
import NotesWishlist from '../pages/notes/NotesWishlist'
import NotesCategory from '../pages/notes/NotesCategory'
import NotesSubCategory from '../pages/notes/NotesSubCategory'
import AllNotes from '../pages/notes/AllNotes'
import AddNotesSubCategory from '../pages/notes/AddNotesSubCategory'
import AddNotes from '../pages/notes/AddNotes'

const notesRoutes = [
  <Route key="wishlist-notes" path="/wishlist/notes" element={<NotesWishlist />} />
]

export default notesRoutes
