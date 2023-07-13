import { postRequest } from '@apis/employee/iig'
import Input from '@components/Input'
import { useLoading } from '@components/Loading'
import { useGetIigRequestStatusQuery } from '@graphql/generated/schema'
import { useToast } from '@iscv/Toast'
import { Modal } from '@iscv/modal'
import { RootState } from '@redux/store'
import clsx from 'clsx'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { EIIGRequest } from 'src/types/certificate/iig'
import styles from './styles.module.scss'
import { Controller, useForm } from 'react-hook-form'
import { IForm } from './types'

function IIGRequestPanel() {
  const { t } = useTranslation('page', { keyPrefix: 'posts.left.iig' })
  const params = useParams()
  const [openAdd, setOpenAdd] = useState(false)
  const toast = useToast()
  const loading = useLoading()
  const employee = useSelector((state: RootState) => state.auth.employee)
  const { data, refetch } = useGetIigRequestStatusQuery({
    variables: { employeeId: employee?.id ?? -1 }
  })

  const { control, handleSubmit, setValue } = useForm<IForm>({
    defaultValues: {
      employeeId: employee?.id,
      certificateType: undefined,
      examId: undefined
    }
  })

  const onSubmit = async (data: IForm) => {
    loading.open()
    await postRequest({
      employeeId: employee?.id!,
      examId: data.examId!,
      certificateType: data.certificateType!
    })
      .then((success) => {
        refetch?.()
        toast.success()
      })
      .catch((error) => console.log(error))
    loading.close()
  }

  const onValidate = (errors: any) => console.log(errors)

  return (
    <>
      {employee && (
        <>
          <Modal
            state={[openAdd, setOpenAdd]}
            title={t('request_certificate')}
            action={handleSubmit(onSubmit, onValidate)}
          >
            <Controller
              name="examId"
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <div className="flex flex-col gap-2">
                    <h6>Mã số dự thi</h6>
                    <Input
                      className=" w-full h-8"
                      value={field.value?.toString()}
                      onChange={field.onChange}
                    ></Input>
                    {fieldState.error?.message && (
                      <p className=" text-red-500">{fieldState.error?.message}</p>
                    )}
                  </div>
                )
              }}
            ></Controller>
          </Modal>
          <div className={styles.container}>
            <div className={styles.title}>
              <a>{t('request_certificate')}</a>
            </div>
            <div className={styles.content}>
              <button
                className={clsx(styles.item, {
                  [styles.disabled]: data?.requestStatus?.lr
                })}
                onClick={() => {
                  if (data?.requestStatus?.lr) return
                  setValue('certificateType', EIIGRequest.LR)
                  setOpenAdd(true)
                }}
              >
                <label>Listening & Reading</label>
                <i className="fa-solid fa-play"></i>
              </button>
              <button
                className={clsx(styles.item, {
                  [styles.disabled]: data?.requestStatus?.sw
                })}
                onClick={() => {
                  if (data?.requestStatus?.sw) return
                  setValue('certificateType', EIIGRequest.SW)
                  setOpenAdd(true)
                }}
              >
                <label>Speaking & Writing</label>
                <i className="fa-solid fa-play"></i>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default IIGRequestPanel
