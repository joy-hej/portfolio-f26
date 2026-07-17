/** Default + hover squiggle marks (replaces former ⟡). */
export const SQUIGGLE_DEFAULT_PATH =
  'M14.5159 8.63148C16.3657 8.14585 17.7564 9.73726 17.8421 10.1385C17.9279 10.5397 18.196 12.4006 17.8846 12.8472C17.1255 13.6374 14.7618 15.2006 13.573 15.0671C12.1217 14.9041 8.63226 12.3642 8.04683 10.1867C7.87966 9.56498 7.33464 5.24496 7.52966 4.68604C8.17628 2.83284 10.2981 2.33528 11.0978 1.9802L11.1338 1.96423C12.1808 1.49912 13.7436 0.804944 15.5745 1.48068C16.6808 1.88898 21.9697 2.92444 23.206 5.60181C23.7704 6.82406 25.759 11.5747 24.6725 15.9055C24.0015 18.5799 21.3204 22.1828 18.618 22.2758C16.4138 22.3517 12.9842 23.1599 10.3121 21.5331C7.43352 19.7806 3.07582 17.4032 1.20117 9.77901'

export const SQUIGGLE_HOT_PATH =
  'M15.5448 14.1976C15.0404 16.0424 12.9669 16.451 12.5766 16.3247C12.1863 16.1984 10.4406 15.5001 10.2095 15.0071C9.9047 13.9546 9.73283 11.126 10.4428 10.1632C11.3096 8.98779 15.254 7.23583 17.4324 7.81756C18.0545 7.98367 22.0682 9.67168 22.4548 10.12C23.7364 11.6066 23.1064 13.6929 23.014 14.563L23.0099 14.6022C22.8891 15.7415 22.7089 17.442 21.2082 18.6898C20.3015 19.4437 16.7603 23.5063 13.8235 23.2383C12.4828 23.1159 7.37427 22.4628 4.16702 19.3564C2.18643 17.4381 0.406744 13.3148 1.67738 10.9279C2.71378 8.98105 3.72861 5.60686 6.47357 4.10613C9.43054 2.48949 13.6683 -0.0956828 21.2084 2.09292'

/**
 * @param {{
 *   variant?: 'default' | 'hot'
 *   className?: string
 *   stroke?: string
 *   title?: string
 * }} props
 */
export default function SquiggleMark({
  variant = 'default',
  className,
  stroke = 'currentColor',
  title,
}) {
  const hot = variant === 'hot'
  return (
    <svg
      className={className}
      width={hot ? 25 : 27}
      height={hot ? 25 : 24}
      viewBox={hot ? '0 0 25 25' : '0 0 27 24'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
    >
      {title ? <title>{title}</title> : null}
      <path
        d={hot ? SQUIGGLE_HOT_PATH : SQUIGGLE_DEFAULT_PATH}
        stroke={stroke}
        strokeWidth={hot ? 2.5 : 2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
