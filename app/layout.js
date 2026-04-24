export const metadata = {
  title: "TRT Price Comparison 2026 — MangoRx vs. Competition",
  description: "Transparent, amortized all-in monthly and annual pricing for the top testosterone therapy providers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, background: "#f7f6f3" }}>
        {children}
      </body>
    </html>
  );
}
