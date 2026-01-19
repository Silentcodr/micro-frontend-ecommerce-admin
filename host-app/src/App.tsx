import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import { UserProvider } from './context/UserContext';
import Settings from './pages/Settings';
import './App.css';

// Lazy load remote components
const ProductList = React.lazy(() => import('productApp/ProductList'));
const OrderList = React.lazy(() => import('orderApp/OrderList'));
const Dashboard = React.lazy(() => import('analyticsApp/Dashboard'));

function App() {
  return (
    <UserProvider>
      <Router>
        <DashboardLayout>
          <Suspense fallback={<div className="p-4">Loading remote module...</div>}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/analytics" element={<Dashboard />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/orders" element={<OrderList />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Suspense>
        </DashboardLayout>
      </Router>
    </UserProvider>
  );
}

export default App;
