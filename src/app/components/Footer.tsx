export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-sm text-gray-600 mb-2">
          © {new Date().getFullYear()} Fertilite Reproductive Medicine Clinic
        </p>
        <p className="text-xs text-gray-500 mb-3">
          Operated by Servicios de Medicina Reproductiva de Tijuana, S.C. (SEMERT)
        </p>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm">
          <a href="/privacy" className="text-teal-600 hover:text-teal-700 underline">Privacy Policy</a>
          <span className="text-gray-400">|</span>
          <a href="mailto:patients@fertilitecenter.com" className="text-teal-600 hover:text-teal-700 underline">Contact</a>
        </div>
      </div>
    </footer>
  );
}
