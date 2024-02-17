'use client'
import {
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
} from '@nextui-org/react'

type Props = {
  headerText: string
  closeCallback: () => void
  isOpen: boolean
}

export default function CompleteModal(props: Props): JSX.Element {
  // handle modal
  const { onOpenChange } = useDisclosure()

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.closeCallback}
      placement={'top'}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>{props.headerText}</ModalHeader>
            <ModalFooter>
              <Button color='danger' variant='light' onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
