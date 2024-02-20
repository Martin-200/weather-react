export interface TooltipProps {
    position?: {
        [key: string]: string | undefined
        top?: string
        bottom?: string
        left?: string
        right?: string
    }
    children?: React.ReactElement
}
