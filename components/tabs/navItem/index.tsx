interface navItemProps {
  id: string;
  title: string;
  selected: boolean;
  setSelected: (id: string) => void;
}

import styles from "./styles.module.css";

export function NavItem({ id, title, selected, setSelected }: navItemProps) {
  const handleClick = () => {
    setSelected(id);
  };

  return (
    <div
      onClick={handleClick}
      id={id}
      className={`${styles.nav_item} ${selected && styles.nav_selected}`}
    >
      <span className="font-l">{title}</span>
    </div>
  );
}
