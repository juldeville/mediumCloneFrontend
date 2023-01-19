import styles from'../styles/Header.module.css'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Modal from 'react-modal'
import TextField from '@mui/material/TextField'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons';
import { width } from '@mui/system'

function Header () {

    const [color, setColor] = useState('#ffc017') // Initial color of the navbar
    const [scrolled, setScrolled] = useState(false) // Keep track of whether the user has scrolled past the threshold
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)
    const [isGetStartedOpen, setIsGetStarted] = useState(false)

    function handleSignInModal () {
      setIsSignInModalOpen(!isSignInModalOpen)
    }

    function handleGetStartedModal () {
      setIsGetStarted(!isGetStartedOpen)
    }

  
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
                <h6 className={styles.link} onClick={handleSignInModal}>Sign in</h6>
                <div>
                    <button className={styles.signUpLink} onClick={handleGetStartedModal}>Get started</button>
                </div>
            </div>
            <Modal isOpen={isSignInModalOpen} style={{content: {width: '800px', height: '800px', flexDirection: 'column', display: 'flex', alignItems: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}}>
                      <div style={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
                        <FontAwesomeIcon icon={faX} style={{fontSize: '12px', cursor: 'pointer'}} onClick={() => handleSignInModal()}/>
                      </div>
                      <h2 style={{fontWeight: 600, paddingTop: '150px'}}>Sign in with username</h2>
                      <div>Enter the username associated with your account.</div>
                      <div style={{marginTop: '75px', fontSize: '14px'}}>Your username</div>
                      <TextField id="standard-basic" variant="standard" style={{ border: 'none', borderBottom: '1px solid black', width: '300px'}} />
                      <div style={{marginTop: '50px', borderRadius: '20px', border: '1px solid black', padding: '5px', width: '250px', textAlign: 'center', backgroundColor: 'black', color: 'white', fontWeight: 400,}}>Continue</div>
              </Modal>
              <Modal isOpen={isGetStartedOpen} style={{content: {width: '800px', height: '800px', flexDirection: 'column', display: 'flex', alignItems: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}}>
                      <div style={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
                        <FontAwesomeIcon icon={faX} style={{fontSize: '12px', cursor: 'pointer'}} onClick={() => handleGetStartedModal()}/>
                      </div>
                      <h2 style={{fontWeight: 600, paddingTop: '150px'}}>Sign up with username</h2>
                      <div>Enter a username to create an account.</div>
                      <div style={{marginTop: '75px', fontSize: '14px'}}>Your username</div>
                      <TextField id="standard-basic" variant="standard" style={{ border: 'none', borderBottom: '1px solid black', width: '300px'}} />
                      <div style={{marginTop: '50px', borderRadius: '20px', border: '1px solid black', padding: '5px', width: '250px', textAlign: 'center', backgroundColor: 'black', color: 'white', fontWeight: 400,}}>Continue</div>
                </Modal>
        </div>
    )
}

export default Header