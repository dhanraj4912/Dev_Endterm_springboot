import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthPage } from './pages/AuthPage.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { AdminLayout } from './shell/AdminLayout.jsx'

import { DashboardPage } from './pages/DashboardPage.jsx'
import { ProductCatalogPage } from './pages/ProductCatalogPage.jsx'
import { InventoryPricingPage } from './pages/InventoryPricingPage.jsx'
import { RetailerManagementPage } from './pages/RetailerManagementPage.jsx'
import { CreditLimitsPage } from './pages/CreditLimitsPage.jsx'
import { OrderHistoryPage } from './pages/OrderHistoryPage.jsx'
import { CheckoutReviewPage } from './pages/CheckoutReviewPage.jsx'
import { OrderSuccessPage } from './pages/OrderSuccessPage.jsx'
import { SettingsPage } from './pages/SettingsPage.jsx'
import { SupportPage } from './pages/SupportPage.jsx'

export default function App() {
  return (
    <Routes>

      {/* Auth */}
      <Route path="/auth" element={<AuthPage />} />

      {/*  All pages inside AdminLayout */}
      <Route element={<AdminLayout />}>
        <Route path="/" element={<HomePage />} />   {/* Home */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/catalog" element={<ProductCatalogPage />} />
        <Route path="/inventory" element={<InventoryPricingPage />} />
        <Route path="/retailers" element={<RetailerManagementPage />} />
        <Route path="/credit" element={<CreditLimitsPage />} />
        <Route path="/orders" element={<OrderHistoryPage />} />
        <Route path="/checkout" element={<CheckoutReviewPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/support" element={<SupportPage />} />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}