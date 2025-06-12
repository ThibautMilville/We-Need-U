import { useState, useEffect, useCallback } from 'react'
import {
  UltraWalletConnectionData,
  UltraWalletResponse,
  UltraWalletError,
  UltraWalletTransactionResponse,
  UltraWalletSignMessageResponse,
  UltraWalletPurchaseResponse,
  UltraWalletConnectOptions,
  UltraWalletSignOptions,
  TransactionObject
} from '../types/ultraWallet'

export const isUltraWalletInstalled = (): boolean => {
  const installed = typeof window !== 'undefined' && 'ultra' in window;
  return installed;
}

export const useUltraWalletDetection = (): boolean => {
  const [isInstalled, setIsInstalled] = useState<boolean>(false)
  const [hasLogged, setHasLogged] = useState<boolean>(false)

  useEffect(() => {
    const checkWallet = () => {
      const installed = isUltraWalletInstalled();
      if (!hasLogged) {
        setHasLogged(true);
      }
      setIsInstalled(installed);
    }
    checkWallet()
    if (document.readyState !== 'complete') {
      window.addEventListener('load', checkWallet)
      return () => window.removeEventListener('load', checkWallet)
    }
  }, [])
  return isInstalled
}

export const cleanWalletId = (walletId: string | null): string => {
  if (!walletId) return ''
  return walletId.split('@')[0]
}

