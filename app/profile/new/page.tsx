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
import { useState, useEffect } from 'react'
import { DBLogic } from '@/api/DBLogic'
import { LifeTimelineEventLogic } from '@/api/LifeTimelineEventLogic'
import CompleteModal from '@/components/CompleteModal'
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
    date: new Date()
      .toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replaceAll('/', '-'),
    title: '',
    content: '',
  } as LifeTimelineEvent)

  // validation
  const [validation, setValidation] = useState({
    type: {
      isInvalid: false,
      message: '',
    },
    date: {
      isInvalid: false,
      message: '',
    },
    title: {
      isInvalid: false,
      message: '',
    },
    content: {
      isInvalid: false,
      message: '',
    },
  } as LifeTimelineEventValid)

  useEffect(() => {
    window.addEventListener('beforeunload', (e: BeforeUnloadEvent) => {
      closeIndexedDB()
    })
  }, [])

  // change value event
  const handleChangeValue = (formKey: FormKeys, value: string) => {
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

  // check all input validation
  const isInvalidForm = (): boolean => {
    let isInvalidForm = false
    const validationKeys: FormKeys[] = Object.keys(validation) as FormKeys[]
    const validationForm: Partial<LifeTimelineEventValid> = {}

    // reset validation
    validationKeys.forEach((validationKey: FormKeys) => {
      validationForm[validationKey] = {
        isInvalid: false,
        message: ``,
      }
    })

    // check validation
    validationKeys.forEach((validationKey: FormKeys) => {
      const value: string = form[validationKey]

      if (value.length < 1) {
        validationForm[validationKey] = {
          isInvalid: true,
          message: `入力してください`,
        }
        isInvalidForm = true
      }
    })

    setValidation({
      ...validation,
      ...validationForm,
    })
    return isInvalidForm
  }

  // submit event
  const handleSubmit = async () => {
    // validation
    if (isInvalidForm()) {
      return
    }

    const logic: LifeTimelineEventLogic = new LifeTimelineEventLogic()
    const isCreated: boolean = await logic.createLifeTimelineEvent(form)
    if (isCreated) {
      setIsModalOpen(true)
    }
  }

  // modal closed event
  const handleModalClose = () => {
    setIsModalOpen(false)
    router.push('/')
  }

  const closeIndexedDB = async (): Promise<void> => {
    const logic = new DBLogic()
    await logic.close()
  }

  return (
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
              handleChangeValue('type', e.target.value)
            }}
            isInvalid={validation.type.isInvalid}
            errorMessage={validation.type.message}
          >
            <Radio value='education'>学び</Radio>
            <Radio value='work'>仕事</Radio>
            <Radio value='certificate'>資格</Radio>
            <Radio value='life'>生活</Radio>
            <Radio value='hobby'>趣味</Radio>
            <Radio value='important'>重要</Radio>
          </RadioGroup>

          <Input
            isRequired
            type='date'
            label='日付'
            name='date'
            placeholder='イベントの日付'
            value={form.date}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChangeValue('date', e.target.value)
            }}
            isInvalid={validation.date.isInvalid}
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
              handleChangeValue('title', e.target.value)
            }}
            isInvalid={validation.title.isInvalid}
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
              handleChangeValue('content', e.target.value)
            }}
            isInvalid={validation.content.isInvalid}
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
  )
}
