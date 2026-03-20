import SkillSonarHero from '../components/skill-sonar/Hero'
import InstallNow from '../components/pre-install/InstallNow'
import Lifecycle from '../components/skill-sonar/Lifecycle'
import Models from '../components/skill-sonar/Models'
import Features from '../components/skill-sonar/Features'
import ThreatDefense from '../components/skill-sonar/ThreatDefense'

export default function SkillSonarPage() {
  return (
    <main>
      <SkillSonarHero />
      <div id="install">
        <InstallNow />
      </div>
      <Lifecycle />
      <Models />
      <Features />
      <ThreatDefense />
    </main>
  )
}
