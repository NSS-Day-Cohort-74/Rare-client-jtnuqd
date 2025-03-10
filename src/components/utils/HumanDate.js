export const HumanDate = ({ date }) => {
  if (!date) return <span>Invalid Date</span>
  
  const formattedDate = date.includes("T") ? date.split("T")[0] : date
  const humanReadableDate = new Date(formattedDate.replace(/-/g, '\/')).toLocaleDateString("en-US",
    {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'America/Chicago'
    })

    return <>{humanReadableDate}</>
}
