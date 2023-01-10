import styles from'../styles/Header.module.css'
import Link from 'next/link'
import App from '../pages/_app'


function Header () {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <img src='rocket.png' className={styles.image}/>
                <h1>DHF</h1>
            </div>
            <div className={styles.headerLinks}>
                <h6 className={styles.link}>Our story</h6>
                <Link href="/bookmarks"><h6 className={styles.link}>Bookmarks</h6></Link>
                <h6 className={styles.link}>Sign in</h6>
                <button className={styles.signUpLink}>Get started</button>
            </div>
        </div>
    )
}

export default Header