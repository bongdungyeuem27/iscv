import { useGetCustomCvQuery } from '@graphql/generated/schema'
import { useParams } from 'react-router-dom'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react'
import useIPFStoCV from './useIPFStoCV'
import { DraggableBox } from './DraggableBox'
import { getIPFSData } from '@apis/common/ipfs'

export default function Container() {
  const [list, setList] = useState<any>()
  const id = Number(useParams().id)
  const { data } = useGetCustomCvQuery({ variables: { employeeId: id } })
  useEffect(() => {
    ;(async () => {
      if (!data?.customCV?.source) return
      const jsonData = await getIPFSData(data?.customCV?.source)
        .then((success) => success.data)
        .catch((error) => console.log(error))

      if (!jsonData) return

      setList(useIPFStoCV(jsonData))
    })()
  }, [data?.customCV?.source])
  return (
    <div className={styles.container}>
      {list &&
        Object.keys(list).map((id) => {
          return (
            <DraggableBox key={id} id={id} data={list[id]} profile={data?.customCV}></DraggableBox>
          )
        })}
    </div>
  )
}
