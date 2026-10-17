import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar.jsx';

function AdminLayout() {
  return (
    <div className="container-fluid">
      <div className="row">
        <aside className="col-12 col-md-3 col-lg-2 bg-light border-end p-3">
          <AdminSidebar />
        </aside>
        <main className="col-12 col-md-9 col-lg-10 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;