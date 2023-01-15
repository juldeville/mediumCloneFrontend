import styles from'../styles/Header.module.css'
import Link from 'next/link'
import App from '../pages/_app'
import { useState, useEffect } from 'react'

function Header () {

    const [color, setColor] = useState('#ffc017') // Initial color of the navbar
    const [scrolled, setScrolled] = useState(false) // Keep track of whether the user has scrolled past the threshold
  
    useEffect(() => {
      // Add event listener for scroll
      window.addEventListener('scroll', handleScroll)
  
      return () => {
        // Remove event listener on cleanup
        window.removeEventListener('scroll', handleScroll)
      }
    }, [scrolled])
  
    function handleScroll() {
      // Get the current scroll position
      const scrollTop = document.documentElement.scrollTop
  
      // Check if the user has scrolled past the threshold
      if (scrollTop > 300 && !scrolled) {
        setColor('white') // Change the color to white
        setScrolled(true)
      } else if (scrollTop < 300 && scrolled) {
        setColor('#ffc017') // Change the color back to the original color
        setScrolled(false)
      }
    }
  
    return (
        <div className={styles.container} style={{backgroundColor: color, transition: 'background-color 0.5s ease-in-out',}}>
          <Link href="/">
            <div className={styles.logo}>
            <img src='rocket.png' className={styles.image}/><h1 className={styles.title}>DHF</h1>
            </div>
            </Link>
            <div className={styles.headerLinks}>
                <h6 className={styles.link}>Our story</h6>
                <Link href="/bookmarks"><h6 className={`${styles.link} ${styles.uniqueClass}`}>Bookmarks</h6></Link>
                <h6 className={styles.link} >Sign in</h6>
                <div>
                    <button className={styles.signUpLink}>Get started</button>
                </div>
            </div>
        </div>
    )
}

export default Header