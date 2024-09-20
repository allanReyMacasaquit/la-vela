import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';

const font = Montserrat({
	subsets: ['latin'],
	variable: '--font-geist-sans',
	weight: ['100', '200', '500', '700', '900'],
});

export const metadata: Metadata = {
	title: 'La vela',
	description: 'Watch Great News',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<AuthProvider>
			<html lang='en'>
				<body className={`${font.variable}  antialiased`}>{children}</body>
			</html>
		</AuthProvider>
	);
}
