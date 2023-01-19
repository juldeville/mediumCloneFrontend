import { useSelector, useDispatch } from "react-redux"
import Articles from "./Articles"
import styles from '../styles/Bookmarks.module.css'
import Link from "next/link"
import { addArticleToStore } from "../reducers/article"

function Bookmarks() {
    const dispatch = useDispatch()
    const bookmarks = useSelector(state => state.bookmarks.value)

    const bookmarkedArticles = bookmarks.map((data, index) => {
    return(
    <Link href="/article">
    <a style={{textDecoration: 'none', color: 'black'}} onClick={() => dispatch(addArticleToStore(data._id))}>
    <Articles {...data} key={index}  visibleBookmark= {false}/>
    </a>
    </Link>
    )
})




    return (
        <div className={styles.mainContainer}>
            <h1 className={styles.mainContainerTitle}>Bookmarks</h1>
            <div>
                {bookmarkedArticles}
            </div>
        </div>
        
    )
    
}

export default Bookmarks