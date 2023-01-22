import styles from'../styles/Header.module.css'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signin, signout } from '../reducers/users'

import ModalComp from './ModalComp'


function Header () {
  const dispatch = useDispatch()
  const user = useSelector(state => state.users.value)

    const [color, setColor] = useState('#ffc017') // Initial color of the navbar
    const [scrolled, setScrolled] = useState(false) // Keep track of whether the user has scrolled past the threshold
    
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false) //opens modal on true
    const [isGetStartedOpen, setIsGetStarted] = useState(false) //opens modal on true


    //Modal Step
    const [modalStep, setModalStep] = useState(1)


    //is logged or not
    const [isLogged, setIsLogged] = useState(false)
    
    function handleLogState() {
      if(user.token) {
        setIsLogged(true)
      } else{
        setIsLogged(false)
      }
    }

    useEffect(() => {
      console.log('useEffect token', user.token, isLogged)
      handleLogState()
    },[user.token, isLogged])

    function handleLogOut() {
      dispatch(signout())
    }

    //Opens or closes Sign In Modal to first Step
    function handleSignInModal () {
      setIsSignInModalOpen(!isSignInModalOpen)
      setModalStep(1)
    }
    //Opens or closes Sign Up Modal to first Step
    function handleGetStartedModal () {
      setIsGetStarted(!isGetStartedOpen)
      setModalStep(1)
    }

    useEffect(() => {
      window.addEventListener('scroll', handleScroll)
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }, [scrolled])


    //handle header color update based on scroll section
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
                <img src='logo.png' className={styles.image}/>
              </div>
            </Link>
            <div className={styles.headerLinks}>
                <h6 className={styles.link}>Our story</h6>
                <Link href="/bookmarks"><h6 className={`${styles.link} ${styles.uniqueClass}`}>Bookmarks</h6></Link>

                {isLogged ?
                <h6 className={styles.link} onClick={handleLogOut}>Log out</h6>
                : 
                <>
                <h6 className={styles.link} onClick={handleSignInModal}>Sign in</h6>
                <div>
                    <button className={styles.signUpLink} onClick={handleGetStartedModal}>Get started</button>
                </div>
                </>
                }
                
            </div>
            <ModalComp 
                  handleSignInModal={handleSignInModal} 
                  handleGetStartedModal={handleGetStartedModal}
                  isSignInModalOpen={isSignInModalOpen}
                  setIsSignInModalOpen={setIsSignInModalOpen}
                  isGetStartedOpen={isGetStartedOpen}
                  setIsGetStarted={setIsGetStarted}
              />
        </div>
    )
}

export default Header

