import { eventOccursOnDay, getEventPosition, hexToRgba } from './EventHelpers'

function getMonthGridDays(monthDate) {
  const year = monthDate.getFullYear()
  const month = monthDate.getMonth()

  const firstOfMonth = new Date(year, month, 1)
  const startOffset = firstOfMonth.getDay()

  const gridStart = new Date(firstOfMonth)
  gridStart.setDate(gridStart.getDate() - startOffset) 

  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(gridStart)
    d.setDate(gridStart.getDate() + i)
    return d
  })
}


export function MonthGrid({ selectedMonth, events, onDayClick }) {
  const monthDays = getMonthGridDays(selectedMonth) 
  return (
    <div className="border border-divider/10 rounded-lg overflow-hidden shadow-lg shadow-black/15" style={{ height: '600px' }}>
      {/* weekday header row */}
      <div className="grid grid-cols-7 border-b border-divider/10 bg-surface">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
          <div key={d} className="text-center text-xs py-2 text-text/60">{d}</div>
        ))}
      </div>

      {/* 6x7 grid */}
      <div className="grid grid-cols-7">
        {monthDays.map(day => {
          const dayEvents = events.filter(e => eventOccursOnDay(e, day))
          const isCurrentMonth = day.getMonth() === selectedMonth.getMonth()
          return (
            <div
                key={day.toDateString()}
                onClick={() => onDayClick(day)}
                className={`border-t border-l border-divider/10 h-24 p-1 cursor-pointer hover:bg-white/5 overflow-hidden ${
                    isCurrentMonth ? "" : "opacity-30"
                }`}
                >
                <div className="text-xs mb-1">{day.getDate()}</div>
                <div className="flex flex-col gap-0.5">
                    {dayEvents.slice(0, 3).map(event => (
                    <div
                        key={event.id}
                        className="text-[10px] px-1 py-0.5 rounded truncate text-text transition-transform duration-200 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 hover:-rotate-2 active:scale-90 active:rotate-1"
                        style={{ backgroundColor: hexToRgba(event.color, 0.8) }}
                    >
                        {event.name}
                    </div>
                    ))}
                    {dayEvents.length > 3 && (
                    <span className="text-[10px] text-text/40 px-1">+{dayEvents.length - 3} more</span>
                    )}
                </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}