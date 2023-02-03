import styles from '../styles/Trending.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'


function Trending(props) {
   
    const date = new Date(props.date_published);
    const formattedDate = date.toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' });



    return (
            <div className={styles.card}>
                <div className={styles.cardAuthorAndBookmark}>
                    <div className={styles.authorInfo}>
                        <img className={styles.authorAvatar} src={props.image} />
                        <div className={styles.username}>{props.author.username}</div>
                    </div>
                </div>
                <div className={styles.articleContent}>
                    <div>
                        <div className={styles.articleTitle}>{props.title}</div>
                    </div>
                </div>             
                <div className={styles.footerContent}>
                    <div className={styles.date}>{formattedDate}</div>
                </div>         
            </div>
    )
}

export default Trending