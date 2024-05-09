import styles from './GateOverlay.module.css';

export function GateOverlay() {
  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.body}></div>
      </div>
    </>
  );
}
