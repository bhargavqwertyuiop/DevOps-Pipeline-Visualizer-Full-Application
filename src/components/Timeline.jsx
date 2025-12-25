function Timeline({ events = [] }) {
    return (
        <div className="space-y-2">
            {events.map((e, i) => (
                <div key={i} className="flex items-start">
                    <div className="w-10 text-xs text-gray-400">{e.t}</div>
                    <div className="flex-1 text-sm text-gray-200">{e.event}</div>
                </div>
            ))}
        </div>
    )
}

export default Timeline
