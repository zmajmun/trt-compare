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
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, background: "#0a0a0f" }}>
        {children}
      </body>
    </html>
  );
}
