export type InitiativeId = 'str' | 'email-transparency' | 'executive-session' | 'robot-moratorium' | 'camera-ban' | 'trustee-protection'

export interface Initiative {
  id: InitiativeId
  title: string
  shortTitle: string
  description: string
  color: string
  bgColor: string
  borderColor: string
  pdfPath: string
  mdPath: string
  icon: string
}

export const initiatives: Record<InitiativeId, Initiative> = {
  'str': {
    id: 'str',
    title: 'Short-Term Rental Rights Initiative',
    shortTitle: 'STR Rights',
    description: 'Protects resident hosting rights while limiting investor rentals',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    pdfPath: '/initiatives/str-regulation/drafts/str-initiative-draft-v1.pdf',
    mdPath: '/initiatives/str-regulation/drafts/str-initiative-draft-v1.md',
    icon: '🏠'
  },
  'email-transparency': {
    id: 'email-transparency',
    title: 'Email Transparency Initiative',
    shortTitle: 'Email Logs',
    description: 'Requires preservation and disclosure of email audit logs',
    color: 'text-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    pdfPath: '/initiatives/email-transparency/drafts/email-transparency-initiative-v1.pdf',
    mdPath: '/initiatives/email-transparency/drafts/email-transparency-initiative-v1.md',
    icon: '📧'
  },
  'executive-session': {
    id: 'executive-session',
    title: 'Executive Session Transparency Initiative',
    shortTitle: 'Exec Session',
    description: 'Mandates recording and eventual release of closed sessions',
    color: 'text-purple-700',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    pdfPath: '/initiatives/executive-session-transparency/drafts/executive-session-transparency-initiative-v1.pdf',
    mdPath: '/initiatives/executive-session-transparency/drafts/executive-session-transparency-initiative-v1.md',
    icon: '🔓'
  },
  'robot-moratorium': {
    id: 'robot-moratorium',
    title: 'Robot Moratorium Initiative',
    shortTitle: 'Robot Ban',
    description: 'Temporary ban on autonomous robots in public spaces',
    color: 'text-red-700',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    pdfPath: '/initiatives/robot-moratorium/drafts/robot-moratorium-draft-v1.pdf',
    mdPath: '/initiatives/robot-moratorium/drafts/robot-moratorium-draft-v1.md',
    icon: '🤖'
  },
  'camera-ban': {
    id: 'camera-ban',
    title: 'Surveillance Camera Ban Initiative',
    shortTitle: 'Camera Ban',
    description: 'Prohibits government surveillance cameras on public property',
    color: 'text-orange-700',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    pdfPath: '/initiatives/camera-ban/drafts/camera-ban-initiative-v1.pdf',
    mdPath: '/initiatives/camera-ban/drafts/camera-ban-initiative-v1.md',
    icon: '📹'
  },
  'trustee-protection': {
    id: 'trustee-protection',
    title: 'Trustee Protection Initiative',
    shortTitle: 'Trustee Rights',
    description: 'Requires unanimous vote to remove elected trustees',
    color: 'text-indigo-700',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    pdfPath: '/initiatives/trustee-protection/drafts/trustee-protection-initiative-v1.pdf',
    mdPath: '/initiatives/trustee-protection/drafts/trustee-protection-initiative-v1.md',
    icon: '🛡️'
  }
}