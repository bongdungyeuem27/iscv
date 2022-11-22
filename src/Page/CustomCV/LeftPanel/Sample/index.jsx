import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import Search from '../Search'
import Item from './Item'

import { getContract as getContractMarket } from '@contract/employeeMarket'

function Index() {
  const [search, setSearch] = useState('')
  const [listTemplate, setListTemplate] = useState()
  const onSearchKeyDown = (e) => {
    // console.log(e.code)
  }
  useEffect(() => {
    ;(async () => {
      const contractMarket = await getContractMarket().catch((error) => console.log(error))
      await contractMarket.methods
        .getMarket()
        .call()
        .then((success) => {

          return success.map((value, index) => {
            return { ...value }
          })
        })
        .then((success) => {
          setListTemplate(success)
        })
        .catch((error) => console.error(error))
    })()
  }, [])
  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <Search
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          onKeyDown={onSearchKeyDown}
        ></Search>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.scrollBox}>
          {listTemplate?.map((value, index) => {
            return (
              <Item
                key={index}
                tokenId={value['tokenId']}
                price={value['price']}
                hashId={value['hashId']}
                owner={value['owner']}
              ></Item>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Index
