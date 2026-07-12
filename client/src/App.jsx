import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { lazy, Suspense } from 'react'

// Layout
import Layout from './components/layout/Layout.jsx'
import PageTransition from './components/common/PageTransition.jsx'

// Public Pages
const Home            = lazy(() => import('./pages/Home.jsx'))
const About           = lazy(() => import('./pages/About.jsx'))
const Services        = lazy(() => import('./pages/Services.jsx'))
const Packages        = lazy(() => import('./pages/Packages.jsx'))
const HomeCollection  = lazy(() => import('./pages/HomeCollection.jsx'))
const BookAppointment = lazy(() => import('./pages/BookAppointment.jsx'))
const Gallery         = lazy(() => import('./pages/Gallery.jsx'))
const Testimonials    = lazy(() => import('./pages/Testimonials.jsx'))
const FAQ             = lazy(() => import('./pages/FAQ.jsx'))
const Contact         = lazy(() => import('./pages/Contact.jsx'))
const DownloadReport  = lazy(() => import('./pages/DownloadReport.jsx'))
const NotFound        = lazy(() => import('./pages/NotFound.jsx'))

// Admin Pages
const AdminLogin      = lazy(() => import('./admin/Login.jsx'))
const AdminLayout     = lazy(() => import('./admin/components/AdminLayout.jsx'))
const Dashboard       = lazy(() => import('./admin/Dashboard.jsx'))
const AdminAppointments = lazy(() => import('./admin/Appointments.jsx'))
const AdminTests      = lazy(() => import('./admin/Tests.jsx'))
const AdminPackages   = lazy(() => import('./admin/Packages.jsx'))
const AdminGallery    = lazy(() => import('./admin/Gallery.jsx'))
const AdminTestimonials = lazy(() => import('./admin/Testimonials.jsx'))
const AdminMessages   = lazy(() => import('./admin/Messages.jsx'))
const AdminFAQ        = lazy(() => import('./admin/FAQ.jsx'))
const AdminOffers     = lazy(() => import('./admin/Offers.jsx'))
const AdminSettings   = lazy(() => import('./admin/Settings.jsx'))

// Loading fallback
import LoadingFallback from './components/common/LoadingSkeleton.jsx'

function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingFallback page />}>
        <Routes location={location} key={location.pathname}>
          {/* Public Routes with Layout */}
          <Route element={<Layout />}>
            <Route path="/"                 element={<PageTransition><Home /></PageTransition>} />
            <Route path="/about"            element={<PageTransition><About /></PageTransition>} />
            <Route path="/services"         element={<PageTransition><Services /></PageTransition>} />
            <Route path="/packages"         element={<PageTransition><Packages /></PageTransition>} />
            <Route path="/home-collection"  element={<PageTransition><HomeCollection /></PageTransition>} />
            <Route path="/book-appointment" element={<PageTransition><BookAppointment /></PageTransition>} />
            <Route path="/download-report"  element={<PageTransition><DownloadReport /></PageTransition>} />
            <Route path="/gallery"          element={<PageTransition><Gallery /></PageTransition>} />
            <Route path="/testimonials"     element={<PageTransition><Testimonials /></PageTransition>} />
            <Route path="/faq"              element={<PageTransition><FAQ /></PageTransition>} />
            <Route path="/contact"          element={<PageTransition><Contact /></PageTransition>} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<PageTransition><AdminLogin /></PageTransition>} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index             element={<Dashboard />} />
            <Route path="dashboard"  element={<Dashboard />} />
            <Route path="appointments" element={<AdminAppointments />} />
            <Route path="tests"      element={<AdminTests />} />
            <Route path="packages"   element={<AdminPackages />} />
            <Route path="gallery"    element={<AdminGallery />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="messages"   element={<AdminMessages />} />
            <Route path="faqs"       element={<AdminFAQ />} />
            <Route path="offers"     element={<AdminOffers />} />
            <Route path="settings"   element={<AdminSettings />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  )
}

export default App
