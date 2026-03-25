import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import '../index.css';

export const metadata = {
  title: 'Portfolio | Dev',
  description: 'Impeccable portfolio with optimal performance',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen antialiased">
        <Navbar />
        <main className="flex-grow pt-28">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}