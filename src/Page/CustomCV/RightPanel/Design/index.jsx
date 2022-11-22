import React, { useState, useEffect, useContext } from 'react'
import styles from './styles.module.scss'
import ColorPanel from './ColorPanel/ColorPanel'
import Dimension from './Dimension'
import Text from './Text'
import Style from './Style'
import ImagePreview from './ImagePreview'
import { CustomCVContext } from '../../CustomCVContext'
import { dataTypes } from '../../ItemTypes'
import _ from 'lodash'
import { designTabComponents } from '../../ItemTypes'

function Index() {
  const { list, selected } = useContext(CustomCVContext)
  return (
    <div className={styles.container}>
      <ColorPanel></ColorPanel>
      {selected && designTabComponents[list[selected].type].components}
    </div>
  )
}

export default Index
