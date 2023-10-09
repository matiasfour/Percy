"use client";
interface CarouselCardProps {
  cardName: string;
  signalKey: string;
  onSelectCard: (card: string, isSelected: boolean) => void;
  value: number;
  startDate: string;
  endDate: string;
  default?: boolean;
  canCancel?: boolean;
  signalsType: string;
}

import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export function CarouselCard({
  cardName,
  signalKey,
  value,
  startDate,
  endDate,
  onSelectCard,
  default: isDefault,
  canCancel,
  signalsType,
}: CarouselCardProps) {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (isDefault) {
      setIsSelected(true);
    }
  }, [isDefault]);

  const getPeriod = (sDate: string, eDate: string): string => {
    const timeDiff = new Date(eDate).getTime() - new Date(sDate).getTime();
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return `last ${diffDays} days`;
  };

  const setSelected = () => {
    setIsSelected(!isSelected);
    onSelectCard(signalKey, isSelected);
  };

  const formatName = (name: string): string => {
    const words = name.toLocaleLowerCase().split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
    return words.join(" ");
  };

  return (
    <div
      className={`${isSelected && styles.card_selected} ${
        styles.carousel_card_container
      }`}
    >
      <div className={styles.carousel_card_header}>
        <span className={`font-xs`}>{cardName && formatName(cardName)}</span>
        <button
          disabled={isSelected && !canCancel}
          onClick={setSelected}
          className={`${styles.apply_button} ${isSelected && !canCancel ? styles.disabled : ''}`}
        >
          {isSelected ? "Remove" : "Select"}
        </button>
      </div>
      <span className="font-xl">{value}</span>
      <span className={styles.period_value}>{getPeriod(startDate, endDate)}</span>
    </div>
  );
}
