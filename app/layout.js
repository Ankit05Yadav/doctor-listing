import './globals.css';

export const metadata = {
  title: 'Doctor Listing Page',
  description: 'Find and book appointments with the best doctors',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
} 