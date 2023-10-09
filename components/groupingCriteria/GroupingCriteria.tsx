import React from 'react'
import CriteriaCard from './criteriaCard.tsx/CriteriaCard';
import styles from "./styles.module.css";


interface GroupingCriteriaProps {
  selectedCriterias: string[];
  onCriteriaSelected: (signal: string) => void;
  onCriteriaUnselected: (signal: string) => void;
}

const GroupingCriteria = ({ selectedCriterias, onCriteriaSelected, onCriteriaUnselected }: GroupingCriteriaProps) => {

  const canCancel = selectedCriterias.length > 1;

  return (
    <div className={styles.grouping_criteria_section}>
        <h3>Grouping Criteria</h3>
        <div className={styles.grouping_cards}>
            <CriteriaCard canCancel={canCancel} isCriteriaSelected onCriteriaSelected={onCriteriaSelected} onCriteriaUnselected={onCriteriaUnselected} criteria="IP" criteriaKey="ip" />
            <CriteriaCard canCancel={canCancel} onCriteriaSelected={onCriteriaSelected} onCriteriaUnselected={onCriteriaUnselected} criteria="Email" criteriaKey="user_email"/>
            <CriteriaCard canCancel={canCancel} onCriteriaSelected={onCriteriaSelected} onCriteriaUnselected={onCriteriaUnselected} criteria="Name" criteriaKey="user_name"/>
        </div>
    </div>
  )
}

export default GroupingCriteria