import { Routes, Route, Navigate } from 'react-router-dom';

import StoreLayout from './components/layout/StoreLayout.jsx';
import AdminLayout from './components/layout/AdminLayout.jsx';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';

// Tienda
import HomePage from './pages/store/HomePage.jsx';
import ProductosPage from './pages/store/ProductosPage.jsx';
import DetalleProductoPage from './pages/store/DetalleProductoPage.jsx';
import CategoriasPage from './pages/store/CategoriasPage.jsx';
import CategoriaDetallePage from './pages/store/CategoriaDetallePage.jsx';
import OfertasPage from './pages/store/OfertasPage.jsx';
import RegistroPage from './pages/store/RegistroPage.jsx';
import LoginPage from './pages/store/LoginPage.jsx';
import NosotrosPage from './pages/store/NosotrosPage.jsx';
import BlogsPage from './pages/store/BlogsPage.jsx';
import BlogDetallePage from './pages/store/BlogDetallePage.jsx';
import ContactoPage from './pages/store/ContactoPage.jsx';
import CarritoPage from './pages/store/CarritoPage.jsx';
import CheckoutPage from './pages/store/CheckoutPage.jsx';
import PagoCorrectoPage from './pages/store/PagoCorrectoPage.jsx';
import PagoErrorPage from './pages/store/PagoErrorPage.jsx';

// Administrador
import AdminHomePage from './pages/admin/AdminHomePage.jsx';
import AdminOrdenesPage from './pages/admin/AdminOrdenesPage.jsx';
import AdminBoletaPage from './pages/admin/AdminBoletaPage.jsx';
import AdminProductosPage from './pages/admin/AdminProductosPage.jsx';
import AdminProductoFormPage from './pages/admin/AdminProductoFormPage.jsx';
import AdminProductosCriticosPage from './pages/admin/AdminProductosCriticosPage.jsx';
import AdminReportesProductosPage from './pages/admin/AdminReportesProductosPage.jsx';
import AdminCategoriasPage from './pages/admin/AdminCategoriasPage.jsx';
import AdminCategoriaFormPage from './pages/admin/AdminCategoriaFormPage.jsx';
import AdminUsuariosPage from './pages/admin/AdminUsuariosPage.jsx';
import AdminUsuarioFormPage from './pages/admin/AdminUsuarioFormPage.jsx';
import AdminHistorialComprasPage from './pages/admin/AdminHistorialComprasPage.jsx';
import AdminReportesPage from './pages/admin/AdminReportesPage.jsx';
import AdminPerfilPage from './pages/admin/AdminPerfilPage.jsx';

function App() {
  return (
    <Routes>
      {/* ===== TIENDA (pública) ===== */}
      <Route element={<StoreLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/productos/:codigo" element={<DetalleProductoPage />} />
        <Route path="/categorias" element={<CategoriasPage />} />
        <Route path="/categorias/:id" element={<CategoriaDetallePage />} />
        <Route path="/ofertas" element={<OfertasPage />} />
        <Route path="/registro" element={<RegistroPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/nosotros" element={<NosotrosPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:id" element={<BlogDetallePage />} />
        <Route path="/contacto" element={<ContactoPage />} />
        <Route path="/carrito" element={<CarritoPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/pago-exitoso" element={<PagoCorrectoPage />} />
        <Route path="/pago-error" element={<PagoErrorPage />} />
      </Route>

      {/* ===== ADMINISTRADOR (protegida por rol) ===== */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={['Administrador', 'Vendedor']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminHomePage />} />
        <Route path="ordenes" element={<AdminOrdenesPage />} />
        <Route path="ordenes/:id" element={<AdminBoletaPage />} />
        <Route path="productos" element={<AdminProductosPage />} />
        <Route path="productos/nuevo" element={<AdminProductoFormPage />} />
        <Route path="productos/criticos" element={<AdminProductosCriticosPage />} />
        <Route path="productos/reportes" element={<AdminReportesProductosPage />} />
        <Route path="productos/:codigo/editar" element={<AdminProductoFormPage />} />
        <Route path="categorias" element={<AdminCategoriasPage />} />
        <Route path="categorias/nueva" element={<AdminCategoriaFormPage />} />
        <Route path="categorias/:id/editar" element={<AdminCategoriaFormPage />} />
        <Route path="usuarios" element={<AdminUsuariosPage />} />
        <Route path="usuarios/nuevo" element={<AdminUsuarioFormPage />} />
        <Route path="usuarios/:run/editar" element={<AdminUsuarioFormPage />} />
        <Route path="usuarios/:run/historial" element={<AdminHistorialComprasPage />} />
        <Route path="reportes" element={<AdminReportesPage />} />
        <Route path="perfil" element={<AdminPerfilPage />} />
      </Route>

      {/* Cualquier ruta desconocida vuelve al inicio */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;