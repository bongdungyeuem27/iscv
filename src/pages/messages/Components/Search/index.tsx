
import { ISearched } from '@apis/business/types'
import { ChatContext } from '@pages/messages/ChatContext'
import clsx from 'clsx'
import { debounce } from 'lodash'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import CompactItem from '../CompactItem'
import styles from './styles.module.scss'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@redux/store'
import { newRecent, setCurrent } from '@redux/reducers/messages'
import { searchBusinesses } from '@apis/business'

type Props = {
  //
}

/**
 * Component that alerts if you click outside of it
 */

const Search = (props: Props) => {
  const mainRef = useRef(null)
  const { searchShow, setSearchShow } = useContext(ChatContext)
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const current = useSelector((state: RootState) => state.messages.current)
  const [list, setList] = useState<ISearched[]>([])
  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setSearchShow?.(false)
        }
      }
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }

  useOutsideAlerter(mainRef)
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    _.debounce(async () => {
      await searchBusinesses(e.target.value)
        .then((success) => {
          const data = success.data

          if (!data) return
          setList(data)
        })
        .catch((error) => console.log(error))
    }, 200)()
  }, [])
  return (
    <>
      <div
        ref={mainRef}
        className={clsx(
          ' absolute overflow-hidden top-0 left-0 right-0 bottom-0 w-[300px] bg-white border-r-1 shadow-right z-10 rounded-tr-xl rounded-br-xl flex flex-col transition-all duration-500',
          { ['w-0']: !searchShow }
        )}
      >
        <div className="px-[6.5px] py-[7.5px]">
          <div className="relative">
            <button className={clsx(styles.search, ' cardx absolute left-2 top-[6px]')}>
              <i className="fa-regular fa-search"></i>
            </button>
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Type here"
              className="input input-bordered input-info w-full rounded-[32px] max-w-xs h-[60px] pl-[60px] leading-6 text-md"
            />
          </div>

          <div className="flex flex-col gap-2 my-4">
            {list.map((value) => {
              return (
                <CompactItem
                  key={value.id}
                  data={value}
                  expand={true}
                  onClick={() => {
                    setSearchShow?.(false)
                    dispatch<any>(newRecent({ businessId: value.id, updatedAt: new Date() }))
                    dispatch(setCurrent({ businessId: value.id }))
                  }}
                ></CompactItem>
              )
            })}
          </div>
        </div>
      </div>
      <div className={styles.tools}>
        <button className={clsx(styles.search, '')} onClick={() => setSearchShow?.(true)}>
          <i className="fa-regular fa-search"></i>
        </button>
      </div>
    </>
  )
}

export default Search
