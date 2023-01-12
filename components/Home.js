import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react'
import Articles from './Articles'
import Trending from './Trending'


function Home() {
  const [articlesData, setArticlesData] = useState([])
/*   const [trendingArticle, setTrendingArticle] = useState([]) */

  useEffect(() => {
    fetch('http://localhost:3000/articles')
      .then(response => response.json())
      .then(data => {
/*         setTrendingArticle(data.articles.slice(0, 6)) */
        setArticlesData(data.articles)
      })
  }, [])

  const articles = articlesData.map((data, i) => {
    return(<Articles {...data} key={i}/>)
  })

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
                <p className={styles.tag}>voluptateazefazef</p>
                <p className={styles.tag}>rerum</p>
                <p className={styles.tag}>ducimus</p>
                <p className={styles.tag}>implementations</p>
                <p className={styles.tag}>quia</p>
                <p className={styles.tag}>cupiditate</p>
                <p className={styles.tag}>deserunt</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
