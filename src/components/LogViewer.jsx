function LogViewer({ logs = [] }) {
    return (
        <div className="bg-black/40 rounded p-3 font-mono text-xs text-gray-200 max-h-44 overflow-y-auto">
            {logs.map((l, i) => (
                <div key={i} className="mb-2">
                    <div className="text-xs text-gray-400">[{i + 1}]</div>
                    <div>{l}</div>
                </div>
            ))}
        </div>
    )
}

export default LogViewer
