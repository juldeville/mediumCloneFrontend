import styles from'../styles/PageNavBar.module.css'
import Link from 'next/link'

function PageNavBar ({page}) {

    return (
        <div className={styles.container}>
          <Link href="/">
            <div className={page !== '/bookmarks' ? styles.logo : styles.logoTight}>
            <img src='rocket.png' className={styles.image}/><h1 className={styles.title}>DHF</h1>
            </div>
            </Link>
            <div className={page !== '/bookmarks' ? styles.headerLinks : styles.headerLinksTight}>
                <Link href="/bookmarks"><h6 className={`${styles.link} ${styles.uniqueClass}`}>Bookmarks</h6></Link>
                <h6 className={styles.link} >Sign in</h6>
                <h6 className={styles.link}>Our story</h6>
            </div>
        </div>
    )
}

export default PageNavBar