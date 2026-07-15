/** Pacific time + approximate sun altitude for the west coast. */

const TIME_ZONE = 'America/Los_Angeles'
/** San Francisco — close enough for Pacific sun phrasing. */
const LAT = 37.7749
const LON = -122.4194

const timeFmt = new Intl.DateTimeFormat('en-US', {
  timeZone: TIME_ZONE,
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
  timeZoneName: 'short',
})

function sunAltitudeDeg(date) {
  const year = date.getUTCFullYear()
  const start = Date.UTC(year, 0, 0)
  const day = (date.getTime() - start) / 86_400_000
  const B = ((2 * Math.PI) / 365) * (day - 81)
  const decl = 23.45 * Math.sin(B)
  const eot =
    9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B)
  const utcHours =
    date.getUTCHours() +
    date.getUTCMinutes() / 60 +
    date.getUTCSeconds() / 3600
  let lst = utcHours + LON / 15 + eot / 60
  lst = ((lst % 24) + 24) % 24
  let hourAngle = 15 * (lst - 12)
  hourAngle = ((hourAngle + 180) % 360 + 360) % 360 - 180
  const latR = (LAT * Math.PI) / 180
  const declR = (decl * Math.PI) / 180
  const haR = (hourAngle * Math.PI) / 180
  const sinAlt =
    Math.sin(latR) * Math.sin(declR) +
    Math.cos(latR) * Math.cos(declR) * Math.cos(haR)
  return {
    altitude: (Math.asin(Math.max(-1, Math.min(1, sinAlt))) * 180) / Math.PI,
    hourAngle,
  }
}

function sunPhrase(altitude, hourAngle) {
  const rising = hourAngle < 0
  if (altitude < -18) return 'full dark out here'
  if (altitude < -6) return 'deep blue hour'
  if (altitude < 0) return rising ? 'almost dawn' : 'afterglow'
  if (altitude < 8) {
    return rising ? "sun’s at the edge · climbing" : "sun’s low · golden hour"
  }
  if (altitude < 25) {
    return rising ? 'sun climbing' : 'sun slipping west'
  }
  if (altitude < 45) return 'sun mid-sky'
  if (altitude < 60) return 'sun high overhead'
  return 'sun nearly overhead'
}

export function readPacificSky(date = new Date()) {
  const { altitude, hourAngle } = sunAltitudeDeg(date)
  return {
    timeLabel: timeFmt.format(date),
    sunLabel: sunPhrase(altitude, hourAngle),
  }
}
