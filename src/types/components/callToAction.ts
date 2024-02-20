import type React from 'react'

export interface CallToActionProps {
    type?: 'button' | 'submit' | 'reset'
    icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>> | null
    iconType?: 'fill' | 'stroke'
    label?: string
    color?: 'black' | 'blue' | 'white'
    size?: 'small' | 'normal' | 'large'
    handleClickAction?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
    full?: boolean
    spin?: boolean
}
