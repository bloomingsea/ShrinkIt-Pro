import { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { QRCodeCanvas } from 'qrcode.react'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  const [url, setUrl] = useState('')
  const [slug, setSlug] = useState('')
  const [links, setLinks] = useState([])
  
  // Stats Modal State
  const [showStatsModal, setShowStatsModal] = useState(false)
  const [selectedLinkStats, setSelectedLinkStats] = useState(null)

  // QR Modal State
  const [showQrModal, setShowQrModal] = useState(false)
  const [selectedQrLink, setSelectedQrLink] = useState(null)

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
          real_short_key: item.short_key,
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

        setSelectedLinkStats({ ...data, browserData, osData })
        setShowStatsModal(true)
      }
    } catch (error) {
      console.error("Error fetching stats:", error)
      alert("Failed to load stats")
    }
  }

  const handleViewQr = (link) => {
    setSelectedQrLink(link)
    setShowQrModal(true)
  }

  const downloadQr = () => {
    const canvas = document.getElementById('qr-code-canvas')
    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
    const downloadLink = document.createElement('a')
    downloadLink.href = pngUrl
    downloadLink.download = `qrcode-${selectedQrLink.real_short_key}.png`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
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
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <Header />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Shortener Section */}
        <section className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100/50">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Shorten Your Links</h2>
            <p className="text-gray-500">Paste your long URL below to get a shorter, trackable version.</p>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-8">
              <input 
                type="url" 
                placeholder="Paste your long URL here (e.g. https://very-long-link.com)" 
                className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-gray-700 bg-gray-50 focus:bg-white"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>
            <div className="md:col-span-4 relative">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400 text-sm">/</span>
               </div>
              <input 
                type="text" 
                placeholder="Custom slug (optional)" 
                className="w-full pl-8 pr-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-gray-700 bg-gray-50 focus:bg-white"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
            <button 
              type="submit" 
              className="md:col-span-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition transform hover:scale-[1.01] active:scale-[0.99] shadow-lg hover:shadow-xl text-lg flex justify-center items-center gap-2"
            >
              <span>Shrink It Now</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </form>
        </section>

        {/* Dashboard Stats Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
               <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Total Links</p>
               <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">All Time</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{links.length}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
             <div className="flex items-center justify-between mb-4">
               <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Total Clicks</p>
               <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">Live</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{links.reduce((acc, curr) => acc + curr.clicks, 0)}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
             <div className="flex items-center justify-between mb-4">
               <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Top Performer</p>
               <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">Star</span>
            </div>
            <p className="text-lg font-bold text-indigo-600 truncate" title={links.length > 0 ? links.reduce((prev, current) => (prev.clicks > current.clicks) ? prev : current).short : ''}>
              {links.length > 0 ? links.reduce((prev, current) => (prev.clicks > current.clicks) ? prev : current).short : 'N/A'}
            </p>
          </div>
        </div>

        {/* Links Table */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-xl font-bold text-gray-900">Your Recent Links</h2>
            {/* <button className="text-indigo-600 text-sm font-semibold hover:underline">View All</button> */}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-8 py-4 font-semibold">Original URL</th>
                  <th className="px-8 py-4 font-semibold">Short Link</th>
                  <th className="px-8 py-4 font-semibold text-center">Clicks</th>
                  <th className="px-8 py-4 font-semibold">Status</th>
                  <th className="px-8 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {links.map((link) => (
                  <tr key={link.id} className="hover:bg-gray-50/80 transition duration-150 ease-in-out group">
                    <td className="px-8 py-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mr-3">
                           🌐
                        </div>
                        <p className="text-sm font-medium text-gray-900 truncate max-w-xs group-hover:text-indigo-600 transition-colors" title={link.original}>{link.original}</p>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <a href={`${import.meta.env.VITE_API_URL}/${link.real_short_key}`} target="_blank" rel="noreferrer" className="text-sm text-indigo-600 font-bold hover:underline bg-indigo-50 px-3 py-1 rounded-md">
                        {link.short}
                      </a>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {link.clicks}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${link.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${link.status === 'Active' ? 'bg-green-400' : 'bg-red-400'}`}></span>
                        {link.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end space-x-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleViewQr(link)}
                          className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                          title="View QR Code"
                        >
                          📱
                        </button>
                        <button 
                          onClick={() => handleViewStats(link.real_short_key)}
                          className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                          title="View Analytics"
                        >
                          📊
                        </button>
                         {/* <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition" title="Delete">
                          🗑️
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {links.length === 0 && (
               <div className="text-center py-12">
                  <p className="text-gray-400 text-lg">No links created yet. Start shrinking!</p>
               </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {/* Analytics Modal */}
      {showStatsModal && selectedLinkStats && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 relative animate-fade-in-up">
            <button 
              onClick={() => setShowStatsModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition"
            >
              ✕
            </button>
            
            <h2 className="text-2xl font-bold mb-2 text-gray-900">Analytics Report</h2>
            <p className="text-gray-500 mb-8">Stats for <span className="text-indigo-600 font-mono bg-indigo-50 px-2 py-1 rounded">shrink.it/{selectedLinkStats.short_key}</span></p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Browser Chart */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h3 className="text-lg font-semibold mb-6 text-center text-gray-700">Browsers</h3>
                <div className="h-64">
                  {selectedLinkStats.browserData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={selectedLinkStats.browserData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
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
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <span>No data yet</span>
                    </div>
                  )}
                </div>
              </div>

              {/* OS Chart */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h3 className="text-lg font-semibold mb-6 text-center text-gray-700">Operating Systems</h3>
                <div className="h-64">
                  {selectedLinkStats.osData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={selectedLinkStats.osData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#82ca9d"
                          paddingAngle={5}
                          dataKey="value"
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
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                       <span>No data yet</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-right">
              <button 
                onClick={() => setShowStatsModal(false)}
                className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-xl hover:bg-gray-200 transition font-medium"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQrModal && selectedQrLink && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 relative flex flex-col items-center animate-bounce-in">
            <button 
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-6 text-gray-900">QR Code</h2>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-inner mb-6">
              <QRCodeCanvas 
                id="qr-code-canvas"
                value={`${import.meta.env.VITE_API_URL}/${selectedQrLink.real_short_key}`} 
                size={200}
                level={"H"}
                includeMargin={true}
              />
            </div>
            <p className="text-sm text-gray-500 mb-6 text-center break-all font-mono bg-gray-50 px-3 py-1 rounded border border-gray-200">
              {import.meta.env.VITE_API_URL}/{selectedQrLink.real_short_key}
            </p>
            <button 
              onClick={downloadQr}
              className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl hover:bg-indigo-700 transition shadow-lg hover:shadow-indigo-500/30 flex justify-center items-center gap-2"
            >
              <span>Download PNG</span>
              <span>📥</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
