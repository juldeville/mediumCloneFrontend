import styles from'../styles/Header.module.css'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signin, signout } from '../reducers/users'
import Modal from 'react-modal'
import TextField from '@mui/material/TextField'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons';

function ModalComp({...props}) {

    const dispatch = useDispatch()

    const [modalStep, setModalStep] = useState(1) //Modal Step 

    //authentication Error
    const [usernameError, setUsernameError] = useState(false)
    const [emailError, setEmailError] = useState(false)

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

      //Sign In
    const [signInUsername, setSignInUsername] = useState('')
    const [signInPassword, setSignInPassword] = useState('')
    

        //Sign up  
        const [signUpUsername, setSignUpUsername] = useState('')
        const [signUpPassword, setSignUpPassword] = useState('')
        const [signUpEmail, setSignUpEmail] = useState('')
        const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        
    //Signing up with endpoint
    function handleSignUp() {
        fetch('https://medium-clone-backend.vercel.app/users/signup', {
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
              setModalStep(1)
              props.setIsGetStarted(!props.isGetStartedOpen)
            } else {
              console.log( 'error, can"t sign up')
            }
          })
      }

        //Handle Sign in modal step navigation

        function handleContinueSignIn() {
            if (signInUsername.trim() !== '') {
              setModalStep(2)
            } else {
              setUsernameError(true)
            }
          }

        //Signing in with endpoint
    function handleSignIn() {
        fetch('https://medium-clone-backend.vercel.app/users/signin', {
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
              props.setIsSignInModalOpen(false)
              clearAuthStates()
              setModalStep(1)
            } else {
              console.log('sign in failed', signInUsername, signInPassword)
            }
          })
        }

        const modalStyle = {content: {width: '800px', height: '800px', flexDirection: 'column', display: 'flex', alignItems: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}
          
        
      

    return(
        <>
        <Modal  isOpen={props.isSignInModalOpen} style={modalStyle}>
                      <div className={styles.xIconContainer}>
                        <FontAwesomeIcon icon={faX} className={styles.xIcon} onClick={() => {props.handleSignInModal(); clearAuthStates(); setModalStep(1)}}/>
                      </div>
                      {modalStep === 1 ? 
                      (<>
                          <h2 className={styles.modalTitle}>Sign in </h2>
                          <div>Enter the username and email associated with your account.</div>
                          <div className={styles.modalSubtitle}>Your username</div>

                          {!usernameError ? 
                                <TextField onKeyDown={(e) => {if (e.key === 'Enter') {handleContinueSignIn()}}} id="standard-basic" className={styles.textfieldInput} onChange={(e) => setSignInUsername(e.target.value)} value={signInUsername} variant="standard"/>
                                :
                                <TextField onKeyDown={(e) => {if (e.key === 'Enter') {handleContinueSignIn()}}} error helperText='Enter valid username' onChange={(e) => setSignInUsername(e.target.value)} value={signInUsername} id="standard-basic" variant="standard" className={styles.textfieldInput} />}

                          <div onClick={() => handleContinueSignIn()} className={styles.continueButton}>Continue</div>
                          <div style={{display: 'flex'}}>
                            <div style={{marginRight: '10px', fontSize: '14px'}}>Don't have an account?</div>
                            <div style={{fontWeight: 600, color: '#11730e', fontSize: '14px', cursor: 'pointer'}} onClick={() =>{ props.handleGetStartedModal(); clearAuthStates(); props.setIsSignInModalOpen(!props.isSignInModalOpen)}}>Sign up</div>
                        </div>
                      </>)
                       :
                      (<>
                        <h2 className={styles.modalTitle}>Enter your password</h2>
                        <div>Enter the password associated with your account.</div>
                        <div className={styles.modalSubtitle}>Your password</div>
                        <TextField onKeyDown={(e) => {if (e.key === 'Enter') {handleSignIn()}}} id="standard-basic" variant="standard" type="password"className={styles.textfieldInput} onChange={(e)=> setSignInPassword(e.target.value)} value={signInPassword}/>
                        <div className={styles.continueButton} onClick={() => handleSignIn()}>Sign in</div>
                      </>)
                      }
              </Modal>
              <Modal isOpen={props.isGetStartedOpen} style={modalStyle}>
                      <div className={styles.xIconContainer}>
                        <FontAwesomeIcon icon={faX} className={styles.xIcon} onClick={() => {props.handleGetStartedModal(); clearAuthStates(); setModalStep(1)}}/>
                      </div>
                      {modalStep === 1 ? 
                      (<>
                        <h2 className={styles.modalTitle}>Sign up with username</h2>
                        <div>Enter a username that will be associated with your account.</div>
                        <div className={styles.modalSubtitle}>Your username</div>

                        {!usernameError ?
                              <TextField onKeyDown={(e) => {if (e.key === 'Enter') {handleContinueGetStarted()}}} onChange={(e) => setSignUpUsername(e.target.value)} value={signUpUsername} id="standard-basic" variant="standard" className={styles.textfieldInput} /> 
                              :
                              <TextField onKeyDown={(e) => {if (e.key === 'Enter') {handleContinueGetStarted()}}} error helperText='Enter valid username' onChange={(e) => setSignUpUsername(e.target.value)} value={signUpUsername} id="standard-basic" variant="standard" className={styles.textfieldInput} />}

                        <div className={styles.modalSubtitle}>Your email</div>

                        {!emailError ? 
                              <TextField onKeyDown={(e) => {if (e.key === 'Enter') {handleContinueGetStarted()}}} onChange={(e) => setSignUpEmail(e.target.value)} value={signUpEmail} id="standard-basic" variant="standard" className={styles.textfieldInput} />
                              :
                              <TextField onKeyDown={(e) => {if (e.key === 'Enter') {handleContinueGetStarted()}}} error helperText='Enter valid email' onChange={(e) => setSignUpEmail(e.target.value)} value={signUpEmail} id="standard-basic" variant="standard" className={styles.textfieldInput}/>}

                        <div onClick={() => handleContinueGetStarted()} className={styles.continueButton}>Continue</div>
                        <div style={{display: 'flex'}}>
                        <div style={{marginRight: '10px', fontSize: '14px'}}>Already have an account?</div>
                        <div style={{fontWeight: 600, color: '#11730e', fontSize: '14px', cursor: 'pointer'}} onClick={() =>{ props.handleSignInModal(); clearAuthStates(); props.setIsGetStarted(!props.isGetStartedOpen)}}>Sign in</div>
                        </div>
                      </>) 
                      :
                      (<>
                        <h2 className={styles.modalTitle}>Create password</h2>
                        <div>Create a password that will be associated with your account.</div>
                        <div className={styles.modalSubtitle}>Your password</div>
                        <TextField onKeyDown={(e) => {if (e.key === 'Enter') {handleSignUp()}}} onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword} id="standard-basic" variant="standard" type="password" className={styles.textfieldInput} />
                        <div className={styles.continueButton} onClick={() => handleSignUp()}>Sign Up</div>
                      </>)
                      }
                </Modal>
                </>
    )
}

export default ModalComp