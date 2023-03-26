import { apiKey } from '../config/apiNinjasCelebritiesConfig'

const apiNinjasPrefix = 'https://api.api-ninjas.com'

export const searchCelebrity = async ({ name }) => {
  try {
    // console.log('name', name)
    const response = await fetch(`${apiNinjasPrefix}/v1/celebrity?name=${name}`, {
      headers: {
        'X-Api-Key': apiKey
      }
    })
    const json = await response.json()

    const celebrity = (json.length > 0) ? json[0] : []

    return celebrity
  } catch (e) {
    throw new Error(e)
  }
}
