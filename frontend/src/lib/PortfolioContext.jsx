import { createContext, useContext } from 'react'
import content from '../data/content.json'

const PortfolioContext = createContext(content)

/** Provides the site content from src/data/content.json to every component. */
export function PortfolioProvider({ children }) {
  return <PortfolioContext.Provider value={content}>{children}</PortfolioContext.Provider>
}

export function usePortfolio() {
  return useContext(PortfolioContext)
}
