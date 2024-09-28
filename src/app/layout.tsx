export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en">
          <body>
              <header>
                  <h1>My CMS</h1>
              </header>
              {children}
          </body>
      </html>
  );
}
