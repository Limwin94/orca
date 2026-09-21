import type { Tab } from './tab-types'
import type { TerminalTab } from './terminal-tab-types'
import { isMeaningfulOpenCodeTerminalTitle } from './opencode-terminal-title'
import { isOrchestrationWorkerTerminalTitle } from './orchestration-worker-terminal-title'

export function resolveTerminalTabTitle(
  tab: Pick<
    TerminalTab,
    'customTitle' | 'quickCommandLabel' | 'aiVaultTitle' | 'generatedTitle' | 'title'
  >,
  generatedTitlesEnabled: boolean,
  fallback = ''
): string {
  const liveTitle = tab.title?.trim() ?? ''
  const customTitle = tab.customTitle?.trim() ?? ''
  const visibleLiveTitle = isOrchestrationWorkerTerminalTitle(liveTitle) ? '' : liveTitle
  return (
    (isOrchestrationWorkerTerminalTitle(customTitle) ? '' : customTitle) ||
    tab.quickCommandLabel?.trim() ||
    (isMeaningfulOpenCodeTerminalTitle(visibleLiveTitle) ? visibleLiveTitle : '') ||
    tab.aiVaultTitle?.title.trim() ||
    (generatedTitlesEnabled ? tab.generatedTitle?.trim() : '') ||
    visibleLiveTitle ||
    fallback
  )
}

export function resolveUnifiedTabLabel(
  tab:
    | Pick<Tab, 'customLabel' | 'quickCommandLabel' | 'aiVaultTitle' | 'generatedLabel' | 'label'>
    | undefined,
  generatedTitlesEnabled: boolean,
  fallback = ''
): string {
  const liveLabel = tab?.label?.trim() ?? ''
  const customLabel = tab?.customLabel?.trim() ?? ''
  const visibleLiveLabel = isOrchestrationWorkerTerminalTitle(liveLabel) ? '' : liveLabel
  return (
    (isOrchestrationWorkerTerminalTitle(customLabel) ? '' : customLabel) ||
    tab?.quickCommandLabel?.trim() ||
    (isMeaningfulOpenCodeTerminalTitle(visibleLiveLabel) ? visibleLiveLabel : '') ||
    tab?.aiVaultTitle?.title.trim() ||
    (generatedTitlesEnabled ? tab?.generatedLabel?.trim() : '') ||
    visibleLiveLabel ||
    fallback
  )
}
