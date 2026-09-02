import { useState, useEffect } from 'react'
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth"
import { auth, googleProvider } from "../firebase.js"

export function useAuth() {
    const [user, setUser] = useState(null)

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
    }, [])

    async function handleSignIn() {
        try {
        await signInWithPopup(auth, googleProvider)
        } catch (error) {
        console.error(error)
        }
    }

    function handleSignOut() {
        signOut(auth)
    } 

    return { user, handleSignIn, handleSignOut }
}