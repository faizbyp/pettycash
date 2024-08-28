import './globals.css';

export const metadata = {
  title: 'Petty Cash KPN',
  description: 'Petty Cash System KNP Corp',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
