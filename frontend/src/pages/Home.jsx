import { useEffect } from 'react'
import Certifications from '../components/Certifications'
import Contact from '../components/Contact'
import Experience from '../components/Experience'
import Hero from '../components/Hero'
import Journey from '../components/Journey'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import { usePortfolio } from '../lib/PortfolioContext'

export default function Home() {
  const { profile } = usePortfolio()
  useEffect(() => {
    document.title = `${profile.name} – Full-stack developer`
  }, [profile.name])

  return (
    <>
      <Hero />
      <Journey />
      <Experience />
      <Projects />
      <Skills />
      <Certifications />
      <Contact />
    </>
  )
}
