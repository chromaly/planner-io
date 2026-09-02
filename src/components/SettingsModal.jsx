export function SettingsModal({ isOpen, onClose, theme, onThemeChange, aesthetic, onAestheticChange}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-bg/60 backdrop-blur-sm flex items-center justify-center z-50 animate-[fadeIn_0.2s_ease-out,scaleIn_0.2s_ease-out]">
      <div className="bg-bg border border-accent-2/40 rounded-xl p-6 w-96">
        <h2 className="text-xl font-bold mb-4 text-accent-2">Settings</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Theme</label>
          <div className="flex gap-2">
            <button onClick={() => onThemeChange("dark")} className={`px-3 py-1.5 rounded-lg text-sm ${theme === "dark" ? "bg-accent-2" : "bg-surface"}`}>Dark</button>
            <button onClick={() => onThemeChange("light")} className={`px-3 py-1.5 rounded-lg text-sm ${theme === "light" ? "bg-accent-2" : "bg-surface"}`}>Light</button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Aesthetic</label>
          <div className="flex flex-wrap gap-2">
            {["TV Girl", "LaLaLand"].map(a => (
              <button key={a} onClick={() => onAestheticChange(a)} className={`px-3 py-1.5 rounded-lg text-sm capitalize ${aesthetic === a ? "bg-accent-2" : "bg-surface"}`}>
                {a.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>

        <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded-lg text-sm mt-2">Close</button>
      </div>
    </div>
  )
}