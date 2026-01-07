import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const MainLayout = () => {
  return (
    <main
      className="min-h-screen bg-cover bg-center"
      style={{
        // backgroundImage: "url('/images/1.jpg')",
        backgroundColor: '#b8e6e6',
      }}
    >
      {/* Ví dụ: Header */}
      <Header />

      <div className="mx-4 mt-18">
        <Outlet />
      </div>

      {/* Ví dụ: Footer */}
      {/* <Footer /> */}
    </main>
  );
};

export default MainLayout;
