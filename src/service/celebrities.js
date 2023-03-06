const API_NINJAS_PREFIX = 'https://api.api-ninjas.com'
const API_KEY = 'iRCHew8ByIiAHjS/FG4TyQ==x1GTx1YEOLm3QrHb'

export const searchCelebrity = async ({ name }) => {
  try {
    console.log('name', name)
    const response = await fetch(`${API_NINJAS_PREFIX}/v1/celebrity?name=${name}`, {
      headers: {
        'X-Api-Key': API_KEY
      }
    })
    const json = await response.json()

    const celebrity = (json.length > 0) ? json[0] : []

    return celebrity
  } catch (e) {
    throw new Error(e)
  }
}
