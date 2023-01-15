import { useSelector } from "react-redux"
import Articles from "./Articles"
import styles from '../styles/Bookmarks.module.css'

function Bookmarks() {
    const bookmarks = useSelector(state => state.bookmarks.value)

    const bookmarkedArticles = bookmarks.map((data, index) => {

    return(<Articles {...data} key={index} visibleBookmark={false} />)
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