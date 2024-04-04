'use client'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Tooltip,
  Input,
  Textarea,
  Button,
  RadioGroup,
  Radio,
} from '@nextui-org/react'
import { useRouter } from 'next/navigation' // next/router ではない
import { useState } from 'react'
import { LifeTimelineEventLogic } from '@/api/LifeTimelineEventLogic'
import CompleteModal from '@/components/CompleteModal'
import styles from '@/components/profile/new/page.module.css'
import {
  LifeTimelineEvent,
  LifeTimelineEventValid,
  FormKeys,
  LifeTimelineEventType,
} from '@/types/LifeTimelineEvent'

export default function Page(): JSX.Element {
  // handle routing
  const router = useRouter()
  // handle modal
  let [isModalOpen, setIsModalOpen] = useState(false)
  // input form
  const [form, setForm] = useState({
    id: crypto.randomUUID(),
    type: 'education',
    date: '',
    title: '',
    content: '',
  } as LifeTimelineEvent)

  // validation
  const [validation, setValidation] = useState({
    type: {
      invalid: false,
      message: '',
    },
    date: {
      invalid: false,
      message: '',
    },
    title: {
      invalid: false,
      message: '',
    },
    content: {
      invalid: false,
      message: '',
    },
  } as LifeTimelineEventValid)

  // check input value
  const handleValidation = (formKey: FormKeys, value: string, message: string) => {
    let invalid: boolean = true

    if (value.length > 0) {
      invalid = false
      message = ''
    }

    const validState: Partial<LifeTimelineEventValid> = {}
    validState[formKey] = {
      invalid: invalid,
      message: message,
    }

    setValidation({
      ...validation,
      ...validState,
    })
  }

  // change value event
  const handleValue = (formKey: FormKeys, value: string) => {
    const valueState: Partial<LifeTimelineEvent> = {}

    if (formKey === 'type') {
      valueState[formKey] = value as LifeTimelineEventType
    } else {
      valueState[formKey] = value
    }

    setForm({
      ...form,
      ...valueState,
    })
  }

  // submit event
  const handleSubmit = async () => {
    const validationKeys: FormKeys[] = Object.keys(validation) as FormKeys[]

    let isInvalid = true

    // check all input validation
    let invalidForm: Partial<LifeTimelineEventValid> = {}
    validationKeys.forEach((validationKey: FormKeys) => {
      let invalid: boolean = true
      let message: string = `入力してください`
      const value: string = form[validationKey]

      if (value.length > 0) {
        invalid = false
        message = ''
      }

      if (invalid) {
        isInvalid = true
        invalidForm[validationKey] = {
          invalid: invalid,
          message: message,
        }
      }
    })

    if (!isInvalid) {
      const logic: LifeTimelineEventLogic = new LifeTimelineEventLogic()
      const isCreated: boolean = await logic.createLifeTimelineEvent(form)
      if (isCreated) {
        setIsModalOpen(true)
      }
    } else {
      setValidation({
        ...validation,
        ...invalidForm,
      })
    }
  }

  // modal closed event
  const handleModalClose = () => {
    setIsModalOpen(false)
    router.push('/')
  }

  return (
    <main className={styles.main}>
      <div className='flex justify-center'>
        <Card className='w-full'>
          <CardHeader className='flex gap-3'>
            <div className='flex flex-col'>
              <p className='text-md'>新規追加</p>
            </div>
          </CardHeader>

          <Divider />

          <CardBody className='space-y-8'>
            <RadioGroup
              isRequired
              label='種別'
              name='type'
              orientation='horizontal'
              value={form.type}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleValue('type', e.target.value)
                handleValidation('type', e.target.value, '種別を選択してください')
              }}
              isInvalid={validation.type.invalid}
              errorMessage={validation.type.message}
            >
              <Radio value='education'>学び</Radio>
              <Radio value='work'>仕事</Radio>
            </RadioGroup>

            <Input
              isRequired
              type='date'
              label='日付'
              name='date'
              placeholder='イベントの日付'
              value={form.date}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleValue('date', e.target.value)
                handleValidation('date', e.target.value, '入力してください')
              }}
              isInvalid={validation.date.invalid}
              errorMessage={validation.date.message}
            />

            <Input
              isRequired
              type='text'
              name='title'
              label='イベントタイトル'
              placeholder='イベントのタイトル'
              value={form.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleValue('title', e.target.value)
                handleValidation('title', e.target.value, '入力してください')
              }}
              isInvalid={validation.title.invalid}
              errorMessage={validation.title.message}
            />

            <Textarea
              isRequired
              minRows={8}
              label='詳細'
              name='content'
              placeholder='イベントの詳細'
              value={form.content}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleValue('content', e.target.value)
                handleValidation('content', e.target.value, '入力してください')
              }}
              isInvalid={validation.content.invalid}
              errorMessage={validation.content.message}
            />
          </CardBody>

          <Divider />

          <CardFooter className='justify-between'>
            <Tooltip content='トップへ戻る'>
              <Link href='/'>
                <ArrowBackIosNewIcon />
              </Link>
            </Tooltip>

            <Button color='success' variant='ghost' onClick={handleSubmit}>
              保存する
            </Button>
          </CardFooter>
        </Card>

        <CompleteModal
          headerText='登録完了'
          closeCallback={handleModalClose}
          isOpen={isModalOpen}
        ></CompleteModal>
      </div>
    </main>
  )
}
