'use client'
import 'react-vertical-timeline-component/style.min.css'
import AddIcon from '@mui/icons-material/Add'
import DownloadIcon from '@mui/icons-material/Download'
import SchoolIcon from '@mui/icons-material/School'
import WorkIcon from '@mui/icons-material/Work'
import { Button, Tooltip } from '@nextui-org/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation' // next/router ではない
import { ReactElement, useEffect, useState } from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import styles from '@/components/page.module.css'
import { LifeTimelineEvent } from '@/types/LifeTimelineEvent'

const timelineItemMap: {
  education: {
    color: string
    icon: ReactElement
  }
  work: {
    color: string
    icon: ReactElement
  }
} = {
  education: {
    color: 'rgb(214, 239, 255)',
    icon: <SchoolIcon />,
  },
  work: {
    color: 'rgb(148, 193, 255)',
    icon: <WorkIcon />,
  },
}

export default function Home(): JSX.Element {
  // handle routing
  const router = useRouter()
  const [items, setItems] = useState([] as LifeTimelineEvent[])

  const loadItems = async (): Promise<void> => {
    const dymanicLogic = await import('@/api/LifeTimelineEventLogic')
    const logic = new dymanicLogic.LifeTimelineEventLogic()
    setItems(await logic.getLifeTimelineEvent())
  }

  const redirectEdit = (id: string): void => {
    // for enhanced security
    const encodedId: string = btoa(id)
    router.push(`/profile/edit/${encodedId}`) // ここでリダイレクト
  }

  useEffect(() => {
    loadItems()
  }, [])

  return (
    <main className={styles.main}>
      <div className='flex justify-end space-x-1'>
        <Button isIconOnly color='primary' aria-label='Download'>
          <DownloadIcon />
        </Button>
        <Link href='/profile/new'>
          <Tooltip content='イベントを登録する'>
            <Button isIconOnly color='primary' aria-label='Add'>
              <AddIcon />
            </Button>
          </Tooltip>
        </Link>
      </div>

      {items.length > 0 && (
        <VerticalTimeline lineColor=''>
          {items.map((item, index) => {
            const className: string = `vertical-timeline-element--${item.type}`
            const color: string = timelineItemMap[item.type].color
            const icon = timelineItemMap[item.type].icon

            return (
              <VerticalTimelineElement
                visible={true}
                className={className}
                contentStyle={{ background: color, color: '#222' }}
                contentArrowStyle={{ borderRight: `7px solid ${color}` }}
                date={item.date}
                iconStyle={{ background: color, color: '#222' }}
                icon={icon}
                key={index}
                onTimelineElementClick={() => {
                  redirectEdit(item.id)
                }}
              >
                <h3 className='vertical-timeline-element-title'>{item.title}</h3>
                <h4 className='vertical-timeline-element-subtitle'>{item.subtitle}</h4>
                <p>{item.content}</p>
              </VerticalTimelineElement>
            )
          })}
        </VerticalTimeline>
      )}
    </main>
  )
}
