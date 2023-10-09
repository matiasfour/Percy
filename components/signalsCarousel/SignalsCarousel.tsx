"use client";
import { CarouselCard } from "./carouselCard/CarouselCard";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { Filters } from "@/api/types";
import { todayDate } from "@/utils";
import moment from "moment";
import { PrebuyingTypes, PresellingTypes } from "@/api/constants";

interface SignalsCarouselProps {
  cards: any;
  onCardSelected: (signal: string[]) => void;
  onCardUnselected: (signal: string) => void;
  allSelected?: boolean;
  filters?: Filters;
  signalsType: string;
  selectedSignals: string[];
}

export function SignalsCarousel({
  cards,
  onCardSelected,
  onCardUnselected,
  allSelected,
  filters,
  signalsType,
  selectedSignals,
}: SignalsCarouselProps) {

  const [selectedCards, setSelectedCards] = useState<string[]>(selectedSignals || []);

  const onSelectCard = (card: string, isSelected: boolean) => {
    if (!isSelected) {
      setSelectedCards([...selectedCards, card]);
      onCardSelected([card]);
    } else {
      setSelectedCards(selectedCards.filter((c) => c !== card));
      onCardUnselected(card);
    }
  };

  useEffect(() => {
    if (Object.keys(cards).length && !selectedCards.length) {
      const defaultSelection = !allSelected ? [Object.keys(cards)[0]] : Object.keys(cards).map((key) => key)
      setSelectedCards(defaultSelection);
      onCardSelected(defaultSelection);
    }
  }, [allSelected, cards, onCardSelected, selectedCards]);
  return (
    <div className={styles.cards_carousel}>
      {!Object.keys(cards)?.length && (
        <span className={`${styles.none_container} font-xs`}>None</span>
      )}
      { Object.keys(cards)?.map((signal, index) => {
          return (
          <div key={index} className={styles.carousel_item}>
            <CarouselCard
              onSelectCard={onSelectCard}
              default={(index === 0 && !selectedCards.length) || allSelected}
              canCancel={selectedCards.length > 1}
              cardName={signalsType === "pre-selling" ? PresellingTypes[signal as keyof typeof PresellingTypes] : PrebuyingTypes[signal as keyof typeof PrebuyingTypes] }
              signalKey={signal}
              value={cards[signal as keyof typeof cards]}
              startDate={filters?.date_from || moment().subtract(6, 'months').format('MMMM')}
              endDate={filters?.date_to || todayDate()}
              signalsType={signalsType}
            />
          </div>
          )
      }
        )}
    </div>
  );
}
