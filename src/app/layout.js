import "@/styles/globals.css";

export const metadata = {
	title: "next.js-pocketbase-config-guide",
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body>{children}</body>
		</html>
	);
}
