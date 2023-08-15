import Image from 'next/image'
import styles from 'components/page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Hello World</p>
      </div>
    </main>
  )
}
