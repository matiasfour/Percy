import React, { useState } from 'react'
import styles from "./styles.module.css";

interface CriteriaCardProps {
    isCriteriaSelected?: boolean;
    canCancel: boolean;
    criteria: string;
    criteriaKey: string;
    onCriteriaSelected: (signal: string) => void;
    onCriteriaUnselected: (signal: string) => void;
    
}

const CriteriaCard = ({ isCriteriaSelected, canCancel, criteria, criteriaKey, onCriteriaSelected, onCriteriaUnselected } : CriteriaCardProps) => {

  const [isSelected, setIsSelected] = useState<boolean>(isCriteriaSelected || false);

  const setSelected = () => {
    if(!isSelected) {
        onCriteriaSelected(criteriaKey)
    }

    if(isSelected) {
        onCriteriaUnselected(criteriaKey)
    }

    setIsSelected(!isSelected)

  }
    
  return (
    <div className={`${styles.card} ${isSelected && styles.selectedCard}`}>
        <div className={styles.header}>
            <span>Group by</span>
            <button
                disabled={isSelected && !canCancel}
                onClick={() => setSelected() }
                className={`${styles.apply_button} ${isSelected && !canCancel ? styles.disabled : ''}`}
                >
                {isSelected ? "Remove" : "Select"}
            </button>
        </div>
        <span className={styles.criteria}>{criteria}</span>
    </div>
  )
}

export default CriteriaCard