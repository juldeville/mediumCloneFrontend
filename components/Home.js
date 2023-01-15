import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react'
import Articles from './Articles'
import Trending from './Trending'
import { useSelector } from 'react-redux'


function Home() {
  const [articlesData, setArticlesData] = useState([])
  const [displayedArticles, setDisplayedArticles] = useState(articlesData.slice(0,10))
  const [articlesToAdd, setArticlesToAdd] = useState(10)
  const [tagData, setTagData] = useState([])
/*   const [randomDate, setRandomDate] = useState(null)
  
  useEffect(() => {
      setRandomDate(formattedDate)
  }, []) */

  const bookmarks = useSelector(state => state.bookmarks.value)

  useEffect(() => {
    fetch('http://localhost:3000/articles')
      .then(response => response.json())
      .then(data => {
        console.log(data.articles)
        setArticlesData(data.articles)
        setDisplayedArticles(data.articles.slice(0, 10))
      })
  }, [])

  useEffect(() => {
    fetch('http://localhost:3000/popularTags')
      .then(response => response.json())
      .then(data => {
        setTagData(data.tags)
      })
  }, [])

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
    return(<Articles {...data} key={i} isBookmarked={isBookmarked || false}/>)
  })

  const mainTags = tagData.map((tag, index) => <p key={index} className={styles.tag}>{tag}</p>)


  return (
    <div>
      <div className={styles.homeHeaderContainer}>
          <div className={styles.title}>Stay curious.</div>
          <div className={styles.slogan}>
            Informing on Chinese space, from Chinese sources.
          </div>
          <div>
            <button className={styles.button}>Start reading</button>
          </div> 
      </div>
      <div className={styles.bodyContainer}>
        <div className={styles.articlesContainer}>
          {articles}
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
