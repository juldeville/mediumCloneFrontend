import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import Articles from "./Articles"
import styles from '../styles/Bookmarks.module.css'
import Link from "next/link"
import { addTagToStore, removeTagFromStore } from "../reducers/tags"

function TagArticles() {
    const dispatch = useDispatch()
    const [articleData, setArticleData] = useState([])

/*     useEffect(() => {

    })

    const bookmarkedArticles = bookmarks.map((data, index) => {
    return(
    <Link href="/article">
    <a style={{textDecoration: 'none', color: 'black'}} onClick={() => dispatch(addArticleToStore(data._id))}>
    <Articles {...data} key={index}  visibleBookmark= {false}/>
    </a>
    </Link>
    )
})
 */



    return (
        <div className={styles.mainContainer}>
            <h1 className={styles.mainContainerTitle}>Placeholder</h1>
            <div>
                Placeholder
            </div>
        </div>
        
    )
    
}

export default TagArticles