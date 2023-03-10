import styles from '../styles/Articles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-regular-svg-icons'
import { useDispatch, } from 'react-redux'
import { addBookmarkToStore, removeBookmarkFromStore } from '../reducers/bookmarks'
import { addTagToStore } from '../reducers/tags'
import Link from 'next/link'


function Articles(props) {
    const dispatch = useDispatch()
    const { author = {} } = props
   
    const date = new Date(props.date_published);
    const formattedDate = date.toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' });


        const handleBookmark = (event) => {
            event.stopPropagation();
            event.preventDefault();
            if (props.isBookmarked) {
                dispatch(removeBookmarkFromStore(props))
            } else {
                dispatch(addBookmarkToStore(props))
            }
        }
     
        const handleTag = (tag ) => {

            dispatch(addTagToStore(tag))
            
            
        }

    let iconStyle = {}
    if (props.isBookmarked) {
        iconStyle = {color: '#ffc017'}
    } else {
        iconStyle = {color: 'currentColor'}
    }

    return (
        <div className={styles.cardAndImage}>
            <div className={styles.card}>
                <div className={styles.cardAuthorAndBookmark}>
                    <div className={styles.authorInfo}>
                        <img className={styles.authorAvatar} src={author.image} />
                        <div className={styles.username}>{author.username}</div>
                    </div>
                    {props.visibleBookmark && <FontAwesomeIcon icon={faBookmark}  className={styles.bookmarkIcon} style={iconStyle} onClick={handleBookmark}/> }
                </div>
                <div className={styles.articleContent}>
                    <div>
                        <div className={styles.articleTitle}>{props.title}</div>
                        <div className={styles.articleDescription}>{props.description}
                        </div>
                    </div>
                </div>
                
                <div className={styles.footerContent}>
                    <h6 className={styles.date}>{formattedDate}</h6>
                    <Link href='/tag'>
                    <div className={styles.tagsContainer}>
                    {props.tags.length > 0 && props.tags.map((tag, index) => <div onClick={(event) => {event.stopPropagation, event.preventDefault, handleTag(tag)}} key={index} className={styles.tags}>{tag}</div>)}
                    </div>
                    </Link>
                </div>
                
            </div>
            <img className={styles.cardImage} src={props.image}/>
        </div>
    )
}

export default Articles