import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import '../index.css'; // Vamos manter seus estilos globais por enquanto

export const metadata = {
  title: 'Portfolio | Dev',
  description: 'Impeccable portfolio with optimal performance',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}