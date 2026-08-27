import Anthropic from '@anthropic-ai/sdk'
import { OnboardingAnswers, GeneratedPlan } from '@/types'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function generatePlan(answers: OnboardingAnswers): Promise<GeneratedPlan> {
  const prompt = buildPrompt(answers)

  const message = await client.messages.create({
    model: 'claude-sonnet-5',
    max_tokens: 16000,
    messages: [{ role: 'user', content: prompt }],
  })

  const content = message.content[0]
  if (content.type !== 'text') throw new Error('Unexpected response type')

  const text = content.text
  // Try markdown code block first, then raw JSON object
  const codeBlock = text.match(/```(?:json)?\n?([\s\S]*?)\n?```/)
  if (codeBlock) return JSON.parse(codeBlock[1])

  const rawJson = text.match(/\{[\s\S]*\}/)
  if (rawJson) return JSON.parse(rawJson[0])

  throw new Error('No JSON found in response')
}

function buildPrompt(answers: OnboardingAnswers): string {
  return `Tu es un expert en monétisation de compétences et création d'offres digitales. Analyse les réponses suivantes d'un utilisateur et génère un plan personnalisé complet en JSON.

RÉPONSES DE L'UTILISATEUR:

Phase 1 - Déclencheur:
- Commence des projets sans les finir: ${answers.phase1.startsProjects ? 'Oui' : 'Non'}
- A acheté des formations sans les terminer: ${answers.phase1.boughtUnfinishedCourse ? 'Oui' : 'Non'}
- A des compétences mais ne sait pas quoi en faire: ${answers.phase1.hasSkillsNoDirection ? 'Oui' : 'Non'}

Phase 2 - Zone de génie:
- Activité de flow: ${answers.phase2.flowActivity}
- Ce pour quoi les gens demandent de l'aide: ${answers.phase2.helpRequested}
- Ce qu'il ferait avec 6 mois libres: ${answers.phase2.sixMonthsFreedom}
- Sujet dont il peut parler des heures: ${answers.phase2.endlessSubject}
- Compétence évidente: ${answers.phase2.obviousSkill}

Phase 3 - Niveau:
- Niveau auto-évalué (1-10): ${answers.phase3.skillLevel}
- A déjà aidé quelqu'un: ${answers.phase3.helpedSomeone ? 'Oui' : 'Non'}
- A une preuve tangible: ${answers.phase3.hasTangibleProof ? 'Oui' : 'Non'}
- Description de la preuve: ${answers.phase3.proofDescription}
- A une audience: ${answers.phase3.hasExistingAudience ? 'Oui' : 'Non'}
- Description audience: ${answers.phase3.audienceDescription}

Phase 4 - Marché:
- Cible: ${answers.phase4.targetAudience}
- Style de communication: ${answers.phase4.communicationStyle.join(', ')}
- Présence en ligne: ${answers.phase4.hasOnlinePresence ? 'Oui' : 'Non'}
- Style de travail: ${answers.phase4.workStyle}

Phase 5 - Contraintes:
- Heures par semaine disponibles: ${answers.phase5.hoursPerWeek}
- Objectif revenu: ${answers.phase5.revenueGoal}€/mois
- Logique: ${answers.phase5.incomeLogic}
- Horizon: ${answers.phase5.timeHorizon}

Phase 6 - Frein principal:
- Blocage: ${answers.phase6.mainBlock}
- A déjà essayé: ${answers.phase6.triedBefore ? 'Oui' : 'Non'}
- Ce qui n'a pas marché: ${answers.phase6.triedDescription}

GÉNÈRE UN PLAN EN JSON AVEC EXACTEMENT CETTE STRUCTURE:
\`\`\`json
{
  "geniusZone": "Nom court de la zone de génie (ex: 'Stratège Marketing Digital')",
  "geniusZoneDescription": "Description inspirante en 2-3 phrases",
  "recommendedOffer": "Type d'offre recommandé",
  "offerDescription": "Description concrète de l'offre recommandée, prix estimé, format",
  "distributionChannel": "Canal principal recommandé",
  "channelStrategy": "Stratégie concrète sur ce canal en 2-3 phrases",
  "roadmap": [
    {
      "week": 1,
      "title": "Titre de la semaine",
      "description": "Ce que cette semaine accomplit",
      "actions": ["Action concrète 1", "Action concrète 2", "Action concrète 3"],
      "milestone": "Résultat attendu à la fin de cette semaine"
    }
  ],
  "strengths": ["Point fort 1", "Point fort 2", "Point fort 3"],
  "warnings": ["Attention 1", "Attention 2"],
  "firstSteps": ["Première action dans les 24h", "Deuxième action cette semaine", "Troisième action ce mois-ci"]
}
\`\`\`

La roadmap doit couvrir 12 semaines (90 jours). Sois très spécifique et personnalisé. Utilise le tutoiement. Sois encourageant mais réaliste.`
}
