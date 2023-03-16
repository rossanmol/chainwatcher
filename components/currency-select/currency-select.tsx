"use client"

import { useState } from "react"

import { Command } from "../ui/command"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

const enum Currency {
  btc = "btc",
  eur = "eur",
  usd = "usd",
}

export default function CurrencySelect() {
  const [currency, setCurrency] = useState<Currency>(Currency.btc)
  const currenciesMap = new Map([
    [Currency.btc, "BTC (₿)"],
    [Currency.eur, "EUR (€)"],
    [Currency.usd, "USD ($)"],
  ])

  return (
    <>
      <Select onValueChange={(value) => setCurrency(value as Currency)}>
        <SelectTrigger className="w-[90px]">
          <SelectValue placeholder={currenciesMap.get(currency)} />
        </SelectTrigger>
        <SelectContent>
          {Array.from(currenciesMap).map(([key, title]) => (
            <SelectItem value={key} key={key}>
              {title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  )
}
