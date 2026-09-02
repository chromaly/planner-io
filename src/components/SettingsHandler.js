import { useState, useEffect } from 'react'
import { doc, onSnapshot, setDoc } from "firebase/firestore"
import { db } from "../firebase"

export function useSettings(user) {
    const [mode, setMode] = useState("dark")
    const [palette, setPalette] = useState("tvgirl")
    
    useEffect(() => {
        if (!user) return
        const unsubscribe = onSnapshot(doc(db, "settings", user.uid), (docSnap) => {
        if (docSnap.exists()) {
            const data = docSnap.data()
            setMode(data.mode ?? "dark")
            setPalette(data.palette ?? "tvgirl")
        }
        })
        return () => unsubscribe()
    }, [user])

    async function handleThemeChange(newMode) {
        setMode(newMode)
        if (user) await setDoc(doc(db, "settings", user.uid), { mode: newMode, palette }, { merge: true })
    }

    async function handlePaletteChange(newPalette) {
        setPalette(newPalette)
        if (user) await setDoc(doc(db, "settings", user.uid), { mode, palette: newPalette }, { merge: true })
    }

    return { mode, palette, handleThemeChange, handlePaletteChange }
}