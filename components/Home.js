import styles from '../styles/Home.module.css';

function Home() {
  return (
    <div className={styles.homeHeaderContainer}>
      
        <div className={styles.title}>Stay curious.</div>
        <div className={styles.slogan}>Informing on Chinese space, from Chinese sources.</div>
        <div>
        <button className={styles.button}>Start reading</button>
      </div>
     
    </div>
  );
}

export default Home;
