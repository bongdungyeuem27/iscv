const A4RATIO = 210 / 297
const width = 500
const height = Math.round(width / A4RATIO)
const top = 60
export const BOARDDIMENSION = {
  width,
  height,
  top,
}

export const optionsFont = [
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Arial', label: 'Arial' },
  { value: 'Calibri', label: 'Calibri' },
]

export const optionsFontWeight = [
  { value: 'lighter', label: 'Lighter' },
  { value: 'normal', label: 'Normal' },
  { value: 'bold', label: 'Bold' },
  { value: 'bolder', label: 'Bolder' },
]

export const optionsFontSize = [
  { value: 10, label: '10' },
  { value: 11, label: '11' },
  { value: 12, label: '12' },
  { value: 13, label: '13' },
  { value: 14, label: '14' },
  { value: 15, label: '15' },
  { value: 16, label: '16' },
]

export const optionsBorderStyle = [
  { value: 'solid', label: 'Solid' },
  { value: 'dotted', label: 'Dotted' },
  { value: 'dashed', label: 'Dashed' },
  { value: 'double', label: 'Double' },
]

export const optionsObjectFitStyle = [
  { value: 'fill', label: 'Fill' },
  { value: 'cover', label: 'Cover' },
  { value: 'contain', label: 'Contain' },
  { value: 'scale-down', label: 'Scale down' },
  { value: 'none', label: 'None' },
]

export const defaultComponent = {
  common: {
    width: 200,
    height: 50,
    lock: false,
    visible: 'visibility',
    borderRadius: 0,
    fontFamily: optionsFont.find((o) => o.value == 'Roboto'),
    fontSize: optionsFontSize.find((o) => o.value == 12),
    fontWeight: optionsFontWeight.find((o) => o.value == 'normal'),
    lineHeight: 30,
    letterSpacing: 0,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'left',
    textDecoration: '',
    color: {
      hex: '#000000',
      rgb: {
        r: 0,
        g: 0,
        b: 0,
      },
      hsv: {
        h: 0,
        s: 0,
        v: 0,
      },
    },
    background: {
      hex: '#FFFFFF',
      rgb: {
        r: 255,
        g: 255,
        b: 255,
      },
      hsv: {
        h: 0,
        s: 0,
        v: 100,
      },
    },
    borderWidth: 0,
    borderColor: {
      hex: '#000000',
      rgb: {
        r: 0,
        g: 0,
        b: 0,
      },
      hsv: {
        h: 0,
        s: 0,
        v: 0,
      },
    },
    borderStyle: optionsBorderStyle.find((o) => o.value == 'solid'),
    typing: false,
  },
  text: {
    width: 200,
    height: 50,
    content: 'Typing here...',
    typing: false,
  },
  image: {
    width: 200,
    height: 50,
    file: undefined,
    borderRadius: 0,
    objectFit: optionsObjectFitStyle.find((o) => o.value == 'fill'),
  },
  icon: {
    width: 50,
    height: 50,
    icon: undefined,
    color: {
      hex: '#000000',
      rgb: {
        r: 0,
        g: 0,
        b: 0,
      },
      hsv: {
        h: 0,
        s: 0,
        v: 0,
      },
    },
    borderRadius: 0,
  },
  box: { width: 200, height: 50 },
}

export const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px solid #e5e6e6',
    //   color: state.isSelected ? 'red' : 'blue',
    padding: 20,
    height: 10,
    // background: 'black',
    display: 'flex',
    alignItems: 'center',
  }),
  menu: (provided, state) => ({
    ...provided,
    // width: state.selectProps.width,
    // borderBottom: '1px dotted pink',
    borderRadius: '5px',
    color: state.selectProps.menuColor,
    // padding: 20,
  }),
  control: (_, { selectProps: { onFocus } }) => ({
    // none of react-select's styles are passed to <Control />
    // width: 200,
    // color={}
    display: 'flex',
    borderRadius: '5px',
    height: 30,
    border: '1px solid #e5e6e6',
    alignItems: 'center',
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1
    const transition = 'opacity 300ms'

    return { ...provided, opacity, transition }
  },
}

export const defaultStyle = (item) => {
  return {
    fontFamily: item.fontFamily.value,
    fontSize: item.fontSize.value,
    fontWeight: item.fontWeight.value,
    lineHeight: item.lineHeight + 'px',
    letterSpacing: item.letterSpacing + 'px',
    borderWidth: item.borderWidth + 'px',
    justifyContent: item.justifyContent,
    alignItems: item.alignItems,
    visible: item.visible,
    textDecoration: item.textDecoration,
    color: item.color.hex,
    background: item.background.hex,
    borderColor: item.borderColor.hex,
    borderStyle: item.borderStyle.value,
  }
}

export const defaultImageStyle = (item) => {
  return {
    objectFit: item.objectFit.value,
  }
}

export const defaultInTextStyle = (item) => {
  return {
    textAlign: item.textAlign,
  }
}
