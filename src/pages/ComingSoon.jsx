import { T } from '../ui/typography.js'

function ComingSoon({ title }) {
  return (
    <div className="flex flex-col gap-1 p-8">
      <h1 className={`${T.h3} text-fg`}>{title}</h1>
      <p className={`${T.captionRegular} text-fg-tertiary`}>Coming soon.</p>
    </div>
  )
}

export default ComingSoon
