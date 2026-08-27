export type OnboardingPhase = 1 | 2 | 3 | 4 | 5 | 6

export interface OnboardingAnswers {
  phase1: {
    startsProjects: boolean | null
    boughtUnfinishedCourse: boolean | null
    hasSkillsNoDirection: boolean | null
  }
  phase2: {
    flowActivity: string
    helpRequested: string
    sixMonthsFreedom: string
    endlessSubject: string
    obviousSkill: string
  }
  phase3: {
    skillLevel: number
    helpedSomeone: boolean | null
    hasTangibleProof: boolean | null
    proofDescription: string
    hasExistingAudience: boolean | null
    audienceDescription: string
  }
  phase4: {
    targetAudience: 'individuals' | 'professionals' | 'companies' | ''
    communicationStyle: ('writing' | 'speaking' | 'video' | 'inperson')[]
    hasOnlinePresence: boolean | null
    workStyle: 'solo' | 'contact' | ''
  }
  phase5: {
    hoursPerWeek: number
    revenueGoal: '500' | '2000' | '5000' | 'more' | ''
    incomeLogic: 'complement' | 'fulltime' | ''
    timeHorizon: '1month' | '3months' | '6months' | ''
  }
  phase6: {
    mainBlock: 'dontknowwhat' | 'dontknowho' | 'fearmistake' | 'notime' | ''
    triedBefore: boolean | null
    triedDescription: string
  }
}

export interface GeneratedPlan {
  id: string
  userId: string
  createdAt: string
  geniusZone: string
  geniusZoneDescription: string
  recommendedOffer: string
  offerDescription: string
  distributionChannel: string
  channelStrategy: string
  roadmap: RoadmapWeek[]
  strengths: string[]
  warnings: string[]
  firstSteps: string[]
  personalizationCheck?: string[]
}

export interface RoadmapWeek {
  week: number
  title: string
  description: string
  actions: string[]
  milestone: string
}

export type PricingOffer = 'one-shot' | 'monthly' | 'discovery'
