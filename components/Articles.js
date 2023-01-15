import styles from '../styles/Articles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-regular-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { addBookmarkToStore, removeBookmarkFromStore } from '../reducers/bookmarks'
import { useEffect, useState } from 'react'


function Articles(props) {
    const dispatch = useDispatch()
    const { author = {} } = props
    const bookmarks = useSelector(state => state.bookmarks.value)
    console.log('helloooooo', bookmarks)

    const date = new Date(props.date_published);
    const formattedDate = date.toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' });


        const handleBookmark = () => {
            if (props.isBookmarked) {
                dispatch(removeBookmarkFromStore(props))
            } else {
                dispatch(addBookmarkToStore(props))
            }
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
                    <div className={styles.tagsContainer}>
                    {props.tags.length > 0 && props.tags.map((tag, index) => <div key={index} className={styles.tags}>{tag}</div>)}
                    </div>
                </div>
            </div>
            <img className={styles.cardImage} src={props.image}/>
        </div>
    )
}

export default Articles