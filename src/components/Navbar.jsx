function Navbar({ onToggleSidebar }) {
  return (
    <nav className="bg-devops-dark border-b border-devops-light-gray px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded bg-white/5 text-gray-200 mr-2"
            aria-label="Toggle sidebar"
          >
            ☰
          </button>
          <h1 className="text-lg sm:text-2xl font-bold text-white">
            <span className="text-devops-blue">DevSecOps</span> Pipeline Visualizer
          </h1>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <span className="text-sm text-gray-400">Enterprise CI/CD Pipeline</span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

