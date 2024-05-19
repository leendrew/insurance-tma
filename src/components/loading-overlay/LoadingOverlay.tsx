import styles from './LoadingOverlay.module.css';

export function LoadingOverlay() {
  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.body}></div>
      </div>
    </>
  );
}
