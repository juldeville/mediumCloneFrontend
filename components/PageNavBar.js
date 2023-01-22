import styles from'../styles/PageNavBar.module.css'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { signout } from '../reducers/users'
import ModalComp from './ModalComp'

function PageNavBar ({page}) {
    const dispatch = useDispatch()

    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false) //opens modal on true
    const [isGetStartedOpen, setIsGetStarted] = useState(false) //opens modal on true

    const [isLogged, setIsLogged] = useState(false)
    const user = useSelector(state => state.users.value)

    function handleLogState() {
        if(user.token) {
          setIsLogged(true)
        } else{
          setIsLogged(false)
        }
      }
  
    function handleLogOut() {
        dispatch(signout())
      }

    useEffect(() => {
        console.log('useEffect token second navbar', user.token, isLogged)
        handleLogState()
      },[user.token, isLogged])

         //Modal Step
    const [modalStep, setModalStep] = useState(1)

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

    return (
        <div className={styles.container}>
          <Link href="/">
            <div className={page !== '/bookmarks' ? styles.logo : styles.logoTight}>
            <img src='smallLogo.png' className={styles.image}/>
            </div>
            </Link>
            <div className={page !== '/bookmarks' ? styles.headerLinks : styles.headerLinksTight}>
                <h6 className={styles.link}>Our story</h6>
                {isLogged ? <h6 onClick={() => handleLogOut()} className={styles.link}>Log out</h6>:
                <>
                <h6 className={styles.link} onClick={handleSignInModal}>Sign in</h6>
                <h6 className={styles.link} onClick={handleGetStartedModal}>Get started </h6>     
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

export default PageNavBar