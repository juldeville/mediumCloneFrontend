import styles from '../styles/Articles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'

function Articles(props) {
    return (
        <div className={styles.card}>
            <div className={styles.cardAuthorAndBookmark}>
                <div className={styles.authorInfo}>
                    <img className={styles.authorAvatar} src={props.author.image} />
                    <div className={styles.username}>{props.author.username}</div>
                </div>
                <FontAwesomeIcon icon={faBookmark}  className={styles.bookmarkIcon}/>
            </div>
            <div className={styles.articleContent}>
                <div>
                    <div className={styles.articleTitle}>{props.title}</div>
                    <div className={styles.articleDescription}>{props.description}
                    </div>
                </div>
            </div>
            <div className={styles.footerContent}>
                <h6 className={styles.date}>December 9, 2022</h6>
                <div className={styles.tagsContainer}>
                {props.tagList.length > 0 && props.tagList.map((tag, index) => <h6 key={index} className={styles.tags}>{tag}</h6>)}
                </div>
            </div>
        </div>
    )
}

export default Articles