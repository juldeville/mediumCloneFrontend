import styles from'../styles/Header.module.css'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signin, signout } from '../reducers/users'
import Modal from 'react-modal'
import TextField from '@mui/material/TextField'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons';

function Header () {
  const dispatch = useDispatch()
  const user = useSelector(state => state.users.value)

    const [color, setColor] = useState('#ffc017') // Initial color of the navbar
    const [scrolled, setScrolled] = useState(false) // Keep track of whether the user has scrolled past the threshold
    
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false) //opens modal on true
    const [isGetStartedOpen, setIsGetStarted] = useState(false) //opens modal on true

    //Sign In
    const [signInUsername, setSignInUsername] = useState('')
    const [signInPassword, setSignInPassword] = useState('')
  
    //Sign up  
    const [signUpUsername, setSignUpUsername] = useState('')
    const [signUpPassword, setSignUpPassword] = useState('')
    const [signUpEmail, setSignUpEmail] = useState('')

    //Modal Step
    const [modalStep, setModalStep] = useState(1)

    //authentication Error
    const [usernameError, setUsernameError] = useState(false)
    const [emailError, setEmailError] = useState(false)

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

    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

    //Handle Sign in modal step navigation

    function handleContinueSignIn() {
      if (signInUsername.trim() !== '') {
        setModalStep(2)
      } else {
        setUsernameError(true)
      }
    }

    //Handle Get started modal step navigation

    function handleContinueGetStarted() {
      if(signUpUsername.trim() !== '' && EMAIL_REGEX.test(signUpEmail)) {
        setModalStep(2)
      } else if(signUpUsername.trim() !== '' && !EMAIL_REGEX.test(signUpEmail)) {
        setEmailError(true)
      } else if(EMAIL_REGEX.test(signUpEmail) && signUpUsername.trim() === '' ) {
        setUsernameError(true)
      } else {
        setUsernameError(true)
        setEmailError(true)
      }
    }

    function clearAuthStates () {
      setSignUpEmail('')
      setSignInUsername('')
      setSignInPassword('')
      setSignUpUsername('')
      setSignUpPassword('')
      setUsernameError(false)
      setEmailError(false)
    }

    //Signing up with endpoint
    function handleSignUp() {
      fetch('http://localhost:3000/users/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          username: signUpUsername,
          email: signUpEmail,
          password: signUpPassword
        })
      }).then(response => response.json())
        .then(data => {
          if(data.result) {
            console.log('successful signup', data.result)
            dispatch(signin({token: data.token}))
            clearAuthStates()
            setIsGetStarted(!isGetStartedOpen)
          } else {
            console.log( 'error, can"t sign up')
          }
        })
    }

    //Signing in with endpoint
    function handleSignIn() {
      fetch('http://localhost:3000/users/signin', {
        method:'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
          username: signInUsername,
          password: signInPassword,
        })
      }).then(response => response.json())
        .then(data => {
          if(data.result) {
            dispatch(signin({token: data.token}))
            setIsSignInModalOpen(false)
            clearAuthStates()
          } else {
            console.log('sign in failed', signInUsername, signInPassword)
          }
        })
    }

    useEffect(() => {
      window.addEventListener('scroll', handleScroll)
      return () => {
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

    function handleLogOut() {
      dispatch(signout())
    }

    const modalStyle = {content: {width: '800px', height: '800px', flexDirection: 'column', display: 'flex', alignItems: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}
  
    return (
        <div className={styles.container} style={{backgroundColor: color, transition: 'background-color 0.5s ease-in-out',}}>
          <Link href="/">
            <div className={styles.logo}>
            <img src='rocket.png' className={styles.image}/><h1 className={styles.title}>DHF</h1>
            </div>
            </Link>
            <div className={styles.headerLinks}>
                <h6 className={styles.link} onClick={() => handleLogOut()}>Our story</h6>
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
            <Modal  isOpen={isSignInModalOpen} style={modalStyle}>
                      <div className={styles.xIconContainer}>
                        <FontAwesomeIcon icon={faX} className={styles.xIcon} onClick={() => {handleSignInModal(); clearAuthStates()}}/>
                      </div>
                      {modalStep === 1 ? 
                      (<>
                          <h2 className={styles.modalTitle}>Sign in </h2>
                          <div>Enter the username and email associated with your account.</div>
                          <div className={styles.modalSubtitle}>Your username</div>

                          {!usernameError ? 
                                <TextField id="standard-basic" className={styles.textfieldInput} onChange={(e) => setSignInUsername(e.target.value)} value={signInUsername} variant="standard"/>
                                :
                                <TextField error helperText='Enter valid username' onChange={(e) => setSignInUsername(e.target.value)} value={signInUsername} id="standard-basic" variant="standard" className={styles.textfieldInput} />}

                          <div onClick={() => handleContinueSignIn()} className={styles.continueButton}>Continue</div>
                      </>)
                       :
                      (<>
                        <h2 className={styles.modalTitle}>Enter your password</h2>
                        <div>Enter the password associated with your account.</div>
                        <div className={styles.modalSubtitle}>Your password</div>
                        <TextField id="standard-basic" variant="standard" type="password"className={styles.textfieldInput} onChange={(e)=> setSignInPassword(e.target.value)} value={signInPassword}/>
                        <div className={styles.continueButton} onClick={() => handleSignIn()}>Sign in</div>
                      </>)
                      }
              </Modal>
              <Modal isOpen={isGetStartedOpen} style={modalStyle}>
                      <div className={styles.xIconContainer}>
                        <FontAwesomeIcon icon={faX} className={styles.xIcon} onClick={() => {handleGetStartedModal(); clearAuthStates()}}/>
                      </div>
                      {modalStep === 1 ? 
                      (<>
                        <h2 className={styles.modalTitle}>Sign up with username</h2>
                        <div>Enter a username that will be associated with your account.</div>
                        <div className={styles.modalSubtitle}>Your username</div>

                        {!usernameError ?
                              <TextField onChange={(e) => setSignUpUsername(e.target.value)} value={signUpUsername} id="standard-basic" variant="standard" className={styles.textfieldInput} /> 
                              :
                              <TextField error helperText='Enter valid username' onChange={(e) => setSignUpUsername(e.target.value)} value={signUpUsername} id="standard-basic" variant="standard" className={styles.textfieldInput} />}

                        <div className={styles.modalSubtitle}>Your email</div>

                        {!emailError ? 
                              <TextField onChange={(e) => setSignUpEmail(e.target.value)} value={signUpEmail} id="standard-basic" variant="standard" className={styles.textfieldInput} />
                              :
                              <TextField error helperText='Enter valid email' onChange={(e) => setSignUpEmail(e.target.value)} value={signUpEmail} id="standard-basic" variant="standard" className={styles.textfieldInput}/>}

                        <div onClick={() => handleContinueGetStarted()} className={styles.continueButton}>Continue</div>
                        <div style={{display: 'flex'}}>
                        <div style={{marginRight: '10px', fontSize: '14px'}}>Already have an account?</div>
                        <div style={{fontWeight: 600, color: '#11730e', fontSize: '14px', cursor: 'pointer'}} onClick={() =>{ handleSignInModal(); clearAuthStates(); setIsGetStarted(!isGetStartedOpen)}}>Sign in</div>
                        </div>
                      </>) 
                      :
                      (<>
                        <h2 className={styles.modalTitle}>Create password</h2>
                        <div>Create a password that will be associated with your account.</div>
                        <div className={styles.modalSubtitle}>Your password</div>
                        <TextField onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword} id="standard-basic" variant="standard" type="password" className={styles.textfieldInput} />
                        <div className={styles.continueButton} onClick={() => handleSignUp()}>Sign Up</div>
                      </>)
                      }
                </Modal>
        </div>
    )
}

export default Header

