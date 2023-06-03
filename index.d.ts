declare module '*.scss' {
  const content: { [className: string]: string }
  export = content
}
declare module '*.jpg'
declare module '*.png'

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export const ReactComponent = content
}
