export function createEvent(name, startTime, duration, repeatable, importance, location, notes, color, userId) {
  return {
    id: Date.now(),
    name,
    startTime,
    duration,
    repeatable,
    importance,
    location,
    notes,
    color,
    userId
  }
}

export function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export function getWeekDays(date) {
        const start = new Date(date)
        start.setDate(start.getDate() - start.getDay())
        return Array.from({ length: 7}, (_, i) => {
          const d = new Date(start)
          d.setDate(start.getDate() + i)
          return d
        })
      }

export function getEventPosition(event) {
    const startMinutes = event.startTime.getHours() * 60 + event.startTime.getMinutes()
    return {
        top: `${startMinutes - 7 * 60}px`, 
        height: `${event.duration}px`,
    }
}

export function eventOccursOnDay(event, day) {
    // default checking
    const sameDay = event.startTime.toDateString() === day.toDateString()
    if (sameDay) { return true }

    if (event.repeatable === "never") { return false }

    // repeatable conditions
    if (day < new Date(event.startTime.toDateString())) { return false }

    if (event.repeatable === "daily") { return true }

    if (event.repeatable === "weekly") { return day.getDay() === event.startTime.getDay() }

    if (event.repeatable === "monthly" ) { return day.getDate() === event.startTime.getDate() }

    return false
}

export function eventsOverlap(newEvent, checkEvent) {
    // checking if the days overlap
    if (!eventOccursOnDay(checkEvent, newEvent.startTime)) { return false }

    // if passes, checking if the time overlaps

    const newStart = newEvent.startTime.getHours() * 60 + newEvent.startTime.getMinutes()
    const newEnd = newStart + newEvent.duration

    const checkStart = checkEvent.startTime.getHours() * 60 + checkEvent.startTime.getMinutes()
    const checkEnd = checkStart + checkEvent.duration

    return newStart < checkEnd && newEnd > checkStart
}

export function getTodaysEvents(events) {
  const today = new Date()
  return events
  .filter(e => eventOccursOnDay(e, today))
  .sort((a, b) => a.startTime - b.startTime)
}

export function getEventsByImportance(events) {
  const today = new Date()
  const upcoming = events.filter(e => e.repeatable !== "never" || e.startTime >= today)
  return {
    "very important!": upcoming.filter(e => e.importance === "very"),
    "somewhat!": upcoming.filter(e => e.importance === "somewhat"),
    "not too urgent...": upcoming.filter(e => e.importance === "not too"),
  }
}