import React, { useState, useEffect, useContext } from 'react'
import styles from './styles.module.scss'
import clsx from 'clsx'
// import Modal from '@component/Modal'
import { Modal } from '@iscv/modal'
import { getNFTMetadata } from '@api/employee/customcv'
import { DEFAULT_CURRENCY } from '@constant/index'
import useToObject from '../../../hooks/useToObject'
import { CustomCVContext } from '../../../CustomCVContext'
import { Web3Context } from '@context/Web3ContextProvider'
import { getContract as getContractMarket } from '@contract/employeeMarket'
import Web3 from 'web3'

function Index(props) {
  const { tokenId, price, hashId, owner } = props
  const { setList, setAutoCreatement } = useContext(CustomCVContext)
  const { loginState } = useContext(Web3Context)
  const [openModal, setOpenModal] = useState(false) 
  const [nft, setNFT] = useState()
  useEffect(() => {
    ;(async () => {
      const nftResult = await getNFTMetadata(loginState.address, tokenId).catch((error) =>
        console.error(error)
      )
      if (!nftResult) return
      setNFT(nftResult.data)
    })()
  }, [])
  const handleApply = async () => {
    let result = useToObject(nft?.['data'])
    setAutoCreatement(result?.autoCreatement)
    setList(result?.list)
    setOpenModal(false)
  }
  const handleBuy = async () => {
    const contractMarket = await getContractMarket().catch((error) => {
      console.log(error)
      return
    })
    const web3 = new Web3()
    await contractMarket.methods
      .buyNFT(tokenId)
      .send({ from: loginState.address, value: web3.utils.toWei(price, 'ether') })
      .then((success) => {
        console.log(success)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <Modal
        // style={{ width: '90vw', height: '90vh', top: '10%' }}
        fullViewScroll={true}
        state={[openModal, setOpenModal]}
      >
        <div className={styles.modal}>
          <div className={styles.top}>
            <div className={styles.overview}>
              <img src={nft?.image}></img>
            </div>
            <div className={styles.tools}>
              <div className={styles.info}>
                <img
                  className={styles.avatar}
                  src={'https://cdn-teams-slug.flaticon.com/freepik.jpg'}
                ></img>
                <div className={styles.person}>
                  <div className={styles.name}>Zum</div>
                  <div className={styles.follower}>1.000.000 Follower</div>
                </div>
                <div className={styles.follow}>
                  <a>Follow</a>
                </div>
              </div>
              <div className={styles.titleGroup}>
                <div className={styles.title}>The summer partern</div>
                <div className={styles.share}>
                  <i className={clsx('fa-brands fa-facebook', styles.facebook)}></i>
                  <i className={clsx('fa-solid fa-link', styles.link)}></i>
                </div>
              </div>

              <div className={styles.main}>
                <div className={styles.like}>
                  <i className="fa-regular fa-heart"></i>
                  <span>Like</span>
                </div>
                {!nft?.['data'] && (
                  <div className={styles.buy}>
                    <button className={styles.buttonBuy} onClick={handleBuy}>
                      Buy
                    </button>
                  </div>
                )}
                {nft?.['data'] && (
                  <div className={styles.apply}>
                    <button className={styles.buttonApply} onClick={handleApply}>
                      Apply
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className={styles.container} onClick={() => setOpenModal(true)}>
        <img src={nft?.image}></img>
        <div className={styles.rightBottom}>
          <div className={styles.item}>
            <div className={styles.nftName}>{nft?.['name']}</div>
            <div className={styles.nftPrice}>
              <a>
                {price} {DEFAULT_CURRENCY}
              </a>
              <i className={clsx('fa-solid fa-crown', styles.crown)}></i>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
