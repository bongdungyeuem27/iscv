import { postImage } from '@apis/common/image'
import { ApolloQueryResult } from '@apollo/client'
import { useLoading } from '@components/Loading'
import { useEmployee } from '@contracts/useEmployee'
import { IUseToast } from '@iscv/toast'
import { refreshEmployee } from '@redux/reducers/auth'
import { store } from '@redux/store'
import { ethers } from 'ethers'
import { NavigateFunction } from 'react-router-dom'
import { FormikData } from './types'

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
  const loading = useLoading()
  loading.open()
  try {
    const df = new FormData()
    df.append('image', values.avatar)
    const imageSource = await postImage(df).then((success: any) => success.data)
    const employeeContract = useEmployee(signer)
    const tx = await employeeContract.addEmployee(
      values.fullname,
      values.phone,
      values.professional,
      values.email,
      values.github,
      values.linkedin,
      imageSource,
      { gasLimit: 5000000 }
    )
    await tx.wait().then(async (success) => {
      await refresh()
      toast.success()
      await store.dispatch(refreshEmployee({}))
      navigate('/')
    })
  } catch (error) {
    console.log(error)
    toast.error()
  } finally {
    loading.close()
  }
}
