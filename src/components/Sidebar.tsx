import Link from 'next/link';
import styles from '@/styles/sidebar.module.css'; // CSS Module for Sidebar

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.logo}>Data Shield</h2>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/detection-dashboard" className={styles.navLink}>Detection</Link>
        </li>
        <li>
          <Link href="/" className={styles.navLink}>Main Dashboard</Link>
        </li>
        <li>
          <Link href="/report" className={styles.navLink}>Report</Link>
        </li>
        <li>
          <Link href="/access-control" className={styles.navLink}>Access Control</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
