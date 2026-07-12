// ─── Date Formatting ─────────────────────
export function formatDate(date) {
  if (!date) return '—'
  const d = new Date(date)
  return d.toLocaleDateString('en-IN', {
    day:   '2-digit',
    month: 'short',
    year:  'numeric',
  })
}

// ─── Currency Formatting ─────────────────
export function formatCurrency(amount) {
  if (amount == null) return '—'
  return new Intl.NumberFormat('en-IN', {
    style:    'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

// ─── WhatsApp Message ─────────────────────
export function generateWhatsAppMessage(appointment) {
  const {
    patientName,
    mobile,
    test,
    packageName,
    preferredDate,
    preferredTime,
    homeCollection,
    address,
  } = appointment

  const lines = [
    `🏥 *Shree Samarth Krupa Diagnostic Centre*`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `📋 *New Appointment Request*`,
    ``,
    `👤 *Patient:* ${patientName}`,
    `📞 *Mobile:* ${mobile}`,
    test        ? `🔬 *Test:* ${test}` : null,
    packageName ? `📦 *Package:* ${packageName}` : null,
    preferredDate ? `📅 *Date:* ${preferredDate}` : null,
    preferredTime ? `⏰ *Time:* ${preferredTime}` : null,
    homeCollection ? `🏠 *Home Collection:* Yes` : null,
    address && homeCollection ? `📍 *Address:* ${address}` : null,
    ``,
    `━━━━━━━━━━━━━━━━━━━━`,
    `_Please confirm the appointment at your earliest convenience._`,
  ].filter(Boolean)

  return lines.join('\n')
}

// ─── Open WhatsApp ───────────────────────
export function openWhatsApp(number, message) {
  const phone = String(number).replace(/\D/g, '')
  const encoded = encodeURIComponent(message)
  window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank')
}

// ─── Truncate Text ───────────────────────
export function truncateText(text, length = 120) {
  if (!text) return ''
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '…'
}

// ─── Slugify ─────────────────────────────
export function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// ─── Time Slots ──────────────────────────
export const TIME_SLOTS = [
  '07:00 AM', '07:30 AM',
  '08:00 AM', '08:30 AM',
  '09:00 AM', '09:30 AM',
  '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM',
  '01:00 PM', '01:30 PM',
  '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM',
  '05:00 PM', '05:30 PM',
  '06:00 PM',
]

// ─── Get status badge color ───────────────
export function getStatusColor(status) {
  const map = {
    pending:   'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    confirmed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    approved:  'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    rejected:  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    read:      'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
    unread:    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  }
  return map[status?.toLowerCase()] || 'bg-gray-100 text-gray-600'
}