export const useUltraWallet = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [rawBlockchainId, setRawBlockchainId] = useState<string | null>(null)
  const [publicKey, setPublicKey] = useState<string | null>(null)
  const [chainId, setChainId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasAttemptedEagerConnect, setHasAttemptedEagerConnect] = useState<boolean>(false)
  const [isDisconnecting, setIsDisconnecting] = useState<boolean>(false)

  const blockchainId = cleanWalletId(rawBlockchainId)
  const isInstalled = useUltraWalletDetection()

  const connect = useCallback(
    async (options?: UltraWalletConnectOptions): Promise<boolean> => {
      if (!isInstalled || !window.ultra) {
        setError('Ultra Wallet is not installed')
        return false
      }
      setIsLoading(true)
      setError(null)
      setIsDisconnecting(false)
      try {
        const response = await window.ultra.connect(options)
        setRawBlockchainId(response.data.blockchainid)
        setPublicKey(response.data.publicKey)
        setIsConnected(true)
        try {
          const chainResponse = await window.ultra.getChainId()
          setChainId(chainResponse.data)
        } catch (chainErr) {
          console.error('Failed to get chain ID:', chainErr)
        }
        return true
      } catch (err) {
        const ultraErr = err as UltraWalletError
        setError(ultraErr.message || 'Failed to connect to Ultra Wallet')
        return false
      } finally {
        setIsLoading(false)
      }
    },
    [isInstalled]
  )

  const eagerConnect = useCallback(async (): Promise<boolean> => {
    if (hasAttemptedEagerConnect) return false
    setHasAttemptedEagerConnect(true)
    try {
      if (!isInstalled || !window.ultra) {
        return false
      }
      const response = await window.ultra.connect({ onlyIfTrusted: true })
      setRawBlockchainId(response.data.blockchainid)
      setPublicKey(response.data.publicKey)
      setIsConnected(true)
      setIsDisconnecting(false)
      try {
        const chainResponse = await window.ultra.getChainId()
        setChainId(chainResponse.data)
      } catch (chainErr) {
        console.error('Failed to get chain ID:', chainErr)
      }
      return true
    } catch {
      return false
    }
  }, [hasAttemptedEagerConnect, isInstalled])

  const disconnect = useCallback(async (): Promise<boolean> => {
    if (!isInstalled || !window.ultra) {
      return false
    }
    setIsLoading(true)
    setError(null)
    setIsDisconnecting(true)
    try {
      await window.ultra.disconnect()
      setIsConnected(false)
      setRawBlockchainId(null)
      setPublicKey(null)
      setChainId(null)
      setTimeout(() => {
        setIsDisconnecting(false)
      }, 1000)
      return true
    } catch (err) {
      const ultraErr = err as UltraWalletError
      if (ultraErr.message?.includes('User rejected') || 
          ultraErr.message?.includes('cancelled') ||
          ultraErr.message?.includes('User denied') ||
          ultraErr.code === 4001) {
        setError(null)
        setTimeout(() => {
          setIsDisconnecting(false)
        }, 500)
        return false
      }
      setError(ultraErr.message || 'Failed to disconnect from Ultra Wallet')
      setIsConnected(false)
      setRawBlockchainId(null)
      setPublicKey(null)
      setChainId(null)
      setTimeout(() => {
        setIsDisconnecting(false)
      }, 2000)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [isInstalled])

  const signTransaction = useCallback(
    async (
      txObject: TransactionObject | TransactionObject[],
      options?: UltraWalletSignOptions
    ): Promise<UltraWalletResponse<UltraWalletTransactionResponse> | null> => {
      if (!isInstalled || !window.ultra || !isConnected) {
        setError('Wallet not connected')
        return null
      }
      setIsLoading(true)
      setError(null)
      try {
        const response = await window.ultra.signTransaction(txObject, options)
        return response
      } catch (err) {
        const ultraErr = err as UltraWalletError
        setError(ultraErr.message || 'Transaction signing failed')
        return null
      } finally {
        setIsLoading(false)
      }
    },
    [isInstalled, isConnected]
  )

  const signMessage = useCallback(
    async (message: string): Promise<UltraWalletResponse<UltraWalletSignMessageResponse> | null> => {
      if (!isInstalled || !window.ultra || !isConnected) {
        setError('Wallet not connected')
        return null
      }
      const formattedMessage =
        message.startsWith('0x') || message.startsWith('UOSx') || message.startsWith('message:')
          ? message
          : `message:${message}`
      setIsLoading(true)
      setError(null)
      try {
        const response = await window.ultra.signMessage(formattedMessage)
        return response
      } catch (err) {
        const ultraErr = err as UltraWalletError
        setError(ultraErr.message || 'Message signing failed')
        return null
      } finally {
        setIsLoading(false)
      }
    },
    [isInstalled, isConnected]
  )

  const purchaseItem = useCallback(
    async (itemType: string, itemId: string): Promise<UltraWalletResponse<UltraWalletPurchaseResponse> | null> => {
      if (!isInstalled || !window.ultra || !isConnected) {
        setError('Wallet not connected')
        return null
      }
      setIsLoading(true)
      setError(null)
      try {
        const response = await window.ultra.purchaseItem(itemType, itemId)
        return response
      } catch (err) {
        const ultraErr = err as UltraWalletError
        setError(ultraErr.message || 'Purchase failed')
        return null
      } finally {
        setIsLoading(false)
      }
    },
    [isInstalled, isConnected]
  )

  useEffect(() => {
    if (isInstalled && window.ultra?.on) {
      const handleDisconnect = () => {
        setIsConnected(false)
        setRawBlockchainId(null)
        setPublicKey(null)
        setChainId(null)
      }
      const handleConnect = (...args: unknown[]) => {
        const data = args[0] as UltraWalletConnectionData
        if (data && data.blockchainid) {
          setIsConnected(true)
          setRawBlockchainId(data.blockchainid)
          setPublicKey(data.publicKey)
          window.ultra
            ?.getChainId()
            .then(response => {
              setChainId(response.data)
            })
            .catch(console.error)
        }
      }
      const checkConnectionStatus = async () => {
        if (isDisconnecting) {
          return
        }
        try {
          const response = await window.ultra?.connect({ onlyIfTrusted: true })
          if (response?.data?.blockchainid && !isDisconnecting) {
            setIsConnected(true)
            setRawBlockchainId(response.data.blockchainid)
            setPublicKey(response.data.publicKey)
            try {
              const chainResponse = await window.ultra?.getChainId()
              if (chainResponse?.data) {
                setChainId(chainResponse.data)
              }
            } catch {
              console.error('Failed to get chain ID')
            }
          }
        } catch {
          if (isConnected && !isDisconnecting) {
            handleDisconnect()
          }
        }
      }
      checkConnectionStatus()
      const intervalId = setInterval(checkConnectionStatus, 2000)
      window.ultra.on('disconnect', handleDisconnect)
      window.ultra.on('connect', handleConnect)
      return () => {
        clearInterval(intervalId)
        window.ultra?.off('disconnect', handleDisconnect)
        window.ultra?.off('connect', handleConnect)
      }
    }
  }, [isInstalled, isConnected, isDisconnecting])

  useEffect(() => {
    if (isInstalled && !isConnected && !hasAttemptedEagerConnect) {
      eagerConnect().catch(console.error)
    }
  }, [isInstalled, isConnected, eagerConnect, hasAttemptedEagerConnect])

  return {
    isInstalled,
    isConnected,
    isLoading,
    error,
    blockchainId,
    rawBlockchainId,
    publicKey,
    chainId,
    connect,
    eagerConnect,
    disconnect,
    signTransaction,
    signMessage,
    purchaseItem,
  }
}

export const createTransferTransaction = (
  from: string,
  to: string,
  quantity: string,
  memo: string = ''
): TransactionObject => {
  return {
    action: 'transfer',
    contract: 'eosio.token',
    data: {
      from,
      to,
      quantity,
      memo,
    },
  }
}

export const createUniqPurchaseTransaction = (
  tokenId: number,
  buyer: string,
  receiver: string,
  maxPrice: string,
  memo: string = '',
  promoterId: string | null = null
): TransactionObject => {
  return {
    action: 'buy',
    contract: 'eosio.nft.ft',
    data: {
      buy: {
        token_id: tokenId,
        buyer,
        receiver,
        max_price: maxPrice,
        memo,
        promoter_id: promoterId,
      },
    },
  }
} 