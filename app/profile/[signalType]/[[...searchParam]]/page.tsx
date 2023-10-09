import ProfileCard from "@/components/profileCard";
import { ProfileGridHandler } from "./profileGridHandler";
import styles from "./styles.module.css";
import { getUrlParams, nonZeroSignals, nonZeroSignalsNew } from "@/utils";
import {
  getUserPreSellingSignalsDetails,
  getUserPreBuyingSignalsDetails,
} from "@/api/usersSignals";
import { PercyResponse } from "@/api/types";
import moment from "moment";
import { getServerSession } from "next-auth/next"
import { authOptions } from "pages/api/auth/[...nextauth]"

interface ProfileProps {
  params: { searchParam: string; signalType: string };
  searchParams?: {
    ip?: string;
    user_name?: string;
    user_email?: string;
    domain?: string;
    date_from?: string;
  };
}

export default async function Profile({ params, searchParams }: ProfileProps) {
  const session = await getServerSession(authOptions)

  //@ts-ignore
  const access = session?.access || ''
  const { ip, user_name, user_email, domain, date_from } = searchParams || {};
  const { signalType, searchParam } = params;
  const [
    preSellingUserSignalsCount,
    preBuyingUserSignalsCount
  ] = await Promise.all<PercyResponse>([
    getUserPreSellingSignalsDetails(
      searchParam,
      {
        filters: {
          ip,
          user_email,
          user_name,
          date_from,
          searchParam
        }
      },
      access
    ),
    getUserPreBuyingSignalsDetails(
      searchParam,
      {
        filters: {
          ip,
          user_email,
          user_name,
          date_from,
          searchParam,
        }
      },
      access
    ),
  ]);

  return (
    <div className={styles.profile_container}>
      <div className={styles.profile_title}>
        <span className="font-xl">{ip || user_name || user_email}</span>
      </div>
      <ProfileCard email={user_email} name={user_name} domain={domain} />
      <ProfileGridHandler
        preSellingCards={nonZeroSignalsNew(preSellingUserSignalsCount)}
        preBuyingCards={nonZeroSignalsNew(preBuyingUserSignalsCount)}
        preBuyingSignals={[]}
        preSellingSignals={[]}
        urlParams={searchParams || {}}
        searchParam={searchParam}
        signalType={signalType}
      />
    </div>
  );
}
