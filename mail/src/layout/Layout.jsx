// Layout.js
import { Outlet } from 'react-router-dom';
import Navbar from 'src/components/navbar/Navbar';

function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />  {/* Nested route components will render here */}
      </main>
    </>
  );
}

export default Layout;
