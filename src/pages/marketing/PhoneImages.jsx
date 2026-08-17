import { useState, useEffect, useRef } from 'react'
import { Trash2, Pencil, Upload, X, Image } from 'lucide-react'
import axios from 'axios'
import { BASE_URL } from '../../config/api'

export default function PhoneImages() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [uploadLoading, setUploadLoading] = useState(false)

  // Upload / Add modal
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [addForm, setAddForm] = useState({ title: '', image: null, preview: null })

  // Edit modal
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [editForm, setEditForm] = useState({ title: '', image: null, preview: null })

  const addFileRef = useRef()
  const editFileRef = useRef()

  // ─── 1. GET all phone images ───────────────────────────────────────────────
  const fetchImages = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get(`${BASE_URL}/myadmin/phone-images/`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.data?.status) {
        setImages(res.data.data || [])
      } else {
        setImages(res.data || [])
      }
    } catch (err) {
      console.error('Error fetching phone images:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchImages() }, [])

  // ─── 2. POST upload phone image ───────────────────────────────────────────
  const handleUpload = async (e) => {
    e.preventDefault()
    if (!addForm.image) { window.customAlert('Please select an image'); return }
    setUploadLoading(true)
    try {
      const token = localStorage.getItem('token')
      const payload = new FormData()
      payload.append('phone_image', addForm.image)
      if (addForm.title) payload.append('title', addForm.title)

      const res = await axios.post(
        `${BASE_URL}/myadmin/phone-images/upload`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (res.data?.status || res.status === 200 || res.status === 201) {
        await window.customAlert(res.data?.message || 'Image uploaded successfully')
        setIsAddOpen(false)
        setAddForm({ title: '', image: null, preview: null })
        fetchImages()
      } else {
        await window.customAlert(res.data?.message || 'Upload failed')
      }
    } catch (err) {
      console.error('Upload error:', err)
      await window.customAlert(err.response?.data?.message || 'Error uploading image')
    } finally {
      setUploadLoading(false)
    }
  }

  // ─── 3. PUT update phone image ────────────────────────────────────────────
  const handleUpdate = async (e) => {
    e.preventDefault()
    setUploadLoading(true)
    try {
      const token = localStorage.getItem('token')
      const payload = new FormData()
      if (editForm.title) payload.append('title', editForm.title)
      if (editForm.image) payload.append('phone_image', editForm.image)

      const res = await axios.put(
        `${BASE_URL}/myadmin/phone-images/${editItem._id}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (res.data?.status || res.status === 200) {
        await window.customAlert(res.data?.message || 'Image updated successfully')
        setIsEditOpen(false)
        setEditItem(null)
        fetchImages()
      } else {
        await window.customAlert(res.data?.message || 'Update failed')
      }
    } catch (err) {
      console.error('Update error:', err)
      await window.customAlert(err.response?.data?.message || 'Error updating image')
    } finally {
      setUploadLoading(false)
    }
  }

  // ─── 4. DELETE phone image ────────────────────────────────────────────────
  const handleDelete = async (id) => {
    const confirm = await window.customConfirm?.('Are you sure you want to delete this image?')
    if (confirm === false) return
    try {
      const token = localStorage.getItem('token')
      const res = await axios.delete(
        `${BASE_URL}/myadmin/phone-images/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (res.data?.status || res.status === 200) {
        await window.customAlert(res.data?.message || 'Image deleted successfully')
        fetchImages()
      } else {
        await window.customAlert(res.data?.message || 'Delete failed')
      }
    } catch (err) {
      console.error('Delete error:', err)
      await window.customAlert(err.response?.data?.message || 'Error deleting image')
    }
  }

  const openEdit = (item) => {
    setEditItem(item)
    setEditForm({ title: item.title || '', image: null, preview: null })
    setIsEditOpen(true)
  }

  const onAddFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setAddForm(prev => ({ ...prev, image: file, preview: URL.createObjectURL(file) }))
  }

  const onEditFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setEditForm(prev => ({ ...prev, image: file, preview: URL.createObjectURL(file) }))
  }

  return (
    <div className="h-full animate-fade-in-up">

      {/* Header */}
      <div className="bg-[#144f36] rounded-t-2xl p-5 flex justify-between items-center shadow-md mb-5">
        <h2 className="text-white font-bold tracking-tight text-xl">Phone Images</h2>
        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 bg-white text-[#144f36] hover:bg-green-50 px-4 py-2 rounded-lg text-sm font-semibold shadow transition-all"
        >
          <Upload size={15} />
          Upload Image
        </button>
      </div>

      {/* Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        {loading ? (
          <div className="py-16 text-center text-gray-400">Loading...</div>
        ) : images.length === 0 ? (
          <div className="py-16 text-center text-gray-400 flex flex-col items-center gap-3">
            <Image size={40} strokeWidth={1} />
            <p>No phone images found. Upload one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {images.map((item) => (
              <div
                key={item._id}
                className="group relative border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all bg-gray-50"
              >
                <img
                  src={item.image_url || item.image || item.url}
                  alt={item.title || 'Phone Image'}
                  className="w-full aspect-[9/16] object-cover"
                  onError={e => { e.target.src = 'https://placehold.co/180x320?text=Image' }}
                />
                {item.title && (
                  <div className="px-2 py-1.5 text-xs text-gray-700 font-medium truncate border-t border-gray-100">
                    {item.title}
                  </div>
                )}
                {/* Action overlay */}
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openEdit(item)}
                    className="bg-white hover:bg-blue-50 border border-gray-200 p-1.5 rounded-lg shadow text-blue-600 transition-colors"
                    title="Edit"
                  >
                    <Pencil size={13} />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-white hover:bg-red-50 border border-gray-200 p-1.5 rounded-lg shadow text-red-500 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ─── Upload Modal ─────────────────────────────────────────────────── */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="flex justify-between items-center px-5 py-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-800">Upload Phone Image</h3>
              <button onClick={() => { setIsAddOpen(false); setAddForm({ title: '', image: null, preview: null }) }}>
                <X size={18} className="text-gray-400 hover:text-gray-600" />
              </button>
            </div>
            <form onSubmit={handleUpload} className="px-5 py-5 space-y-4">
              {/* Image picker */}
              <div
                onClick={() => addFileRef.current.click()}
                className="border-2 border-dashed border-gray-300 hover:border-[#144f36] rounded-xl cursor-pointer flex flex-col items-center justify-center py-6 transition-colors"
              >
                {addForm.preview ? (
                  <img src={addForm.preview} alt="preview" className="max-h-48 rounded-lg object-contain" />
                ) : (
                  <>
                    <Upload size={28} className="text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Click to select image</p>
                  </>
                )}
                <input ref={addFileRef} type="file" accept="image/*" className="hidden" onChange={onAddFile} />
              </div>
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title <span className="text-gray-400 text-xs">(optional)</span></label>
                <input
                  type="text"
                  value={addForm.title}
                  onChange={e => setAddForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter image title"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36]"
                />
              </div>
              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  disabled={uploadLoading || !addForm.image}
                  className="px-6 py-2 bg-[#144f36] hover:bg-[#0f3d2a] text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-60"
                >
                  {uploadLoading ? 'Uploading...' : 'Upload'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── Edit Modal ───────────────────────────────────────────────────── */}
      {isEditOpen && editItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="flex justify-between items-center px-5 py-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-800">Edit Phone Image</h3>
              <button onClick={() => { setIsEditOpen(false); setEditItem(null) }}>
                <X size={18} className="text-gray-400 hover:text-gray-600" />
              </button>
            </div>
            <form onSubmit={handleUpdate} className="px-5 py-5 space-y-4">
              {/* Image picker */}
              <div
                onClick={() => editFileRef.current.click()}
                className="border-2 border-dashed border-gray-300 hover:border-[#144f36] rounded-xl cursor-pointer flex flex-col items-center justify-center py-6 transition-colors"
              >
                {editForm.preview ? (
                  <img src={editForm.preview} alt="preview" className="max-h-48 rounded-lg object-contain" />
                ) : (
                  <>
                    <img
                      src={editItem.image_url || editItem.image || editItem.url}
                      alt="current"
                      className="max-h-48 rounded-lg object-contain mb-2"
                      onError={e => { e.target.src = 'https://placehold.co/180x320?text=Image' }}
                    />
                    <p className="text-xs text-gray-400">Click to change image</p>
                  </>
                )}
                <input ref={editFileRef} type="file" accept="image/*" className="hidden" onChange={onEditFile} />
              </div>
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title <span className="text-gray-400 text-xs">(optional)</span></label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={e => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter image title"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#144f36] focus:ring-1 focus:ring-[#144f36]"
                />
              </div>
              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  disabled={uploadLoading}
                  className="px-6 py-2 bg-[#144f36] hover:bg-[#0f3d2a] text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-60"
                >
                  {uploadLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
