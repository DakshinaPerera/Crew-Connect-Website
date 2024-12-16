// app/admin/page.tsx
'use client';
import ProtectedRoute from '../components/ProtectedRoute';

const AdminPage = () => {
  return (
    <ProtectedRoute>
      <div>
        <h1 className="text-2xl mt-[65px]">Admin Dashboard</h1>
        {/* Your admin content */}
      </div>
    </ProtectedRoute>
  );
};

export default AdminPage;