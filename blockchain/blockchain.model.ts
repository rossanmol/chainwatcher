export interface BlockchainTransaction {
  hash: string
  ver: number
  vin_sz: number
  vout_sz: number
  lock_time: string
  size: number
  relayed_by: string
  block_height: number
  tx_index: string
  inputs: {
    prev_out: {
      hash: string
      value: string
      tx_index: string
      n: string
    }
    script: string
  }[]
  out: {
    value: string
    hash: string
    script: string
  }[]
}

export interface BlockchainAddress {
  hash160: string
  address: string
  n_tx: number
  n_unredeemed: number
  total_received: number
  total_sent: number
  final_balance: number
  txs: BlockchainTransaction[]
}
