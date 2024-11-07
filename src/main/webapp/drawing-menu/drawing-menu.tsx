import * as React from 'react'
import { StyleFunction } from 'ol/style/Style'
import { Style } from 'ol/style'
import { Map as OpenlayersMap } from 'ol'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThList } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { Shape } from '../shape-utils'
import {
  BoundingBoxDrawingControl,
  DrawingContext,
  DrawingControl,
  LineDrawingControl,
  PointDrawingControl,
  PointRadiusDrawingControl,
  PolygonDrawingControl,
  UpdatedGeoReceiver,
} from '../drawing-controls'
import { transparentize, readableColor } from 'polished'
import { HTMLAttributes } from '../internal/html'
import BboxIcon from './icons/bbox'
import CircleIcon from './icons/circle'
import LineIcon from './icons/line'
import PolygonIcon from './icons/polygon'
import PointIcon from './icons/point'
import { GeometryJSON } from '../geometry'

type Props = HTMLAttributes & {
  shape: Shape | null
  map: OpenlayersMap
  isActive: boolean
  showCoordinateEditor?: boolean
  saveAndContinue?: boolean
  title?: string
  geometry: GeometryJSON | null
  updatedBuffer?: number
  updatedBufferUnit?: string
  toggleCoordinateEditor?: () => void
  onCancel: () => void
  onOk: () => void
  onSetShape: (shape: Shape) => void
  onUpdate: UpdatedGeoReceiver
  disabledShapes?: Shape[]
  mapStyle: StyleFunction | Style | Style[]
}

type DrawingControlMap = Map<Shape, DrawingControl>

const InvisibleBackground = styled.div`
  display: none;
`
const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  flex-shrink: 1;
  height: 100%;
  font-size: ${(props) => props.theme.largeFontSize};
`
const TitleLabel = styled.div`
  color: ${(props) => readableColor(props.theme.positiveColor)};
  align-self: center;
  padding-left: ${(props) => props.theme.largeSpacing};
  padding-right: ${(props) => props.theme.minimumSpacing};
  flex: 0 0 auto;
`
const Title = styled.div`
  color: ${(props) => readableColor(props.theme.positiveColor)};
  font-weight: bold;
  align-self: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 0 1 auto;
`
const ShapeMenu = styled.div`
  height: 100%;
  display: flex;
  border-right: 1px solid ${(props) => props.theme.backgroundSlideout};
  border-left: 1px solid ${(props) => props.theme.backgroundSlideout};
  font-size: ${(props) => props.theme.minimumFontSize};
`
const ToolMenu = styled.div`
  height: 100%;
  display: flex;
  font-size: ${(props) => props.theme.minimumFontSize};
`
const ControlsGroup = styled.div`
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: right;
  flex: 0 0 auto;
`
const Button = styled.div<{
  isSubmit: boolean
  onClick: () => void
  buttonType: 'primaryColor' | 'positiveColor'
}>`
  height: 100%;
  font-size: ${(props) => props.theme.largeFontSize};
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: ${(props) => props.theme.minimumButtonSize};
  padding: 0;
  margin: 0;
  opacity: ${(props) => props.theme.minimumOpacity};
  cursor: pointer;
  color: ${(props) => readableColor(props.theme[props.buttonType])};
  width: 5em;
  background-color: ${(props) => props.theme[props.buttonType]};
  :hover {
    opacity: 1;
  }
`
const SelectableButton = styled.div<{ isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: calc(${({ theme }) => theme.largeFontSize} * 1.5);
  padding: ${({ theme }) => theme.mediumSpacing};
  opacity: ${(props) => (props.isSelected ? 1 : props.theme.minimumOpacity)};
  cursor: pointer;
  color: ${(props) => readableColor(props.theme.positiveColor)};
  border: 1px solid
    ${(props) =>
      props.isSelected
        ? readableColor(props.theme.positiveColor)
        : 'transparent'};
  :hover {
    opacity: 1;
    border: 1px solid ${(props) => readableColor(props.theme.positiveColor)};
  }
`
const DrawingBackground = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  width: 100%;
  max-width: 100%;
  background-color: ${(props) =>
    transparentize(0.2, props.theme.positiveColor)};
