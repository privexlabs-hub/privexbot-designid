import '@/styles/fonts.css';
import '@/styles/tokens.generated.css';
import '@/styles/brand.css';

export const metadata = {
  title: 'PrivexBot — Brand ID',
  description:
    'The PrivexBot social brand kit: canvas, post editor, and playbook.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
