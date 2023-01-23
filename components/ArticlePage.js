import styles from '../styles/ArticlePage.module.css';
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faLinkedin, } from '@fortawesome/free-brands-svg-icons'
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { addBookmarkToStore, removeBookmarkFromStore } from '../reducers/bookmarks'

function ArticlePage () { 
    const dispatch = useDispatch()
    const [articleData, setArticleData] = useState(null)
    const [isBookmarked, setIsBookmarked] = useState(false)

    const bookmarkedArticles = useSelector(state => state.bookmarks.value)


    const articleId = useSelector(state => state.article.value)
   

    useEffect(() => {
        fetch(`http://localhost:3000/articles/article/${articleId}`)
        .then(response => response.json())
        .then(data => {
            setArticleData(data.article) 
            if(bookmarkedArticles.find(article => article._id === articleId[0])) {
                setIsBookmarked(true)
            }          
        })
        .finally(() => {
            if(bookmarkedArticles.find(article => article._id === articleId)) {
                setIsBookmarked(true)
            }    
        })
    }, [])

    const handleBookmark = () => {
        if (isBookmarked) {
            dispatch(removeBookmarkFromStore(articleData))
        } else {
            dispatch(addBookmarkToStore(articleData))
        }
        setIsBookmarked(!isBookmarked)
    }

    let iconStyle = {}
    if (isBookmarked) {
        iconStyle = {color: '#ffc017'}
    } else {
        iconStyle = {color: 'currentColor'}
    }

    if(articleData) { 
            const date = new Date(articleData.date_published);
            const formattedDate = date.toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' });
   return(
        <div className={styles.mainContainer}>
            <div className={styles.articleContainer}>
                <div className={styles.headerContainer}>
                    <div className={styles.headerLeft}>                    
                        <img className={styles.authorAvatar} src={articleData.author.image}/>                   
                        <div className={styles.headerInfo}>
                            <div className={styles.headerAuthor}>{articleData.author.username}</div>
                            <div className={styles.headerDetails}>{formattedDate} &middot; 3 min read</div>
                        </div>
                    </div>
                    <div className={styles.iconContainer}>
                        <FontAwesomeIcon icon={faTwitter} className={styles.icon}/>
                        <FontAwesomeIcon icon={faLinkedin} className={styles.icon}/>
                        <FontAwesomeIcon icon={faFacebook} className={styles.icon}/>
                        <FontAwesomeIcon onClick={handleBookmark} icon={faBookmark} style={{...iconStyle, marginLeft: '20px', cursor: 'pointer'}}/>
                    </div>
                </div>
                <img className={styles.articleImage} src={articleData.image}/>
                <h2 style={{}}>{articleData.title}</h2>
                <div className={styles.articleContent}>
                    {articleData.content}
                </div>
            </div>
            <div className={styles.authorCard}>
                <img className={styles.bigAuthorAvatar} src={articleData.author.image}/>
                <div style={{marginTop: '20px', marginBottom: '20px', fontWeight: 600 }}>{articleData.author.username}</div>
                <div style={{fontSize: '14px', color: '#999999' }}>{articleData.author.bio}</div>
            </div>
        </div>
    )}
    else {
        return <div></div>
    }
}

export default ArticlePage