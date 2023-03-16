"use client"

import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

export const Header = (
  <header className="flex justify-between bg-slate-100 p-2">
    <div>ChainWatcher</div>
    <Input
      className="w-full max-w-xl bg-white"
      placeholder="Address/Transaction search ..."
    />
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Currency" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="eur">EUR</SelectItem>
        <SelectItem value="usd">USD</SelectItem>
        <SelectItem value="btc">BTC</SelectItem>
      </SelectContent>
    </Select>
  </header>
)
