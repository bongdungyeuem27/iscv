import { memo, useState } from 'react'
import { defaultStyle, defaultImageStyle } from '../../config'
import styles from '../styles.module.scss'

function IconItem({ id, data }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className={styles.componentIcon}>
        {data.icon ? (
          <i
            style={{
              fontSize: data.width < data.height ? data.width : data.height,
              color: data.color.hex,
            }}
            className={data.icon}
          ></i>
        ) : (
          <i className="fa-thin fa-icons"></i>
        )}
      </div>
    </>
  )
}

export default memo(IconItem)