`

class DrawingMenu extends React.Component<Props> {
  drawingContext: DrawingContext
  controlsMap: DrawingControlMap
  setShape: (shape: Shape) => void
  acceptEdit: () => void
  cancelClick: () => void

  constructor(props: Props) {
    super(props)
    this.drawingContext = new DrawingContext({
      map: this.props.map,
      drawingStyle: props.mapStyle,
    })
    this.controlsMap = new Map<Shape, DrawingControl>()
    this.controlsMap.set(
      'Polygon',
      new PolygonDrawingControl(this.drawingContext, this.props.onUpdate)
    )
    this.controlsMap.set(
      'Line',
      new LineDrawingControl(this.drawingContext, this.props.onUpdate)
    )
    this.controlsMap.set(
      'Point Radius',
      new PointRadiusDrawingControl(this.drawingContext, this.props.onUpdate)
    )
    this.controlsMap.set(
      'Point',
      new PointDrawingControl(this.drawingContext, this.props.onUpdate)
    )
    this.controlsMap.set(
      'Bounding Box',
      new BoundingBoxDrawingControl(this.drawingContext, this.props.onUpdate)
    )
    this.setShape = (shape: Shape) => {
      this.props.onSetShape(shape)
    }
    this.acceptEdit = () => {
      this.cancelShapeDrawing()
      this.props.onOk()
    }
    this.cancelClick = () => {
      this.cancelShapeDrawing()
      this.props.onCancel()
    }
  }

  drawShape() {
    if (this.props.isActive && this.props.shape !== null) {
      this.cancelShapeDrawing()
      const control = this.controlsMap.get(this.props.shape)
      if (control !== undefined) {
        control.startDrawing()
        if (this.props.geometry !== null) {
          control.setGeo(this.props.geometry)
        }
      }
    }
  }

  updateBuffer(buffer: number, bufferUnit: string) {
    const control = this.controlsMap.get(this.props.shape)
    if (control !== undefined) {
      control.updateBuffer(buffer, bufferUnit)
    }
  }

  cancelShapeDrawing() {
    this.controlsMap.forEach((control: DrawingControl, _shape: Shape) => {
      control.cancelDrawing()
    })
  }

  setDrawingActive(active: boolean) {
    const control = this.controlsMap.get(this.props.shape)
    if (control !== undefined) {
      control.setActive(active)
    }
  }

  isDrawing(): boolean {
    const control = this.controlsMap.get(this.props.shape)
    if (control !== undefined) {
      return control.isDrawing()
    }
    return false
  }

  componentDidMount() {
    if (this.props.isActive && !this.props.showCoordinateEditor) {
      this.drawShape()
    }
  }

  componentWillUnmount() {
    this.cancelShapeDrawing()
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.shape !== this.props.shape) {
      this.cancelShapeDrawing()
      this.drawShape()
    } else if (prevProps.isActive !== this.props.isActive) {
      if (this.props.isActive) {
        this.drawShape()
      } else {
        this.cancelShapeDrawing()
      }
    }
    if (this.isDrawing()) {
      this.setDrawingActive(this.props.showCoordinateEditor !== true)
    }
    if (
      this.props.showCoordinateEditor != prevProps.showCoordinateEditor &&
      this.props.showCoordinateEditor === false
    ) {
      this.cancelShapeDrawing()
      this.drawShape()
    }
    if (this.props.updatedBuffer && this.props.updatedBufferUnit) {
      this.updateBuffer(this.props.updatedBuffer, this.props.updatedBufferUnit)
    }
  }

  renderShapeButton(shape: Shape, icon: any) {
    return this.props.disabledShapes &&
      this.props.disabledShapes.includes(shape) ? null : (
      <SelectableButton
        isSelected={this.props.shape === shape}
        onClick={() => this.setShape(shape)}
        title={`Draw ${shape}`}
      >
        {icon}
      </SelectableButton>
    )
  }

  render() {
    const {
      shape,
      map,
      isActive,
      geometry,
      onCancel,
      onOk,
      onSetShape,
      onUpdate,
      title,
      saveAndContinue,
      showCoordinateEditor,
      toggleCoordinateEditor,
      ...rest
    } = this.props
    const Background = isActive ? DrawingBackground : InvisibleBackground
    const acceptEditButton = saveAndContinue ? 'Next' : 'Apply'
    const acceptEditAlt = saveAndContinue
      ? 'Save And Continue Drawing'
      : 'Accept Edit'
    return (
      <Background {...rest}>
        <TitleContainer>
          {title === undefined ? null : (
            <React.Fragment>
              <TitleLabel>Editing Shape:</TitleLabel>
              <Title>{title}</Title>
            </React.Fragment>
          )}
        </TitleContainer>
        <ControlsGroup>
          <ShapeMenu>
            {this.renderShapeButton('Line', <LineIcon />)}
            {this.renderShapeButton('Polygon', <PolygonIcon />)}
            {this.renderShapeButton('Bounding Box', <BboxIcon />)}
            {this.renderShapeButton('Point Radius', <CircleIcon />)}
            {this.renderShapeButton('Point', <PointIcon />)}
          </ShapeMenu>
          {showCoordinateEditor === undefined ||
          toggleCoordinateEditor === undefined ? null : (
            <ToolMenu>
              <SelectableButton
                isSelected={showCoordinateEditor}
                onClick={toggleCoordinateEditor}
                title="Edit Coordinates"
              >
                <FontAwesomeIcon icon={faThList} color="white" />
              </SelectableButton>
            </ToolMenu>
          )}
          <Button
            isSubmit={false}
            buttonType="positiveColor"
            onClick={this.cancelClick}
            title="Cancel Edit"
          >
            Cancel
          </Button>
          <Button
            isSubmit={false}
            buttonType="primaryColor"
            onClick={this.acceptEdit}
            title={acceptEditAlt}
          >
            {acceptEditButton}
          </Button>
        </ControlsGroup>
      </Background>
    )
  }
}

export default DrawingMenu
