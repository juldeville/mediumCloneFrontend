import styles from '../styles/ArticlePage.module.css';
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeArticleFromStore } from '../reducers/article';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faLinkedin, } from '@fortawesome/free-brands-svg-icons'
import { faBookmark } from '@fortawesome/free-regular-svg-icons';




function ArticlePage () { 
    const dispatch = useDispatch()
    const [articleData, setArticleData] = useState(null)

    const articleId = useSelector(state => state.article.value)
    console.log('articleID yoyo', articleId)

    useEffect(() => {
        fetch(`http://localhost:3000/articles/article/${articleId}`)
        .then(response => response.json())
        .then(data => {
            setArticleData(data.article)            
        })
        .finally(() => {
            dispatch(removeArticleFromStore())
        })
    }, [])

    if(articleData) 
{    const date = new Date(articleData.date_published);
    const formattedDate = date.toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' });}

    if(articleData) { 
            const date = new Date(articleData.date_published);
            const formattedDate = date.toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' });
        console.log('article data',articleData)
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
                        <FontAwesomeIcon icon={faBookmark} style={{marginLeft: '20px'}}/>
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