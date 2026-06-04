type LandingSectionLabelProps = {
  num: string;
  topic: string;
};

export const LandingSectionLabel = (props: LandingSectionLabelProps) => {
  const { num, topic } = props;
  return (
    <div className={styles.label}>
      {num} — {topic}
    </div>
  );
};

const styles = {
  label: `kicker`,
} as const;
