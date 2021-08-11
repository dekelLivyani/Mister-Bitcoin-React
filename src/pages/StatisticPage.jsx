import { useState } from "react";
import { useEffect } from "react";
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";
import { bitcoinService } from "../services/bitcoin.service";


export const StatisticPage = () => {
   const [marketPrice, setMarketPrice] = useState(null)
   const [confirmedTransactions, setConfirmedTransactions] = useState(null)
   useEffect(() => {
      const loadStatistics = async () => {
         setMarketPrice(await bitcoinService.getMarketPrice())
         setConfirmedTransactions(await bitcoinService.getConfirmedTransactions())
      }
      loadStatistics();
   }, [])
      if (!marketPrice || !confirmedTransactions) {
         return <section>loading...</section>
      }
      return (
         <section className="statistics">
            <h1 className="title">statistics</h1>
            <h3>Market Price</h3>
            <Sparklines data={marketPrice.values.map((value) => [value.y.toFixed()])}
               width={300}
               height={50}
               margin={5}>
               <SparklinesLine color="orange" />
            </Sparklines>


            <h3>Confirmed Transactions</h3>
            <Sparklines
               data={confirmedTransactions.values.map((value) => [value.y.toFixed()])}
               // limit={300}
               width={200}
               height={50}
               margin={5}
            >
               <SparklinesLine color="red" style={{ fill: "red" }} />
               <SparklinesSpots style={{ fill: "gray" }} />
            </Sparklines>
         </section>
      )
}
