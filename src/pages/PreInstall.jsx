import PreInstallHero from '../components/pre-install/Hero'
import WhyAnotherReview from '../components/pre-install/WhyAnotherReview'
import KeyAdvantages from '../components/pre-install/KeyAdvantages'
import ComparisonTable from '../components/pre-install/ComparisonTable'
import WhenToUse from '../components/pre-install/WhenToUse'
import PreInstallSummary from '../components/pre-install/Summary'
import InstallNow from '../components/pre-install/InstallNow'

export default function PreInstallPage() {
  return (
    <main>
      <PreInstallHero />
      <InstallNow />
      <WhyAnotherReview />
      <KeyAdvantages />
      {/* <ComparisonTable />
      <WhenToUse />
      <PreInstallSummary /> */}
    </main>
  )
}
