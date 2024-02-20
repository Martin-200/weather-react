import { type TooltipProps } from '../types/components/tooltip'
import '../assets/scss/components/Tooltip.scss'

const Tooltip = ({ position, children }: TooltipProps) => {
    let tooltipClasses: string = ''
    if (position) {
        Object.keys(position).forEach((key) => {
            if (position[key]) {
                tooltipClasses += `tooltip--${key}-${position[key]} `
            }
        })
    }

    return (
        <>
            <div className={`tooltip ${tooltipClasses.trim()}`}>
                <div className='tooltip__content'>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Tooltip
