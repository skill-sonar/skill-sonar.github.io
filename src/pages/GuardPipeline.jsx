import GuardHero from '../components/guard-pipeline/Hero'
import WhyRuntime from '../components/guard-pipeline/WhyRuntime'
import PipelineViz from '../components/guard-pipeline/PipelineViz'
import SimulatedDemo from '../components/guard-pipeline/SimulatedDemo'
import Quickstart from '../components/guard-pipeline/Quickstart'

export default function GuardPipelinePage() {
  return (
    <main>
      <GuardHero />
      <WhyRuntime />
      <PipelineViz />
      <SimulatedDemo />
      <Quickstart />
    </main>
  )
}
