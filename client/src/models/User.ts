export default interface Codewars {
  username: string
  name: string
  honor: number
  clan: string
  leaderboardPosition: number
  skills: Array<string>
  "ranks": {
    "overall": {
      "rank": number
      "name": string
      "color": string
      "score": number
    },
    "languages": {
      "javascript": {
        "rank": number
        "name": string
        "color": string
        "score": number
      }
    }
  },
  codeChallenges: {
    totalAuthored: number
    totalCompleted: number
  }
}
