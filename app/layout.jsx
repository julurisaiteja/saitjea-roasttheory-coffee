import './globals.css';
import { CartProvider } from '../lib/cart';
import Shell from '../components/Shell';
export const metadata = { title: 'Roast Theory — Origin science. Cup poetry.', description: "Specialty coffee with origin stories, grind/roast selectors, and subscriptions." };
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Raleway:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body><CartProvider><Shell>{children}</Shell></CartProvider></body>
    </html>
  );
}
