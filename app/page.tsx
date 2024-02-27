'use client'
import 'react-vertical-timeline-component/style.min.css'
import AddIcon from '@mui/icons-material/Add'
import DownloadIcon from '@mui/icons-material/Download'
import SchoolIcon from '@mui/icons-material/School'
import WorkIcon from '@mui/icons-material/Work'
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Tooltip,
} from '@nextui-org/react'
import Link from 'next/link'
import { ReactElement, useEffect, useState } from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import { Downloader } from '@/api/Downloader'
import { LifeTimelineEventLogic } from '@/api/LifeTimelineEventLogic'
import styles from '@/components/page.module.css'
import { LifeTimelineEvent } from '@/types/LifeTimelineEvent'
import { LifetimeEvent } from '@/types/LifetimeEvent'

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

const downloadFormatItems: Array<{
  key: string
  label: string
}> = [
  {
    key: 'pdf',
    label: 'PDF',
  },
  {
    key: 'png',
    label: 'PNG',
  },
  {
    key: 'svg',
    label: 'SVG',
  },
]

export default function Home() {
  const [items, setItems] = useState([] as LifeTimelineEvent[])
  const downloader: Downloader = new Downloader()

  const loadItems = async (): Promise<void> => {
    const logic = new LifeTimelineEventLogic()
    setItems(await logic.getLifeTimelineEvent())
  }

  const download = (key) => {
    const downloader: Downloader = new Downloader()
    const targetElement: HTMLElement | null = document.getElementById(
      'target-download-component-id',
    )
    if (targetElement == null) {
      console.error('Could not get element to download')
      return false
    }
    downloader.download(targetElement, key)
  }

  useEffect(() => {
    loadItems()
  }, [])

  return (
    <main className={styles.main}>
      <div className='flex justify-end space-x-1'>
        <Dropdown backdrop='blur'>
          <DropdownTrigger>
            <Button isIconOnly color='primary' aria-label='Download'>
              <DownloadIcon />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label='Dynamic Actions'
            items={downloadFormatItems}
            onAction={(key) => download(key)}
          >
            {(item) => <DropdownItem key={item.key}>{item.label}</DropdownItem>}
          </DropdownMenu>
        </Dropdown>
        <Link href='/profile/new'>
          <Tooltip content='イベントを登録する'>
            <Button isIconOnly color='primary' aria-label='Add'>
              <AddIcon />
            </Button>
          </Tooltip>
        </Link>
      </div>

      <div id='target-download-component-id'>
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
              >
                <h3 className='vertical-timeline-element-title'>{item.title}</h3>
                <h4 className='vertical-timeline-element-subtitle'>{item.subtitle}</h4>
                <p>{item.content}</p>
              </VerticalTimelineElement>
            )
          })}
        </VerticalTimeline>
      </div>
    </main>
  )
}
