import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import MilestonesPage from './pages/MilestonesPage'
import MilestoneAlbumPage from './pages/MilestoneAlbumPage'
import GrowthCurvePage from './pages/GrowthCurvePage'
import GiftsPage from './pages/GiftsPage'
import DailyMomentsPage from './pages/DailyMomentsPage'
import TravelLaborDay2026Page from './pages/TravelLaborDay2026Page'
import TravelNationalDay2025Page from './pages/TravelNationalDay2025Page'
import AlbumListPage from './pages/AlbumListPage'
import AlbumDetailPage from './pages/AlbumDetailPage'
import MembershipsPage from './pages/MembershipsPage'
import NotFoundPage from './pages/NotFoundPage'

/** 路由切换时回到顶部 */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <ScrollToTop />
      <Nav />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/growth/milestones" element={<MilestonesPage />} />
          <Route path="/growth/curve" element={<GrowthCurvePage />} />
          <Route path="/growth/gifts" element={<GiftsPage />} />
          <Route path="/album/daily-moments" element={<DailyMomentsPage />} />
          <Route path="/travel/2026-labor-day" element={<TravelLaborDay2026Page />} />
          <Route path="/travel/2025-national-day" element={<TravelNationalDay2025Page />} />
          <Route path="/album" element={<AlbumListPage />} />
          <Route path="/album/milestones-xuanxuan" element={<MilestoneAlbumPage />} />
          <Route path="/album/:id" element={<AlbumDetailPage />} />
          <Route path="/membership" element={<MembershipsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
