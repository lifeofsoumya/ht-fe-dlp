import Sidebar from '../components/Sidebar';
import '@/styles/globals.css'; // Global styles

export const metadata = {
  title: 'Sensitive Data Dashboard',
  description: 'Dashboard for data governance and sensitive data detection',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head />
      <body>
        <div className="container">
          <Sidebar />
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
