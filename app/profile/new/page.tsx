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
} from '@nextui-org/react'
import styles from '@/components/page.module.css'

export default function Page() {
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
            <Input isClearable type='date' label='日付' placeholder='日付を入力してください' />

            <Input
              isClearable
              type='text'
              label='イベントタイトル'
              placeholder='イベントのタイトルを入力してください'
            />

            <Textarea minRows={8} label='詳細' placeholder='イベントの詳細を入力してください' />
          </CardBody>

          <Divider />

          <CardFooter className='justify-between'>
            <Tooltip content='トップへ戻る'>
              <Link href='/'>
                <ArrowBackIosNewIcon />
              </Link>
            </Tooltip>

            <Button color='success' variant='ghost'>
              保存する
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
