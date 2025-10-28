import BaseButton from "@/components/common/BaseButton";
import ArrowIcon from "@/icons/ArrowIcon";
import Repeat2Icon from "@/icons/Repeat2Icon";

import styles from './SubNavigation.module.css';

export function SubNavigation() {
  return (
    <div className={styles.sub_nav_wrapper}>
      <BaseButton
        label="借りる"
        icon={
          <ArrowIcon
            direction='right'
            stroke="var(--primary)"
            strokeWidth={2}
          />
        }
      />
      <BaseButton
        label="返す"
        icon={
          <ArrowIcon
            direction='left'
            stroke="var(--primary)"
            strokeWidth={2}
          />
        }
      />
      <BaseButton
        label='ワークフロー'
        icon={<Repeat2Icon
          stroke="var(--primary)"
          strokeWidth={2}
        />}
      />
    </div >

  );
}