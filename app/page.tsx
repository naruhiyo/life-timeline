'use client'
import 'react-vertical-timeline-component/style.min.css'
import AddIcon from '@mui/icons-material/Add'
import DownloadIcon from '@mui/icons-material/Download'
import SchoolIcon from '@mui/icons-material/School'
import WorkIcon from '@mui/icons-material/Work'
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Tooltip } from '@nextui-org/react'
import Link from 'next/link'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import styles from '@/components/page.module.css'
import domtoimage from "dom-to-image";

const timelineData = {
  items: [
    {
      title: 'ほげ大学 大学院修了',
      subtitle: 'ふが専攻',
      content: 'ぴよぴよ',
      date: '2019.03',
      type: 'education',
    },
    {
      title: 'XX就職',
      subtitle: 'XX事業部',
      content: 'XXに携わる',
      date: '2019.04',
      type: 'work',
    },
  ],
}

const educationColor = 'rgb(214, 239, 255)'
const workColor = 'rgb(148, 193, 255)'

const itemList = timelineData.items.map((item, index) => {
  let itemClassName = 'vertical-timeline-element--education'
  let itemColor = educationColor
  let itemIcon = <SchoolIcon />
  if (item.type == 'education') {
    itemClassName = 'vertical-timeline-element--education'
    itemColor = educationColor
    itemIcon = <SchoolIcon />
  } else if (item.type == 'work') {
    itemClassName = 'vertical-timeline-element--work'
    itemColor = workColor
    itemIcon = <WorkIcon />
  }

  return (
    <VerticalTimelineElement
      className={itemClassName}
      contentStyle={{ background: itemColor, color: '#222' }}
      contentArrowStyle={{ borderRight: `7px solid ${itemColor}` }}
      date={item.date}
      iconStyle={{ background: itemColor, color: '#222' }}
      icon={itemIcon}
      key={index}
    >
      <h3 className='vertical-timeline-element-title'>{item.title}</h3>
      <h4 className='vertical-timeline-element-subtitle'>{item.subtitle}</h4>
      <p>{item.content}</p>
    </VerticalTimelineElement>
  )
})

export default function Home() {
  const downloadFormatItems = [
    {
      key: "pdf",
      label: "PDF"
    },
    {
      key: "png",
      label: "PNG"
    },
    {
      key: "svg",
      label: "SVG"
    },
  ]

  const downloadWithFormat = async (format) => {
    const fileName = "life-timeline"
    const rootElementId = "mainComponentId";
    const imgbase = document.getElementById(rootElementId);
    let downloadElement; 
    let bgColor;
    switch (format) {
      case "svg":
        downloadElement = document.createElement("a");
        bgColor = window.getComputedStyle(document.body).backgroundColor;
        console.log(bgColor);
        downloadElement.href = await domtoimage.toSvg(imgbase, {
          width: imgbase.clientWidth,
          height: imgbase.clientHeight,
          bgcolor: bgColor
        });
        downloadElement.download=`${fileName}.svg`;
        downloadElement.click();
        break;
      case "png":
        downloadElement = document.createElement("a");
        downloadElement.href = await domtoimage.toPng(imgbase, {
          width: imgbase.clientWidth,
          height: imgbase.clientHeight
        });
        downloadElement.download=`${fileName}.png`;
        downloadElement.click();
        break;
      case "pdf":
        console.log("pdf will be supported in the future");
        break;
      default:
        console.error(`Invalid download format. ${format}`);
        break;
    }
  }

  return (
    <main className={styles.main}>
      <div className='flex justify-end space-x-1'>
        <Dropdown backdrop="blur">
          <DropdownTrigger>
            <Button isIconOnly color='primary' aria-label='Download'>
              <DownloadIcon />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Dynamic Actions" items={downloadFormatItems} onAction={downloadWithFormat}>
            {(item) => (
              <DropdownItem
                key={item.key}
              >
                {item.label}
              </DropdownItem>
            )}
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
      <div id="mainComponentId">
        <VerticalTimeline>{itemList}</VerticalTimeline>
      </div>
    </main>
  )
}
