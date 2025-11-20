import BaseButton from "@/components/common/BaseButton";
import ArrowIcon from "@/icons/ArrowIcon";
import Repeat2Icon from "@/icons/Repeat2Icon";

import styles from './SubNavigation.module.css';
import Grid2x2Icon from "@/icons/Grid2x2Icon";
import { useNavigateAssets, useNavigateRentalHistory } from "@/components/hooks/useNavigation";

export function SubNavigation() {
  const navigateAssets = useNavigateAssets();
  const navigateRentalHistory = useNavigateRentalHistory();
  const buttons = [
    {
      label: "資産リスト",
      icon: <Grid2x2Icon stroke="var(--primary)" />,
      onClick: () => navigateAssets(),
    },
    {
      label: "レンタル履歴",
      icon: <ArrowIcon direction="right" stroke="var(--primary)" />,
      onClick: () => navigateRentalHistory(),
    },
    {
      label: "返す",
      icon: <ArrowIcon direction="left" stroke="var(--primary)"
      />
    },
    {
      label: "ワークフロー",
      icon: <Repeat2Icon stroke="var(--primary)" />
    },
  ];

  return (
    <div className={styles.layout}>
      {buttons.map((btn, i) => (
        <BaseButton
          key={i}
          label={btn.label}
          size='lg'
          variant='white'
          icon={btn.icon}
          onClick={btn.onClick}
          hoverable
        />
      ))}
    </div>

  );
}