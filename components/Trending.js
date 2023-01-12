import styles from '../styles/Trending.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'

function Articles(props) {
    return (
        <div className={styles.card}>
            <div className={styles.cardAuthor}>
                    <h6>01</h6>
                    <div className={styles.cardAuthor}>{props.author}</div>
            </div>
            <div className={styles.articleContent}>
                <div className={styles.articleTitle}>{props.title}</div>
            </div>
            <div>
                <h6 className={styles.cardFooter}>December 9, 2022 &middot; 5 min read</h6>
            </div>
        </div>
    )
}

export default Articles