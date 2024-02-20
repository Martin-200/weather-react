import { type CallToActionProps } from '../types/components/callToAction'

import '../assets/scss/components/CallToAction.scss'

const CallToAction: React.FC = ({ label, icon: Icon, iconType = 'fill', handleClickAction, color = 'black', size = 'normal', type = 'button', full, spin }: CallToActionProps) => {
    return (
        <button type={type} className={`cta cta--color-${color} cta--size-${size} ${full ? ' w-full' : ''}`} onClick={handleClickAction}>
            {Icon && (
                <div className={`cta__icon ${spin ? 'cta__icon--spin' : ''} cta__icon--type-${iconType}`}>
                    <Icon />
                </div>
            )}
            {label && (
                <p className='cta__label'>{label}</p>
            )}
        </button>
    )
}

export default CallToAction
