import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react'
import Articles from './Articles'
import Trending from './Trending'


function Home() {
  const [articlesData, setArticlesData] = useState([])
  const [trendingArticle, setTrendingArticle] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/articles')
      .then(response => response.json())
      .then(data => {
        setTrendingArticle(data.articles.slice(0, 6))
        setArticlesData(data.articles.filter((data, i) => i > 0))
      })
  }, [])
  return (
    <div className={styles.homeHeaderContainer}>
        <div className={styles.title}>Stay curious.</div>
        <div className={styles.slogan}>
          Informing on Chinese space, from Chinese sources.
        </div>
        <div>
          <button className={styles.button}>Start reading</button>
        </div> 
    </div>
  );
}

export default Home;
