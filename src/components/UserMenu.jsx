import { useState, useRef, useEffect } from 'react'

export function UserMenu({ user, onSignOut, onOpenSettings }) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={menuRef} className="relative animate-[fadeIn_0.2s_ease-out,scaleIn_0.2s_ease-out]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-9 h-9 rounded-full overflow-hidden border-2 border-divider/20 hover:border-accent-2 transition-colors"
      >
        <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover"/>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-surface border border-accent-2/40 rounded-lg shadow-lg z-10 overflow-hidden">
          <div className="px-4 py-3 border-b border-divider/10">
            <p className="text-sm font-medium truncate">{user.displayName}</p>
            <p className="text-xs text-text/50 truncate">{user.email}</p>
          </div>
          <button
            onClick={() => { onOpenSettings(); setIsOpen(false) }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-accent-1/20"
          >
            Settings
          </button>
          <button
            onClick={() => { onSignOut(); setIsOpen(false) }}
            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-accent-1/20"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}