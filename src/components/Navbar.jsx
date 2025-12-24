function Navbar() {
  return (
    <nav className="bg-devops-dark border-b border-devops-light-gray px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">
          <span className="text-devops-blue">DevSecOps</span> Pipeline Visualizer
        </h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-400">Enterprise CI/CD Pipeline</span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

