import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa'

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '918169686040'
const CALL_NUMBER     = '8169686040'

export default function FloatingButtons() {
  const [hoverWa,   setHoverWa]   = useState(false)
  const [hoverCall, setHoverCall] = useState(false)

  const waMessage = encodeURIComponent('Hello! I would like to book an appointment at Shree Samarth Krupa Diagnostic Centre.')

  return (
    <div
      className="fixed bottom-6 right-4 sm:right-6 z-40 flex flex-col gap-3 items-end"
      role="complementary"
      aria-label="Quick contact buttons"
    >
      {/* WhatsApp Tooltip */}
      <AnimatePresence>
        {hoverWa && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute bottom-24 right-14 bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl pointer-events-none"
          >
            Chat on WhatsApp
            <span className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-full border-4 border-transparent border-l-slate-900" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call Tooltip */}
      <AnimatePresence>
        {hoverCall && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute bottom-6 right-14 bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl pointer-events-none"
          >
            Call Us Now
            <span className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-full border-4 border-transparent border-l-slate-900" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <motion.a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        id="floating-whatsapp-btn"
        onHoverStart={() => setHoverWa(true)}
        onHoverEnd={()  => setHoverWa(false)}
        onTouchStart={() => setHoverWa(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl text-white transition-colors"
      >
        {/* Pulse rings */}
        <span className="absolute inset-0 rounded-full bg-green-500 opacity-30 animate-ping" />
        <span className="absolute inset-0 rounded-full bg-green-500 opacity-20 animate-ping [animation-delay:0.5s]" />
        <FaWhatsapp className="text-2xl relative z-10" />
      </motion.a>

      {/* Call Button */}
      <motion.a
        href={`tel:${CALL_NUMBER}`}
        aria-label="Call us"
        id="floating-call-btn"
        onHoverStart={() => setHoverCall(true)}
        onHoverEnd={()  => setHoverCall(false)}
        onTouchStart={() => setHoverCall(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center shadow-xl text-white"
      >
        <FaPhoneAlt className="text-lg" />
      </motion.a>
    </div>
  )
}
