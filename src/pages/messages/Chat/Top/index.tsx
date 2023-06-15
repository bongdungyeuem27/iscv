import { useGetBusinessQuery } from '@graphql/generated/schema'
import { useSearchParams } from 'react-router-dom'
import Name from '../../Components/Name'
import styles from './styles.module.scss'

type Props = {}

function Top({}: Props) {
 
  return (
    <div className={styles.top}>
      <div className={styles.info}>
        <Name></Name>
        <div className={styles.tools}>
          <button className={styles.plus}>
            <i className="fa-regular fa-plus"></i>
          </button>
          <button className={styles.search}>
            <i className="fa-regular fa-search"></i>
          </button>
        </div>
      </div>
      <div>
        {/* {appointment?.map((value: any, index: number) => {
          return <Pin key={index} {...value} {...}></Pin>;
        })} */}
      </div>
    </div>
  )
}

export default Top
