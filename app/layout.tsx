import { Roboto } from "next/font/google"
import { FaSearch } from "react-icons/fa"

import { Input } from "@/components/ui/input"
import "./globals.css"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const metadata = {
  title: "ChainWatcher - Search Blockhain Addreses and Transactions",
  description:
    "Explore the world of blockchain with our cutting-edge app. Access real-time BTC address and transaction data, subscribe to hash updates, and enjoy customizable currency displays in USD, EUR, or BTC. Elevate your crypto experience today.",
}

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <header className="flex items-center justify-between gap-2 border-b-2 border-slate-400 bg-slate-100 p-2">
          <div className="text-xl font-black text-slate-800">ChainWatcher</div>
          <div className="flex w-full max-w-xl">
            <Input
              className="rounded-r-none bg-white"
              placeholder="Search Adresses and Transactions"
            />
            <Button className="rounded-l-none">
              <FaSearch />
            </Button>
          </div>
          <Select>
            <SelectTrigger className="w-[75px]">
              <SelectValue placeholder="BTC" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="btc">BTC</SelectItem>
              <SelectItem value="eur">EUR</SelectItem>
              <SelectItem value="usd">USD</SelectItem>
            </SelectContent>
          </Select>
        </header>
        <main className="col-span-3 min-h-screen border-l border-l-slate-200 bg-slate-300 pt-4 dark:border-l-slate-700 xl:col-span-4">
          {children}
        </main>
      </body>
    </html>
  )
}
