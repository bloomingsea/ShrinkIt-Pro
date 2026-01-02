import { useState } from 'react'

function App() {
  const [url, setUrl] = useState('')
  const [slug, setSlug] = useState('')
  const [links, setLinks] = useState([
    { id: 1, original: 'https://google.com', short: 'shrink.it/ggl', clicks: 120, status: 'Active' },
    { id: 2, original: 'https://github.com', short: 'shrink.it/ghub', clicks: 450, status: 'Active' },
  ])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/urls/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          original_url: url,
          custom_slug: slug || null
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        alert(`Error: ${errorData.detail}`)
        return
      }

      const data = await response.json()
      
      const newLink = {
        id: data.id,
        original: data.original_url,
        short: `shrink.it/${data.short_key}`, // In production, use actual domain
        clicks: data.clicks_count,
        status: data.is_active ? 'Active' : 'Inactive'
      }
      
      setLinks([newLink, ...links])
      setUrl('')
      setSlug('')
    } catch (error) {
      console.error('Error shrinking URL:', error)
      alert('Failed to connect to the server.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">ShrinkIt Pro</h1>
          <div className="space-x-4">
            <button className="text-gray-600 hover:text-indigo-600 font-medium">Dashboard</button>
            <button className="text-gray-600 hover:text-indigo-600 font-medium">Analytics</button>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">Log Out</button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Shortener Section */}
        <section className="bg-white rounded-2xl shadow-xl p-8 mb-10">
          <h2 className="text-xl font-semibold mb-6">Create New Short Link</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <input 
                type="url" 
                placeholder="Paste your long URL here (e.g. https://very-long-link.com)" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>
            <div>
              <input 
                type="text" 
                placeholder="Custom slug (optional)" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
            <button 
              type="submit" 
              className="md:col-span-3 bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition transform hover:scale-[1.01] active:scale-[0.99]"
            >
              Shrink It! ⚙️
            </button>
          </form>
        </section>

        {/* Dashboard Stats Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Total Links</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{links.length}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Total Clicks</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{links.reduce((acc, curr) => acc + curr.clicks, 0)}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Top Link</p>
            <p className="text-lg font-bold text-indigo-600 mt-1 truncate">
              {links.reduce((prev, current) => (prev.clicks > current.clicks) ? prev : current).short}
            </p>
          </div>
        </div>

        {/* Links Table */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Your Links</h2>
            <button className="text-indigo-600 text-sm font-semibold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-medium">Original URL</th>
                  <th className="px-6 py-4 font-medium">Short Link</th>
                  <th className="px-6 py-4 font-medium text-center">Clicks</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {links.map((link) => (
                  <tr key={link.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900 truncate max-w-xs">{link.original}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-indigo-600 font-semibold">{link.short}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold">
                        {link.clicks}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center text-xs font-medium text-green-700">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        {link.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 hover:text-indigo-600 mr-3">📊</button>
                      <button className="text-gray-400 hover:text-red-500">🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
