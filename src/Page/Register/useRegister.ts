import { ethers } from 'ethers'
import { FormikProps } from 'formik'
import { useEmployee } from '@contract/useEmployee'
import { FormikData } from './types'
import { IUseToast, useToast } from '@iscv/toast'
import { postAvatar } from '@api/employee/profile'
import { ApolloQueryResult, LazyQueryExecFunction } from '@apollo/client'
import { NavigateFunction } from 'react-router-dom'

export const useRegister = async (
  values: FormikData,
  signer: ethers.providers.JsonRpcSigner,
  toast: IUseToast,
  navigate: NavigateFunction,
  refresh: (
    variables?:
      | Partial<{
          user: string | undefined
        }>
      | undefined
  ) => Promise<ApolloQueryResult<any>>
) => {
  try {
    const df = new FormData()
    df.append('image', values.avatar)
    const imageSource = await postAvatar(df).then((success: any) => success.data)
    const employeeContract = useEmployee(signer)
    ;(await employeeContract)
      .addEmployee(
        values.category,
        values.fullname,
        values.phone,
        values.professional,
        values.email,
        values.github,
        values.linkedin,
        imageSource,
        { from: signer._address }
      )
      .then(async (success) => {
        await refresh()
        toast.success()
        navigate('/')
      })
  } catch (error) {
    console.log(error)
  }
}
