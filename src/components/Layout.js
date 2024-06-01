import Navbar from './Navbar.js'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="container">
        {children}
      </main>
    </>
  )
}
