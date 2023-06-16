import Search from '@components/Search'
import React, { useEffect, useRef, useState } from 'react'
import _ from 'lodash'
import { searchBusiness } from '@apis/employee/search'
import { IBusiness } from 'src/types/business'
import { IPFS_GATEWAY } from '@constants/index'
import { Link } from 'react-router-dom'
type Props = {}

const SearchBox = (props: Props) => {
  const [search, setSearch] = useState('')
  const [list, setList] = useState<IBusiness[]>([])
  const ref = useRef<any>(null)
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setList([])
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])

  return (
    <div className="relative flex justify-center items-center" ref={ref}>
      <Search
        search={search}
        setSearch={(e) => {
          setSearch(e)
          _.debounce(async () => {
            await searchBusiness(e.toString())
              .then((success) => setList(success.data))
              .catch((error) => console.log(error))
          }, 500)()
        }}
      ></Search>
      <div className="absolute  top-[60px] left-0 right-0 bg-white flex flex-col gap-2 rounded-b-2xl transition-all duration-300 shadow-lg">
        {list.map((item) => {
          return (
            <Link
              key={item.id}
              className="flex w-full gap-4 items-center px-2 py-1"
              onClick={() => setList([])}
              to={`/page/${item.id}`}
            >
              <img
                src={`${IPFS_GATEWAY}${item.sourceImage}`}
                className=" rounded-full w-12 h-12 object-cover"
              ></img>
              <div className="flex-1">{item.name}</div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default SearchBox
