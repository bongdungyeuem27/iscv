import { createContext, useState, useCallback, useReducer } from 'react'
import update from 'immutability-helper'
import Cookies from 'js-cookie'
import avatarDefault from '@asset/avatar.png'
export const Web3Context = createContext()
import * as businessProfileApi from '@api/business/profile'
import * as employeeProfileApi from '@api/employee/profile'

const time = new Date(new Date().getTime() + 86400000 * 7)

const Web3ContextProvider = ({ children }) => {
  const [complete, setComplete] = useState(false)

  const [showMorePanel, setShowMorePanel] = useState({ show: false, panel: 1 })

  const [loginState, setLoginState] = useState({
    isLoggedIn: false,
    for: Cookies.get('for'),
    address: undefined,
    id: undefined,
    profile: undefined,
    jwt: Cookies.get('jwt'),
  })
  const dispatchLogin = async (action) => {
    switch (action.type) {
      case 'set_address': {
        setLoginState(update(loginState, { $merge: { address: action.address } }))
        return
      }
      case 'auto_login': {
        Cookies.set('jwt', action.address, {
          path: '/',
          expires: time,
          secure: true,
          sameSite: true,
        })
        Cookies.set('for', action.for, {
          path: '/',
          expires: time,
          secure: true,
          sameSite: true,
        })

        setLoginState(
          update(loginState, {
            $merge: {
              isLoggedIn: true,
              for: action.for,
              id: action.id,
              address: action.address,
              profile: action.profile,
              jwt: action.address,
            },
          })
        )
        return
      }

      case 'employee_login': {
        let avatar = avatarDefault
        if (action.remember) {
          Cookies.set('jwt', loginState.address, {
            path: '/',
            expires: time,
            secure: true,
            sameSite: true,
          })
          Cookies.set('for', 'employee', {
            path: '/',
            expires: time,
            secure: true,
            sameSite: true,
          })
        } else {
          Cookies.remove('jwt')
          Cookies.remove('for')
        }

        await employeeProfileApi
          .getAvatar(action.id)
          .then((success) => {
            avatar = success
          })
          .catch((error) => console.error(error))

        setLoginState(
          update(loginState, {
            $merge: {
              isLoggedIn: true,
              for: 'employee',
              id: action?.id,
              profile: { ...action?.profile, avatar },
              jwt: loginState?.address,
            },
          })
        )
        return
      }
      case 'employee_logout': {
        Cookies.remove('jwt')
        Cookies.remove('for')
        setLoginState(
          update(loginState, {
            $merge: {
              isLoggedIn: false,
              address: undefined,
              for: undefined,
              id: undefined,
              address: undefined,
              profile: undefined,
              jwt: undefined,
            },
          })
        )
        // window.location.reload()
        return
      }
      case 'business_logout': {
        Cookies.remove('jwt')
        Cookies.remove('for')
        setLoginState(
          update(loginState, {
            $merge: {
              isLoggedIn: false,
              address: undefined,
              for: undefined,
              id: undefined,
              address: undefined,
              profile: undefined,
              jwt: undefined,
            },
          })
        )

        return
      }
      case 'business_login':
        {
          let avatar = avatarDefault
          if (action.remember) {
            Cookies.set('jwt', loginState.address, {
              path: '/',
              expires: time,
              secure: true,
              sameSite: true,
            })
            Cookies.set('for', 'business', {
              path: '/',
              expires: time,
              secure: true,
              sameSite: true,
            })
          } else {
            Cookies.remove('jwt')
            Cookies.remove('for')
          }
          await businessProfileApi
            .getAvatar(action.id)
            .then((success) => {
              avatar = success
            })
            .catch((error) => console.error(error))
          setLoginState(
            update(loginState, {
              $merge: {
                isLoggedIn: true,
                for: 'business',
                id: action?.id,
                profile: { ...action?.profile, avatar },
                jwt: loginState?.address,
              },
            })
          )
        }
        return
    }
  }

  return (
    <Web3Context.Provider
      value={{
        loginState: loginState,
        dispatchLogin,
        showMorePanel,
        setShowMorePanel,
        complete,
        setComplete,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}
export default Web3ContextProvider
