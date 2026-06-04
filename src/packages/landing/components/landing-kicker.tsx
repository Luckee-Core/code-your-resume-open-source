type LandingKickerProps = {
  children: React.ReactNode;
};

export const LandingKicker = (props: LandingKickerProps) => {
  const { children } = props;
  return <span className={styles.kicker}>{children}</span>;
};

const styles = {
  kicker: `kicker`,
} as const;
