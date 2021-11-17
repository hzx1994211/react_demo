import React from 'react'
import classNames from 'classnames'
import './index.scss'

const scriptElem = document.createElement('script')
scriptElem.src = '//at.alicdn.com/t/font_2534633_f92h7icknwb.js'
document.body.appendChild(scriptElem)

function Icon ({ className, type, ...restProps }) {
  return (
    <svg
      className={classNames('super-icon', className)}
      aria-hidden='true'
      {...restProps}
    >
      <use xlinkHref={`#${type}`} />
    </svg>
  )
}
export default Icon
