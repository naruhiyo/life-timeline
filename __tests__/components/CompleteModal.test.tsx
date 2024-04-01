import { fireEvent, render, screen } from '@testing-library/react'
import CompleteModal from '@/components/CompleteModal'

describe('render complete modal', () => {
  test('Display the modal when `isOpen` is `true`.', async () => {
    render(<CompleteModal headerText='test modal' closeCallback={() => {}} isOpen={true} />)

    const firstItem = await screen.findByText('test modal')

    expect(firstItem).toBeInTheDocument()
  })

  test('Do not display the modal when `isOpen` is `false`.', async () => {
    render(<CompleteModal headerText='test modal' closeCallback={() => {}} isOpen={false} />)

    const firstItem = screen.queryByText('test modal')

    expect(firstItem).not.toBeInTheDocument()
  })

  test('Trigger the close event when the close button in the modal is clicked.', async () => {
    let isClicked = false
    render(
      <CompleteModal
        headerText='test modal'
        closeCallback={() => {
          isClicked = true
        }}
        isOpen={true}
      />,
    )

    fireEvent.click(await screen.findByText('Close'))

    expect(isClicked).toEqual(true)
  })
})
