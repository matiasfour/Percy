interface ProfileCardProps {
  email?: string;
  name?: string;
  domain?: string;
}

import styles from "./styles.module.css";
export default function ProfileCard({ email, name, domain }: ProfileCardProps) {
  return (
    <div className={styles.profile_card_container}>
      {name && (
        <div className={styles.profile_item}>
          <span className="font-s">Name</span>
          <span className="font-xs">{name}</span>
        </div>
      )}
      {email && (
        <div className={styles.profile_item}>
          <span className="font-s">Email</span>
          <span className="font-xs">{email}</span>
        </div>
      )}
      {domain && (
        <div className={styles.profile_item}>
          <span className="font-s">Domain</span>
          <span className="font-xs">{domain}</span>
        </div>
      )}
    </div>
  );
}
