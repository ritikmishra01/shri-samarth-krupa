import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { FaTrash, FaCheck, FaEnvelopeOpen } from 'react-icons/fa'

export default function Messages() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('messages') || '[]')
    setMessages(list)
  }, [])

  const handleMarkRead = (id) => {
    const updated = messages.map(msg => {
      if (msg.id === id) {
        return { ...msg, is_read: 1 }
      }
      return msg
    })
    setMessages(updated)
    localStorage.setItem('messages', JSON.stringify(updated))
    toast.success('Message marked as read.')
  }

  const handleDelete = (id) => {
    const filtered = messages.filter(msg => msg.id !== id)
    setMessages(filtered)
    localStorage.setItem('messages', JSON.stringify(filtered))
    toast.success('Message deleted.')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-slate-800 dark:text-white">Contact Messages</h1>
        <p className="text-xs text-slate-400">View and respond to inquiries submitted via the public contact form.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl p-6 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 font-bold uppercase">
                <th className="pb-3">Sender Details</th>
                <th className="pb-3">Message Body</th>
                <th className="pb-3">Date Received</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {messages.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-slate-400 font-semibold">
                    No contact messages in your inbox.
                  </td>
                </tr>
              ) : (
                messages.map((msg, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/30">
                    <td className="py-4">
                      <p className="font-bold text-slate-800 dark:text-white">{msg.name}</p>
                      <p className="text-[10px] text-slate-400">{msg.phone} {msg.email ? `· ${msg.email}` : ''}</p>
                    </td>
                    <td className="py-4 text-slate-600 dark:text-slate-300 max-w-sm truncate">"{msg.message}"</td>
                    <td className="py-4 text-slate-400 font-medium">{msg.created_at.split('T')[0]}</td>
                    <td className="py-4">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                        msg.is_read ? 'bg-slate-100 text-slate-500' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {msg.is_read ? 'Read' : 'New'}
                      </span>
                    </td>
                    <td className="py-4 text-right space-x-2">
                      {!msg.is_read && (
                        <button onClick={() => handleMarkRead(msg.id)} className="p-1.5 bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-all" title="Mark as Read">
                          <FaEnvelopeOpen className="text-xs" />
                        </button>
                      )}
                      <button onClick={() => handleDelete(msg.id)} className="p-1.5 bg-slate-100 dark:bg-slate-700 text-slate-500 hover:bg-red-500 hover:text-white rounded-lg transition-all" title="Delete Message">
                        <FaTrash className="text-xs" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
