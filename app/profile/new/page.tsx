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
  useDisclosure,
} from '@nextui-org/react'
import { useRouter } from 'next/navigation' // next/router ではない
import { useState } from 'react'
import { LifeTimelineEventLogic } from '@/api/LifeTimelineEventLogic'
import CompleteModal from '@/components/CompleteModal'
import styles from '@/components/profile/new/page.module.css'
import { LifeTimelineEvent, LifeTimelineEventType } from '@/types/LifeTimelineEvent'

export default function Page(): JSX.Element {
  // handle routing
  const router = useRouter()
  // handle modal
  const { isOpen, onOpen, onClose } = useDisclosure()
  // input form
  const [form, setForm] = useState({
    id: crypto.randomUUID(),
    type: 'education',
    date: '',
    title: '',
    subtitle: '',
    content: '',
  } as LifeTimelineEvent)

  // input change event
  const handleChange = (value: Partial<LifeTimelineEvent>) => {
    setForm({ ...form, ...value })
  }

  // submit event
  const handleSubmit = async () => {
    const logic: LifeTimelineEventLogic = new LifeTimelineEventLogic()
    const isCreated: boolean = await logic.createLifeTimelineEvent(form)

    if (isCreated) {
      onOpen()
    }
  }

  // modal closed event
  const handleModalClose = () => {
    onClose()
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
              label='種別'
              orientation='horizontal'
              value={form.type}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange({ type: e.target.value as LifeTimelineEventType })
              }}
            >
              <Radio value='education'>学び</Radio>
              <Radio value='work'>仕事</Radio>
            </RadioGroup>

            <Input
              isClearable
              type='date'
              label='日付'
              placeholder='日付を入力してください'
              value={form.date}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange({ date: e.target.value })
              }}
            />

            <Input
              isClearable
              type='text'
              label='イベントタイトル'
              placeholder='イベントのタイトルを入力してください'
              value={form.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange({ title: e.target.value })
              }}
            />

            <Textarea
              minRows={8}
              label='詳細'
              placeholder='イベントの詳細を入力してください'
              value={form.content}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange({ content: e.target.value })
              }}
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
          isOpen={isOpen}
        ></CompleteModal>
      </div>
    </main>
  )
}
