import React from 'react'
import { useState, useEffect } from 'react'
import './DarkTheme.css'
import { Sun, Moon } from 'lucide-react'

const DarkTheme = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
            document.body.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
       setIsDarkMode((prev) => !prev);
       document.body.classList.toggle('dark');

       const newMode = !isDarkMode ? 'dark' : 'light';
       localStorage.setItem('theme', newMode);
    }

    return (
         <button
      onClick={toggleTheme}
      style={{
        border: "none",
        background: "var(--secondary-color)",
        color: "var(--text-color)",
        padding: "8px 12px",
        borderRadius: "6px",
        fontSize: "0.9rem",
        transition: "0.3s",
      }}
    >
      {isDarkMode ? <Sun /> : <Moon />}
    </button>
    )
}

export default DarkTheme