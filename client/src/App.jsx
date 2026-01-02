import { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function App() {
  const [url, setUrl] = useState('')
  const [slug, setSlug] = useState('')
  const [links, setLinks] = useState([])
  
  // Stats Modal State
  const [showStatsModal, setShowStatsModal] = useState(false)
  const [selectedLinkStats, setSelectedLinkStats] = useState(null)

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

  const fetchUrls = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/urls/`)
      if (response.ok) {
        const data = await response.json()
        const formattedLinks = data.map(item => ({
          id: item.id,
          original: item.original_url,
          short: `shrink.it/${item.short_key}`,
          real_short_key: item.short_key, // Store real key for fetching stats
          clicks: item.clicks_count,
          status: item.is_active ? 'Active' : 'Inactive'
        }))
        setLinks(formattedLinks.reverse())
      }
    } catch (error) {
      console.error('Error fetching URLs:', error)
    }
  }

  useEffect(() => {
    fetchUrls()
  }, [])

  const handleViewStats = async (shortKey) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/urls/${shortKey}/stats`)
      if (response.ok) {
        const data = await response.json()
        
        // Process clicks for charts
        const browserCounts = {}
        const osCounts = {}

        data.clicks.forEach(click => {
          const browser = click.browser || 'Unknown'
          const os = click.os || 'Unknown'
          browserCounts[browser] = (browserCounts[browser] || 0) + 1
          osCounts[os] = (osCounts[os] || 0) + 1
        })

        const browserData = Object.keys(browserCounts).map(key => ({ name: key, value: browserCounts[key] }))
        const osData = Object.keys(osCounts).map(key => ({ name: key, value: osCounts[key] }))

        setSelectedLinkStats({
          ...data,
          browserData,
          osData
        })
        setShowStatsModal(true)
      }
    } catch (error) {
      console.error("Error fetching stats:", error)
      alert("Failed to load stats")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/urls/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ original_url: url, custom_slug: slug || null }),
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
        short: `shrink.it/${data.short_key}`,
        real_short_key: data.short_key,
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
    <div className="min-h-screen bg-gray-50 font-sans relative">
      {/* Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">ShrinkIt Pro</h1>
          <div className="space-x-4">
            <button className="text-gray-600 hover:text-indigo-600 font-medium">Dashboard</button>
            <button className="text-gray-600 hover:text-indigo-600 font-medium">Analytics</button>
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
              {links.length > 0 ? links.reduce((prev, current) => (prev.clicks > current.clicks) ? prev : current).short : 'N/A'}
            </p>
          </div>
        </div>

        {/* Links Table */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Your Links</h2>
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
                      <p className="text-sm font-medium text-gray-900 truncate max-w-xs" title={link.original}>{link.original}</p>
                    </td>
                    <td className="px-6 py-4">
                      <a href={`${import.meta.env.VITE_API_URL}/${link.real_short_key}`} target="_blank" rel="noreferrer" className="text-sm text-indigo-600 font-semibold hover:underline">
                        {link.short}
                      </a>
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
                      <button 
                        onClick={() => handleViewStats(link.real_short_key)}
                        className="text-gray-400 hover:text-indigo-600 mr-3"
                        title="View Analytics"
                      >
                        📊
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Analytics Modal */}
      {showStatsModal && selectedLinkStats && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 relative">
            <button 
              onClick={() => setShowStatsModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            
            <h2 className="text-2xl font-bold mb-2 text-gray-900">Analytics Report</h2>
            <p className="text-gray-500 mb-8">Stats for <span className="text-indigo-600 font-mono">shrink.it/{selectedLinkStats.short_key}</span></p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Browser Chart */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4 text-center">Browsers</h3>
                <div className="h-64">
                  {selectedLinkStats.browserData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={selectedLinkStats.browserData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label
                        >
                          {selectedLinkStats.browserData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">No data yet</div>
                  )}
                </div>
              </div>

              {/* OS Chart */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4 text-center">Operating Systems</h3>
                <div className="h-64">
                  {selectedLinkStats.osData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={selectedLinkStats.osData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#82ca9d"
                          dataKey="value"
                          label
                        >
                          {selectedLinkStats.osData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">No data yet</div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-right">
              <button 
                onClick={() => setShowStatsModal(false)}
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
