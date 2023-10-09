"use client";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

const infoCaption = "Create a report by searching a Zipcode, City or State";

type SearchProps = {
  searchedParams?: string;
  setFetchDetails?: Dispatch<SetStateAction<any>> | null;
}

export default function SearchCard({ searchedParams, setFetchDetails } : SearchProps) {
  const [searchParam, setSearchParam] = useState<string>(searchedParams || "");

  const router = useRouter();

  const setValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParam(e.target.value);
  };

  return (
    <div className={styles.search_card_container}>
      <span className="font-xl">{`Let's look for some information`}</span>
      <p className="font-s">{infoCaption}</p>
      <div className={styles.search_container}>
        <input
          className={styles.search_box}
          type="text"
          placeholder={"Search"}
          value={searchParam}
          onChange={(e) => setValue(e)}
          onKeyUp={(e) => {
            if(e.key === 'Enter') {
              router.push(`/dashboard?query_search=${searchParam ?? ''}`);
            }
          } 
        }
        ></input>
        <button
          className={`${styles.search_button}`}
          onClick={ () => {
            router.push(`/dashboard?query_search=${searchParam ?? ''}`);
          }}
        >
          <span>Enter</span>
          <Image
            alt={"collapse/expand icon"}
            width={10}
            height={10}
            src={"/light-arrow-right.svg"}
          />
          {/* <Link href={`/leads/${searchParam}`}>
                Enter
                
              </Link> */}
        </button>
      </div>
    </div>
  );
}
