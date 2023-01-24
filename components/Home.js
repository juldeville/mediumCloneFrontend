import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react'
import Articles from './Articles'
import Trending from './Trending'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link';
import { addArticleToStore, } from '../reducers/article';
import { addTagToStore, removeTagFromStore } from "../reducers/tags"
import LoadingPlaceholder from './LoadingPlaceholder';


function Home() {
  const dispatch = useDispatch()
  const articleID = useSelector(state => state.article.value)
  
  
  const [articlesData, setArticlesData] = useState([])
  const [displayedArticles, setDisplayedArticles] = useState(articlesData.slice(0,10))
  const [articlesToAdd, setArticlesToAdd] = useState(10)
  const [tagData, setTagData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  

  const bookmarks = useSelector(state => state.bookmarks.value)

  useEffect(() => {
    setIsLoading(true)
    fetch('https://medium-clone-backend.vercel.app/articles/articles')
      .then(response => response.json())
      .then(data => {
        const sortedData = data.articles.sort((a, b) => new Date(b.date_published) - new Date(a.date_published))
        setArticlesData(sortedData)
        setDisplayedArticles(sortedData.slice(0, 10))
        setIsLoading(false)
      });
    fetch('https://medium-clone-backend.vercel.app/articles/topTags')
        .then(response => response.json())
        .then(data => {
          const tagValues = data.map(tag => tag._id)
          setTagData(tagValues)})
        .catch(error => console.log(error));
}, []);


  const handleScroll = () => {
    if(window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      setDisplayedArticles(prevDisplayedArticles => [...prevDisplayedArticles, ...articlesData.slice(prevDisplayedArticles.length, prevDisplayedArticles.length + articlesToAdd)])
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [displayedArticles])

  const articles = displayedArticles.map((data, i) => {
    const isBookmarked = bookmarks.some(bookmark => bookmark.title === data.title)
    return(
      <Link href="/article" key={i}>
        <a style={{textDecoration: 'none', color: 'black'}} onClick={() => dispatch(addArticleToStore(data._id))}>
    <Articles {...data} isBookmarked={isBookmarked || false} visibleBookmark= {true} isLoading= {isLoading}/>
      </a>
    </Link>
    )
  })

  const mainTags = tagData.map((tag, index) => {
    return(
      <Link href="/tag" key={index}>
        <p  onClick={() => dispatch(addTagToStore(tag))} className={styles.tag}>{tag}</p>
      </Link>
    )
})

  

  return (
    <div>
      <div className={styles.homeHeaderContainer}>
        <div className={styles.headerLeft}>
            <div className={styles.title}>Stay curious.</div>
            <div className={styles.slogan}>
              Discover stories, thinking, and expertise from writers on any topic.
            </div>
            <div>
              <button className={styles.button}>Start reading</button>
          </div> 
        </div>
        <img src={'banner.png'} className={styles.bannerImage}/>
      </div>
      <div className={styles.bodyContainer}>
        <div className={styles.articlesContainer}>
        {isLoading ? <LoadingPlaceholder/> : articles}

          
        </div>
        <div>
          <div className={styles.mainTagContainer}>
            <div className={styles.tagTitle}>DISCOVER MORE OF WHAT MATTERS TO YOU</div>
              <div className={styles.tagContainer}>
                {mainTags}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
