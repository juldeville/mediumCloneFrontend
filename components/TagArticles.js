import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import Articles from "./Articles"
import styles from '../styles/TagArticles.module.css'
import Link from "next/link"
import { addArticleToStore } from "../reducers/article"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTags} from '@fortawesome/free-solid-svg-icons'


function TagArticles() {
    const dispatch = useDispatch()
    const [articleData, setArticleData] = useState([])
    const tagId = useSelector(state => state.tags.value)

    useEffect(() => {
        fetch(`https://medium-clone-backend.vercel.app/articles/getArticlesByTag/${tagId}`)
        .then(response => response.json())
        .then(data => {
            if(data.result){
            console.log('this is tagID', tagId)
            setArticleData(data.articles)
        } else {
            console.log('error in tag fetching')
        }
        })
    }, [])

    const taggedArticles = articleData.map((data, index) => {
    return(
    <Link href="/article"  key={index}>
    <a style={{textDecoration: 'none', color: 'black'}} onClick={() => dispatch(addArticleToStore(data._id))}>
    <Articles {...data}/>
    </a>
    </Link>
    )
})

    const formattedTagName = tagId?.charAt(0).toUpperCase() + tagId.slice(1)


    return (
        <div className={styles.mainContainer}>
            <div className={styles.tagContainer}>
                <FontAwesomeIcon icon={faTags}  className={styles.tagIcon} />
                <h1 className={styles.mainContainerTitle}>{formattedTagName}</h1>
            </div>
            <div>
                {taggedArticles}
            </div>
        </div>
        
    )
}

export default TagArticles