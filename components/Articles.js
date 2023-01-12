import styles from '../styles/Articles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'

function Articles(props) {
    return (
        <div className={styles.card}>
            <div className={styles.cardAuthorAndBookmark}>
                <div className={styles.authorInfo}>
                    <img className={styles.authorAvatar} src={props.avatar} />
                    <div className={styles.cardAuthor}>{props.author}</div>
                </div>
                <FontAwesomeIcon icon={faBookmark} style={iconStyle} className={styles.bookmarkIcon}/>
            </div>
            <div className={styles.articleContent}>
                <div className={styles.articleTitle}>{props.title}</div>
                <div className={styles.articleDescription}>{props.description}</div>
            </div>
            <div>
                <h6>December 9, 2022</h6>
                <div>
                        <h6>voluptate</h6>
                        <h6>rerum</h6>
                        <h6>ducimus</h6>
                </div>
            </div>
        </div>
    )
}

export default Articles