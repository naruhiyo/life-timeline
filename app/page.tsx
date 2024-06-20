'use client'
import 'react-vertical-timeline-component/style.min.css'
import AddIcon from '@mui/icons-material/Add'
import CampaignIcon from '@mui/icons-material/Campaign'
import Diversity1Icon from '@mui/icons-material/Diversity1'
import DownloadIcon from '@mui/icons-material/Download'
import ImageIcon from '@mui/icons-material/Image'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'
import SchoolIcon from '@mui/icons-material/School'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'
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
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import { DBLogic } from '@/api/DBLogic'
import { Downloader } from '@/api/Downloader'
import { LifeTimelineEventLogic } from '@/api/LifeTimelineEventLogic'
import { DownloadFormat, LifeTimelineEvent, VerticalTimelineMap } from '@/types/LifeTimelineEvent'

const timelineItemMap: VerticalTimelineMap = {
  education: {
    color: '#aecff3',
    icon: <SchoolIcon />,
    label: '学び',
  },
  work: {
    color: '#3e5ba0',
    icon: <WorkIcon />,
    label: '仕事',
  },
  certificate: {
    color: '#141415',
    icon: <TipsAndUpdatesIcon />,
    label: '資格',
  },
  life: {
    color: '#e7a949',
    icon: <Diversity1Icon />,
    label: '生活',
  },
  hobby: {
    color: '#69b981',
    icon: <InsertEmoticonIcon />,
    label: '趣味',
  },
  important: {
    color: '#f44336',
    icon: <CampaignIcon />,
    label: '重要',
  },
}

const downloadFormatItems: DownloadFormat = [
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

export default function Home(): JSX.Element {
  // handle routing
  const router = useRouter()
  const [items, setItems] = useState([] as LifeTimelineEvent[])
  const downloader: Downloader = new Downloader()

  const loadItems = async (): Promise<void> => {
    const logic = new LifeTimelineEventLogic()
    setItems(await logic.getAllLifeTimelineEvents())
  }

  const download = (key: string) => {
    const targetElement: HTMLElement | null = document.getElementById(
      'target-download-component-id',
    )

    if (targetElement == null) {
      console.error('Could not get element to download')
      return false
    }
    downloader.download(targetElement, key)
  }

  const redirectEdit = (id: string): void => {
    // for enhanced security
    const encodedId: string = btoa(id)
    router.push(`/profile/edit/${encodedId}`)
  }

  const closeIndexedDB = async (): Promise<void> => {
    const logic = new DBLogic()
    await logic.close()
  }

  useEffect(() => {
    loadItems()
    window.addEventListener('beforeunload', (e: BeforeUnloadEvent) => {
      closeIndexedDB()
    })
  }, [])

  return (
    <>
      <div className='flex justify-end space-x-1'>
        <Dropdown backdrop='blur'>
          <DropdownTrigger>
            <Button isIconOnly aria-label='Download'>
              <DownloadIcon />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label='DownloadFormats'
            items={downloadFormatItems}
            onAction={(key) => download(key as string)}
          >
            {(item) => (
              <DropdownItem key={item.key} startContent={<ImageIcon />}>
                {item.label}
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
        <Link href='/profile/new'>
          <Button isIconOnly aria-label='Add'>
            <Tooltip content='イベントを登録する'>
              <AddIcon />
            </Tooltip>
          </Button>
        </Link>
      </div>

      <div id='target-download-component-id'>
        {items.length > 0 && (
          <VerticalTimeline lineColor='#45659c'>
            {items.map((item, index) => {
              const className: string = `vertical-timeline-element--${item.type}`
              const label: string = timelineItemMap[item.type].label
              const color: string = timelineItemMap[item.type].color
              const icon = timelineItemMap[item.type].icon

              return (
                <VerticalTimelineElement
                  visible={true}
                  className={className}
                  contentStyle={{
                    background: '#aecff3',
                    cursor: 'pointer',
                    color: '#45659c',
                  }}
                  contentArrowStyle={{ borderRight: `7px solid #aecff3` }}
                  date={item.date}
                  iconStyle={{
                    border: `2px solid ${color}`,
                    background: '#fefefd',
                    color: color,
                  }}
                  icon={<Tooltip content={label}>{icon}</Tooltip>}
                  key={index}
                  onTimelineElementClick={() => {
                    redirectEdit(item.id)
                  }}
                >
                  <h3 className='vertical-timeline-element-title'>{item.title}</h3>
                  <p>{item.content}</p>
                </VerticalTimelineElement>
              )
            })}
          </VerticalTimeline>
        )}
      </div>
    </>
  )
}
