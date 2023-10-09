'use client'
import 'react-vertical-timeline-component/style.min.css'
import AddIcon from '@mui/icons-material/Add'
import DownloadIcon from '@mui/icons-material/Download'
import SchoolIcon from '@mui/icons-material/School'
import WorkIcon from '@mui/icons-material/Work'
import { Button } from '@nextui-org/button'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import styles from '@/components/page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div class="flex justify-end space-x-1">
        <Button isIconOnly color="primary" aria-label="Download">
          <DownloadIcon />
        </Button>
        <Button isIconOnly color="primary" aria-label="Add">
          <AddIcon />
        </Button>
      </div>
      <VerticalTimeline>
        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          contentStyle={{ background: 'rgb(214, 239, 255)', color: '#222' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(214, 239, 255)' }}
          date="2019.3"
          iconStyle={{ background: 'rgb(214, 239, 255)', color: '#222' }}
          icon={<SchoolIcon />}
         >
          <h3 className="vertical-timeline-element-title">ほげ大学院修了</h3>
          <h4 className="vertical-timeline-element-subtitle">ふが専攻</h4>
          <p>ぴよぴよ</p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: 'rgb(148, 193, 255)', color: '#222' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(148, 193, 255)' }}
          date="2019.4 -"
          iconStyle={{ background: 'rgb(148, 193, 255)', color: '#222' }}
          icon={<WorkIcon />}
        >
          <h3 className="vertical-timeline-element-title">XXX 就職</h3>
          <h4 className="vertical-timeline-element-subtitle">XXX 配属</h4>
          <p>ほげほげ</p>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </main>
  )
}
