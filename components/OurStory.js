import styles from'../styles/bio.module.css'


function OurStory() {

const content = ["Medium was created by Evan Williams, the co-founder of Twitter, in 2012. The platform was designed to be a place where people could share their thoughts and ideas in a more meaningful way than the 140-character limit of Twitter allowed.",
"The story of Medium began with Williams' desire to create a platform that would make it easy for people to share their thoughts and ideas with a wider audience. He recognized that while social media platforms like Twitter and Facebook were great for sharing short snippets of information, they weren't well-suited for longer-form content. Williams began working on Medium in 2011, and the platform was officially launched in 2012. The initial focus of the platform was on long-form writing, with a particular emphasis on personal essays and stories. As the platform grew, Williams and his team began to experiment with different formats and features. They added support for video, audio, and images, and they also introduced a feature called 'collections' which allowed users to group their stories around a specific topic or theme. Despite these innovations, Medium struggled to attract a large audience in its early days. Many people were hesitant to start publishing on a new platform, and the platform's focus on long-form writing didn't appeal to everyone.",
"However, Williams and his team were determined to make Medium a success. They began to experiment with new ways to promote the platform and encourage more people to start publishing. They introduced a feature called 'recommendations' which allowed users to recommend stories they liked to their followers, and they also started to partner with other companies and organizations to promote the platform. Over time, Medium began to gain traction. More and more people began to discover the platform and start publishing their own stories. As the community grew, the platform's focus began to shift from long-form writing to a wider range of content, including news articles, tutorials, and opinion pieces. Today, Medium is a thriving community of writers, thinkers, and creators. The platform continues to evolve and grow, with new features and updates being introduced regularly. But at its core, Medium remains a place where people can share their thoughts and ideas with a wide audience, and where anyone can discover new perspectives and ideas. ",
]

 
    return(
        <div className={styles.mainContainer}>
            <div className={styles.titleContainer}>
                <div className={styles.mainTitle}>Every idea needs a <strong>Medium.</strong></div>
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.paragraphContainer}>
                    <div className={styles.textContainer}>
                    {content.map((content, index) => (
                        <p key={index}>{content}</p>
                    ))}
                    </div>
                </div>
                <div className={styles.imageContainer}>
                    <img src='mediumBio.jpeg'className={styles.bioImage}/>
                </div>
            </div>
            <div style={{ display: 'flex',flexDirection:'column', alignItems: 'center', borderBottom: '1px solid black', backgroundColor: '#ffd1b9'}}>
                <div style={{width: '60%', marginTop:'40px' }}>
                    <div style={{textAlign: 'center', fontSize: '6vw', fontFamily: 'Charter Regular'}}>A living network of curious minds.</div>
                </div>
                <div style={{width: '40%', marginBottom:'80px', marginTop:'20px'}}>
                    <div className={styles.textContainerBis}>
                    Anyone can write on Medium. Thought-leaders, journalists, experts, and individuals with unique perspectives share their thinking here. You'll find pieces by independent writers from around the globe, stories we feature and leading authors, and smart takes on our own suite of blogs and publications.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OurStory