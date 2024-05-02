import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const year = new Date().getFullYear();

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-indigo-600 text-white text-center p-4">
        <h1 className="text-xl font-bold">User Albums and Photos</h1>
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="bg-indigo-600 text-white p-4 text-center">
        &copy; {year} Made with ❤️
      </footer>
    </div>
  );
};

export default Layout;
