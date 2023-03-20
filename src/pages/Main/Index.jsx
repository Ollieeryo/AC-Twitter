import styles from './Index.module.scss';

function Main() {
  return (
    <div className={styles.c}>
      <div className={styles.sidebarSection}>
        Sidebar
      </div>
      <div className={styles.mainSection}>
        Main
      </div>
      <div className={styles.popularListSection}>
        PopularList
      </div>
    </div>
  );
}
export default Main;
