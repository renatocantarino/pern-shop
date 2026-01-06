import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/clerk-react";

import Navbar from "./components/Navbar"
import { Routes, Route, Navigate } from "react-router"
import HomePage from "./pages/HomePage"
import ProductPage from "./pages/ProductPage"
import ProfilePage from "./pages/ProfilePage"
import CreatePage from "./pages/CreatePage"
import EditProductPage from "./pages/EditProductPage"


function App() {
  const isSignedIn = false;

  return (
    <>
      <div className="min-h-screen bg-base-100">
        <Navbar />
        <main className="max-w-5xl mx-auto px-2 py-2">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/profile" element={isSignedIn ? <ProfilePage /> : <Navigate to={"/"} />} />
            <Route path="/create" element={isSignedIn ? <CreatePage /> : <Navigate to={"/"} />} />
            <Route
              path="/edit/:id"
              element={isSignedIn ? <EditProductPage /> : <Navigate to={"/"} />}
            />
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App
