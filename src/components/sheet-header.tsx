import { number2Alpha } from '@/utils'
import { Cell, type RendererProps } from '@rowsncolumns/grid'
import type { KonvaEventObject } from 'konva/lib/Node'
import { memo } from 'react'
import { Group, Rect } from 'react-konva'
import icon from './icon.svg'
import KonvaImage from './konva-image'

type Props = RendererProps & {
  isActive: boolean
  columnHeader?: boolean
  toggleContext: (
    e: KonvaEventObject<MouseEvent>,
    {
      rowIndex,
      columnIndex,
    }: {
      rowIndex: number
      columnIndex: number
    }
  ) => void
}
// TODO: another canvas
const SheetHeader = memo<Props>(function SheetHeader(props) {
  const { rowIndex, columnIndex, columnHeader, isActive } = props
  const isCorner = rowIndex === columnIndex
  const text = isCorner
    ? ''
    : columnHeader
      ? rowIndex.toString()
      : number2Alpha(columnIndex - 1).toUpperCase()

  const fill = isActive ? '#E9EAED' : '#F8F9FA'

  const onClick = (e: KonvaEventObject<MouseEvent>) => {
    console.log('clicked e: ', e)
    props.toggleContext(e, {
      rowIndex: props.rowIndex,
      columnIndex: props.columnIndex,
    })
  }

  return (
    <>
      <Cell
        key={`${rowIndex}_${columnIndex}`}
        width={props.width}
        height={props.height}
        x={props.x}
        y={props.y}
        rowIndex={props.rowIndex}
        columnIndex={props.columnIndex}
        value={text}
        fill={fill}
        stroke='#999'
        align='center'
      >
        {!(props.x === 0 && props.y === 0) && (
          <Group
            onClick={onClick}
            onMouseEnter={(e) => {
              const container = e.target.getStage()?.container()
              if (container) {
                container.style.cursor = 'pointer'
              }
            }}
            onMouseLeave={(e) => {
              const container = e.target.getStage()?.container()
              console.log('container: ', container)
              if (container) {
                container.style.cursor = 'default'
              }
            }}
          >
            <Rect
              x={(props.x ?? 22) + (props.width ?? 22) - 14}
              y={props.y}
              width={16}
              height={props.height}
              alpha={1}
            />
            <KonvaImage
              src={icon}
              // TODO fix default value or guard it
              x={(props.x ?? 22) + (props.width ?? 22) - 14}
              y={(props.y ?? 22) + (props.height ?? 22) - 16}
              width={12}
              height={12}
            />
          </Group>
        )}
      </Cell>
    </>
  )
})

export default SheetHeader
