function Footer() {
  const currentYear = new Date().getFullYear(); // Get current year

  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-8 mb-6">
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
            About Us
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
            Contact
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
            Terms of Service
          </a>
        </div>
        <p className="text-center text-gray-500">
          &copy; {currentYear} JobSeek. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;