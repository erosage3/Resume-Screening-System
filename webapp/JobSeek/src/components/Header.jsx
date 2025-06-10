function Header() {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 px-4 md:px-10 py-4 bg-white">
      <div className="flex items-center gap-3 text-gray-900">
        <div className="w-6 h-6">
          <svg viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M44 11.27C44 14.01 39.84 16.4 33.69 17.64C39.84 18.88 44 21.26 44 24C44 26.74 39.84 29.12 33.69 30.36C39.84 31.6 44 33.99 44 36.73C44 40.74 35.05 44 24 44C12.95 44 4 40.74 4 36.73C4 33.99 8.16 31.6 14.31 30.36C8.16 29.12 4 26.74 4 24C4 21.26 8.16 18.88 14.31 17.64C8.16 16.4 4 14.01 4 11.27C4 7.26 12.95 4 24 4C35.05 4 44 7.26 44 11.27Z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold">JobSeek</h2>
      </div>
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
        <a href="#" className="hover:text-gray-900 transition-colors">For Job Seekers</a>
        <a href="#" className="hover:text-gray-900 transition-colors">For Recruiters</a>
        <div className="flex gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Log In
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded-lg font-medium transition-colors">
            Sign Up
          </button>
        </div>
      </nav>
      
      {/* Mobile menu button */}
      <button className="md:hidden p-2">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </header>
  );
}

export default Header